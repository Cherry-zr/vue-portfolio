import { onBeforeUnmount, ref, shallowRef } from 'vue'
import { getErrorMessage, isRequestCanceled } from '../api/request'
import type { BannerViewModel, PagedResult } from '../types/content'

interface KeyedItem {
  key: string
}

interface UsePagedListOptions<T extends KeyedItem> {
  limit: number
  loader: (offset: number, limit: number, signal: AbortSignal) => Promise<PagedResult<T>>
}

export const usePagedList = <T extends KeyedItem>({ limit, loader }: UsePagedListOptions<T>) => {
  const items = shallowRef<T[]>([])
  const banners = ref<BannerViewModel[]>([])
  const initialLoading = ref(false)
  const refreshing = ref(false)
  const loadingMore = ref(false)
  const finished = ref(false)
  const initialized = ref(false)
  const error = ref('')

  let offset = 0
  let requestVersion = 0
  let controller: AbortController | undefined

  const cancel = () => {
    requestVersion += 1
    controller?.abort()
    controller = undefined
  }

  const run = async (mode: 'initial' | 'refresh' | 'more') => {
    if (mode === 'more' && (initialLoading.value || refreshing.value || loadingMore.value || finished.value)) return

    if (mode !== 'more') cancel()
    const version = requestVersion
    controller = new AbortController()

    if (mode === 'initial') initialLoading.value = true
    if (mode === 'refresh') refreshing.value = true
    if (mode === 'more') loadingMore.value = true
    error.value = ''

    const requestOffset = mode === 'more' ? offset : 0

    try {
      const page = await loader(requestOffset, limit, controller.signal)
      if (version !== requestVersion) return

      const existingKeys = new Set(mode === 'more' ? items.value.map((item) => item.key) : [])
      const uniqueItems = page.items.filter((item) => {
        if (existingKeys.has(item.key)) return false
        existingKeys.add(item.key)
        return true
      })

      items.value = mode === 'more' ? [...items.value, ...uniqueItems] : uniqueItems
      if (page.banners) banners.value = page.banners
      offset = requestOffset + limit
      finished.value = !page.hasMore || page.items.length === 0 || (mode === 'more' && uniqueItems.length === 0)
      initialized.value = true
    } catch (requestError) {
      if (version !== requestVersion || isRequestCanceled(requestError)) return
      error.value = getErrorMessage(requestError)
      initialized.value = true
    } finally {
      if (version === requestVersion) {
        initialLoading.value = false
        refreshing.value = false
        loadingMore.value = false
        controller = undefined
      }
    }
  }

  const loadInitial = () => {
    if (initialized.value || initialLoading.value) return Promise.resolve()
    return run('initial')
  }

  const refresh = () => run('refresh')
  const loadMore = () => run('more')
  const retry = () => (items.value.length > 0 ? loadMore() : run('initial'))

  const reset = () => {
    cancel()
    offset = 0
    items.value = []
    banners.value = []
    error.value = ''
    finished.value = false
    initialized.value = false
    initialLoading.value = false
    refreshing.value = false
    loadingMore.value = false
  }

  onBeforeUnmount(cancel)

  return {
    items,
    banners,
    initialLoading,
    refreshing,
    loadingMore,
    finished,
    initialized,
    error,
    loadInitial,
    refresh,
    loadMore,
    retry,
    reset,
    cancel,
  }
}
