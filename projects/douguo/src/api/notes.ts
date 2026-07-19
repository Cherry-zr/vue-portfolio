import { adaptNoteItem } from '../adapters/content'
import { adaptTopic } from '../adapters/explore'
import type { ContentCardViewModel, PagedResult, TopicViewModel } from '../types/content'
import type { NoteListResult, TopicDetailResult, TopicListResult } from '../types/douguo'
import { ApiError, getApi } from './request'

const mapNotes = (items: unknown[]) =>
  items.map(adaptNoteItem).filter((item): item is ContentCardViewModel => item !== null)

export const getRelatedNotes = async (
  id: string,
  offset: number,
  limit: number,
  signal?: AbortSignal,
): Promise<PagedResult<ContentCardViewModel>> => {
  const result = await getApi<NoteListResult>(
    `/note/related/${encodeURIComponent(id)}/${offset}/${limit}`,
    { signal },
  )
  const rawItems = Array.isArray(result.list) ? result.list : []
  return { items: mapNotes(rawItems), hasMore: result.end !== 1 && rawItems.length > 0 }
}

export const getTopics = async (
  offset: number,
  limit: number,
  signal?: AbortSignal,
): Promise<PagedResult<TopicViewModel>> => {
  const result = await getApi<TopicListResult>(`/note/topiclist/${offset}/${limit}`, { signal })
  const rawItems = Array.isArray(result.list) ? result.list : []
  return {
    items: rawItems.map(adaptTopic).filter((item): item is TopicViewModel => item !== null),
    hasMore: rawItems.length >= limit,
  }
}

export const getTopicDetail = async (
  id: string,
  offset: number,
  limit: number,
  signal?: AbortSignal,
): Promise<PagedResult<ContentCardViewModel> & { topic: TopicViewModel }> => {
  const result = await getApi<TopicDetailResult>(
    `/note/topicdetail/${encodeURIComponent(id)}/${offset}/${limit}`,
    { signal },
  )
  const topic = adaptTopic(result.topic)
  if (!topic) throw new ApiError('服务器未返回话题信息')
  const rawItems = Array.isArray(result.list) ? result.list : []
  return {
    topic,
    items: mapNotes(rawItems),
    hasMore: result.end !== 1 && rawItems.length > 0,
    nextBtmid: typeof result.btmid === 'string' ? result.btmid : undefined,
  }
}
