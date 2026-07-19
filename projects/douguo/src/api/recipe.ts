import { adaptNoteDetail, adaptNoteItem, adaptRecipeDetail } from '../adapters/content'
import { adaptComment, adaptRecipeRelated } from '../adapters/explore'
import type {
  CommentViewModel,
  ContentCardViewModel,
  NoteDetailViewModel,
  PagedResult,
  RecipeDetailViewModel,
  RecipeRelatedViewModel,
} from '../types/content'
import type {
  CommentsResult,
  NoteDetailResult,
  NoteListResult,
  RecipeRelatedResult,
} from '../types/douguo'
import { ApiError, getApi } from './request'

export const getRecipeDetail = async (id: string, signal?: AbortSignal): Promise<RecipeDetailViewModel> => {
  const result = await getApi<unknown>(`/recipe/detail/${encodeURIComponent(id)}`, { signal })
  return adaptRecipeDetail(result)
}

export const getNoteDetail = async (id: string, signal?: AbortSignal): Promise<NoteDetailViewModel> => {
  const result = await getApi<NoteDetailResult>(`/note/detail/${encodeURIComponent(id)}`, { signal })
  if (!result.note) throw new ApiError('服务器未返回笔记详情')
  return adaptNoteDetail(result.note)
}

export const getRecipeRelated = async (id: string, signal?: AbortSignal): Promise<RecipeRelatedViewModel> => {
  const result = await getApi<RecipeRelatedResult>(`/recipe/relatedinfo/${encodeURIComponent(id)}`, { signal })
  return adaptRecipeRelated(result)
}

export const getRecipeComments = async (
  id: string,
  offset: number,
  limit: number,
  signal?: AbortSignal,
): Promise<PagedResult<CommentViewModel>> => {
  const result = await getApi<CommentsResult>(
    `/recipe/flatcomments/${encodeURIComponent(id)}/${offset}/${limit}`,
    { signal },
  )
  const rawItems = Array.isArray(result.comments) ? result.comments : []
  return {
    items: rawItems
      .map((item, index) => adaptComment(item, `comment-page-${offset}-${index}`))
      .filter((item): item is CommentViewModel => item !== null),
    hasMore: result.el !== 1 && rawItems.length > 0,
  }
}

export const getLearnedNotes = async (
  id: string,
  offset: number,
  limit: number,
  signal?: AbortSignal,
): Promise<PagedResult<ContentCardViewModel>> => {
  const result = await getApi<NoteListResult>(
    `/note/learned/${encodeURIComponent(id)}/${offset}/${limit}`,
    { signal },
  )
  const rawItems = Array.isArray(result.list) ? result.list : []
  return {
    items: rawItems
      .map(adaptNoteItem)
      .filter((item): item is ContentCardViewModel => item !== null),
    hasMore: result.end !== 1 && rawItems.length > 0,
  }
}

export const getMaterialDetail = (name: string, signal?: AbortSignal) =>
  getApi<Record<string, unknown>>(`/recipe/material/${encodeURIComponent(name)}`, { signal })

export const getNutrientAnalysis = (id: string, signal?: AbortSignal) =>
  getApi<Record<string, unknown>>(`/recipe/nutrient/${encodeURIComponent(id)}`, { signal })
