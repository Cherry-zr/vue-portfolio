import axios, { AxiosError, CanceledError, type AxiosRequestConfig } from 'axios'
import type { DouguoEnvelope } from '../types/douguo'

const defaultApiBaseUrl = import.meta.env.PROD
  ? 'https://apis.netstart.cn/douguo'
  : '/douguo-api'
const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || defaultApiBaseUrl).replace(/\/$/, '')

export class ApiError extends Error {
  readonly code?: string | number
  readonly status?: number

  constructor(message: string, options: { code?: string | number; status?: number } = {}) {
    super(message)
    this.name = 'ApiError'
    this.code = options.code
    this.status = options.status
  }
}

export const request = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10_000,
})

request.interceptors.response.use(
  (response) => {
    if (response.data === '' || response.data === null || response.data === undefined) {
      throw new ApiError('服务器返回了空响应', { status: response.status })
    }
    return response
  },
  (error: unknown) => Promise.reject(normalizeRequestError(error)),
)

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const getServerMessage = (value: unknown) => {
  if (typeof value === 'string' && value.trim()) return value.trim()
  if (!isRecord(value)) return undefined

  for (const key of ['message', 'msg', 'error']) {
    const candidate = value[key]
    if (typeof candidate === 'string' && candidate.trim()) return candidate.trim()
  }

  return undefined
}

export const normalizeRequestError = (error: unknown): Error => {
  if (error instanceof ApiError || error instanceof CanceledError) return error

  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<unknown>
    if (axiosError.code === 'ECONNABORTED') return new ApiError('请求超时，请稍后重试')

    const message = getServerMessage(axiosError.response?.data)
    return new ApiError(message || (axiosError.response ? `请求失败（${axiosError.response.status}）` : '网络连接失败'), {
      status: axiosError.response?.status,
    })
  }

  return error instanceof Error ? error : new ApiError('发生未知请求错误')
}

export const isRequestCanceled = (error: unknown) => axios.isCancel(error)

export const getErrorMessage = (error: unknown) => normalizeRequestError(error).message

export const getApi = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await request.get<DouguoEnvelope<T>>(url, config)
    const payload = response.data

    if (!isRecord(payload) || typeof payload.state !== 'string' || !('result' in payload)) {
      throw new ApiError('服务器响应格式异常')
    }

    if (payload.state !== 'success') {
      throw new ApiError(getServerMessage(payload.result) || '服务器返回失败状态', {
        code: typeof payload.code === 'string' || typeof payload.code === 'number' ? payload.code : undefined,
      })
    }

    return payload.result as T
  } catch (error) {
    throw normalizeRequestError(error)
  }
}
