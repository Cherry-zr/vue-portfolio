import { getApi } from './request'

export const getGlobalConfig = (signal?: AbortSignal) =>
  getApi<Record<string, unknown>>('/app/config.json', { signal })

export const getAppInitialization = (signal?: AbortSignal) =>
  getApi<Record<string, unknown>>('/init.json', { signal })
