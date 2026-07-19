import {
  adaptFollowingItem,
  adaptNoteItem,
  adaptRecommendedBanner,
  adaptRecommendedItem,
} from '../adapters/content'
import type { PagedResult } from '../types/content'
import type {
  EventsResult,
  FollowingResult,
  NotesResult,
  RecommendedResult,
  VideosResult,
} from '../types/douguo'
import { getApi } from './request'

const mapValid = <T>(items: unknown[], adapter: (value: unknown) => T | null) =>
  items.map(adapter).filter((item): item is T => item !== null)

export const getRecommended = async (offset: number, limit: number, signal?: AbortSignal) => {
  const result = await getApi<RecommendedResult>(`/home/recommended/${offset}/${limit}`, { signal })
  const rawItems = Array.isArray(result.list) ? result.list : []
  const rawBanners = Array.isArray(result.banner) ? result.banner : []

  return {
    items: mapValid(rawItems, adaptRecommendedItem),
    banners: mapValid(rawBanners, adaptRecommendedBanner),
    hasMore: rawItems.length >= limit,
  } satisfies PagedResult<ReturnType<typeof adaptRecommendedItem> & object>
}

export const getFollowing = async (offset: number, limit: number, signal?: AbortSignal) => {
  const result = await getApi<FollowingResult>(`/home/ffeeds/${offset}/${limit}`, { signal })
  const rawItems = Array.isArray(result.feeds) ? result.feeds : []
  return {
    items: mapValid(rawItems, adaptFollowingItem),
    hasMore: result.end !== 1 && rawItems.length > 0,
  }
}

export const getNotes = async (
  offset: number,
  limit: number,
  btmid?: string,
  signal?: AbortSignal,
) => {
  const params = btmid ? { btmid } : undefined
  const result = await getApi<NotesResult>(`/home/notes/${offset}/${limit}`, { params, signal })
  const rawItems = Array.isArray(result.list) ? result.list : []
  const nextBtmid = typeof result.btmid === 'string' && !['', '{}'].includes(result.btmid.trim())
    ? result.btmid.trim()
    : undefined

  return {
    items: mapValid(rawItems, adaptNoteItem),
    hasMore: result.end !== 1 && rawItems.length > 0,
    nextBtmid,
  }
}

export const getEvents = async (offset: number, limit: number, signal?: AbortSignal) => {
  const result = await getApi<EventsResult>('/home/events/getlists', {
    params: { offset, limit },
    signal,
  })
  const rawItems = Array.isArray(result.list) ? result.list : []
  return {
    items: mapValid(rawItems, adaptRecommendedItem),
    hasMore: result.end !== 1 && rawItems.length > 0,
  }
}

export const getVideos = async (offset: number, limit: number, signal?: AbortSignal) => {
  const result = await getApi<VideosResult>(`/home/videos/${offset}/${limit}`, { signal })
  const rawItems = Array.isArray(result.list) ? result.list : []
  return {
    items: mapValid(rawItems, adaptRecommendedItem).map((item) => ({ ...item, media: 'video' as const })),
    hasMore: result.end !== 1 && rawItems.length > 0,
  }
}
