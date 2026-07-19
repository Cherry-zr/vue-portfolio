import { adaptCategory } from '../adapters/content'
import type { CategoryViewModel } from '../types/content'
import type { CategoriesResult } from '../types/douguo'
import { getApi } from './request'

export const getCategories = async (signal?: AbortSignal): Promise<CategoryViewModel[]> => {
  const result = await getApi<CategoriesResult>('/flatcatalogs.json', { signal })
  const categories = Array.isArray(result.cs) ? result.cs : []
  return categories
    .map((item, index) => adaptCategory(item, `root-${index}`))
    .filter((item): item is CategoryViewModel => item !== null)
}
