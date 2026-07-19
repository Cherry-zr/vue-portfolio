import { adaptSearchItem } from '../adapters/content'
import { adaptSearchDiscovery } from '../adapters/explore'
import type { ContentCardViewModel, PagedResult, SearchDiscoveryViewModel } from '../types/content'
import type { SearchDiscoveryResult, SearchResult } from '../types/douguo'
import { getApi } from './request'

export type SearchOrder = 0 | 2 | 3
export type SearchContentType = 0 | 1

export const getSearchDiscovery = async (signal?: AbortSignal): Promise<SearchDiscoveryViewModel> => {
  const result = await getApi<SearchDiscoveryResult>('/recipe/search/hot', { signal })
  return adaptSearchDiscovery(result)
}

export const getSearchSuggestions = async (keyword: string, signal?: AbortSignal): Promise<string[]> => {
  const result = await getApi<SearchDiscoveryResult>('/recipe/search/suggests', {
    params: { kw: keyword },
    signal,
  })
  return adaptSearchDiscovery(result).suggestions
}

export const searchRecipes = async (
  keyword: string,
  offset: number,
  limit: number,
  order: SearchOrder = 0,
  type: SearchContentType = 0,
  signal?: AbortSignal,
): Promise<PagedResult<ContentCardViewModel>> => {
  const result = await getApi<SearchResult>('/recipe/search', {
    params: {
      keyword,
      order,
      type,
      offset,
      limit,
    },
    signal,
  })

  const rawItems = Array.isArray(result.list) ? result.list : []
  const items = rawItems
    .map(adaptSearchItem)
    .filter((item): item is ContentCardViewModel => item !== null)

  return {
    items: type === 1 ? items.map((item) => ({ ...item, media: 'video' as const })) : items,
    hasMore: result.end !== 1 && rawItems.length > 0,
  }
}
