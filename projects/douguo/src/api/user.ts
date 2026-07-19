import {
  adaptCalendarDay,
  adaptFavoriteRecipe,
  adaptUserInfo,
  adaptUserNoteGroups,
  adaptUserRecipe,
} from '../adapters/explore'
import type {
  CalendarDayViewModel,
  ContentCardViewModel,
  PagedResult,
  PublicUserViewModel,
} from '../types/content'
import type {
  UserCalendarResult,
  UserFavoritesResult,
  UserInfoResult,
  UserNotesResult,
  UserRecipesResult,
} from '../types/douguo'
import { ApiError, getApi } from './request'

export const getUserInfo = async (id: string, signal?: AbortSignal): Promise<PublicUserViewModel> => {
  const result = await getApi<UserInfoResult>(`/user/info/${encodeURIComponent(id)}`, { signal })
  const user = adaptUserInfo(result, id)
  if (!user) throw new ApiError('服务器未返回可识别的用户资料')
  return user
}

export const getUserCalendar = async (
  id: string,
  year: number,
  month: number,
  signal?: AbortSignal,
): Promise<{ days: CalendarDayViewModel[]; prompt: string }> => {
  const result = await getApi<UserCalendarResult>(
    `/user/notescalendar/${encodeURIComponent(id)}/${year}/${month}`,
    { signal },
  )
  const rawDays = Array.isArray(result.day_list) ? result.day_list : []
  return {
    days: rawDays
      .map((item) => adaptCalendarDay(item, year, month))
      .filter((item): item is CalendarDayViewModel => item !== null),
    prompt: typeof result.prompt_text === 'string' ? result.prompt_text : '',
  }
}

export const getUserNotes = async (
  id: string,
  offset: number,
  limit: number,
  signal?: AbortSignal,
): Promise<PagedResult<ContentCardViewModel>> => {
  const result = await getApi<UserNotesResult>(
    `/user/usernotescalendar/${encodeURIComponent(id)}/${offset}/${limit}`,
    { signal },
  )
  const rawItems = Array.isArray(result.notes) ? result.notes : []
  return { items: adaptUserNoteGroups(rawItems), hasMore: result.end !== 1 && rawItems.length > 0 }
}

export const getUserRecipes = async (
  id: string,
  offset: number,
  limit: number,
  signal?: AbortSignal,
): Promise<PagedResult<ContentCardViewModel>> => {
  const result = await getApi<UserRecipesResult>(
    `/user/urecipes/${encodeURIComponent(id)}/${offset}/${limit}`,
    { signal },
  )
  const rawItems = Array.isArray(result.list) ? result.list : []
  return {
    items: rawItems.map(adaptUserRecipe).filter((item): item is ContentCardViewModel => item !== null),
    hasMore: result.end !== 1 && rawItems.length > 0,
  }
}

export const getUserFavorites = async (
  id: string,
  offset: number,
  limit: number,
  signal?: AbortSignal,
): Promise<PagedResult<ContentCardViewModel>> => {
  const result = await getApi<UserFavoritesResult>(
    `/user/ufavorites/${encodeURIComponent(id)}/${offset}/${limit}`,
    { signal },
  )
  const rawItems = Array.isArray(result.recipes) ? result.recipes : []
  return {
    items: rawItems.map(adaptFavoriteRecipe).filter((item): item is ContentCardViewModel => item !== null),
    hasMore: result.end !== 1 && rawItems.length > 0,
  }
}
