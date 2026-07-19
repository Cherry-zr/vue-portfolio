import { adaptNoteItem, adaptRecommendedItem, normalizeRemoteUrl } from './content'
import type {
  CalendarDayViewModel,
  CommentViewModel,
  ContentCardViewModel,
  PublicUserViewModel,
  RecipeRelatedViewModel,
  SearchDiscoveryViewModel,
  TopicViewModel,
} from '../types/content'

type UnknownRecord = Record<string, unknown>

const isRecord = (value: unknown): value is UnknownRecord =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const toRecord = (value: unknown) => (isRecord(value) ? value : undefined)
const toArray = (value: unknown): unknown[] => (Array.isArray(value) ? value : [])

const toStringValue = (value: unknown) => {
  if (typeof value === 'string') return value.trim()
  if (typeof value === 'number' && Number.isFinite(value)) return String(value)
  return ''
}

const toNumber = (value: unknown) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : undefined
}

const getTextBlocks = (value: unknown) =>
  toArray(value)
    .map(toRecord)
    .map((item) => toStringValue(item?.c || item?.content || item?.text))
    .filter(Boolean)
    .join('\n')

export const adaptSearchDiscovery = (value: unknown): SearchDiscoveryViewModel => {
  const result = toRecord(value)
  const suggestions = toArray(result?.suggests)
    .map(toRecord)
    .map((item) => toStringValue(item?.name || item?.title))
    .filter(Boolean)

  const categories = toArray(result?.categories)
    .map(toRecord)
    .map((item, index) => {
      const title = toStringValue(item?.title || item?.name)
      if (!title) return null
      return {
        key: `search-category-${index}-${title}`,
        title,
        imageUrl: normalizeRemoteUrl(item?.image_url || item?.image) || undefined,
      }
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)

  return {
    defaultSuggestion: toStringValue(result?.defaultsuggest || result?.default_search),
    suggestions: [...new Set(suggestions)],
    categories,
  }
}

export const adaptComment = (value: unknown, path = 'comment'): CommentViewModel | null => {
  const comment = toRecord(value)
  if (!comment) return null
  const author = toRecord(comment.u || comment.author)
  const id = toStringValue(comment.id)
  const content = getTextBlocks(comment.content) || toStringValue(comment.content)
  if (!id || !content) return null

  const replies = toArray(comment.child_comments)
    .map((reply, index) => adaptComment(reply, `${path}-${id}-${index}`))
    .filter((reply): reply is CommentViewModel => reply !== null)

  return {
    key: `${path}-${id}`,
    id,
    authorId: toStringValue(author?.id) || undefined,
    authorName: toStringValue(author?.n || author?.name) || '豆果用户',
    avatarUrl: normalizeRemoteUrl(author?.p || author?.avatar) || undefined,
    content,
    time: toStringValue(comment.time) || undefined,
    location: toStringValue(comment.ip_address_location || comment.city) || undefined,
    likeText: toStringValue(comment.like_count) || undefined,
    replies,
  }
}

export const adaptRecipeRelated = (value: unknown): RecipeRelatedViewModel => {
  const result = toRecord(value)
  const comments = toArray(result?.comments)
    .map((item, index) => adaptComment(item, `related-comment-${index}`))
    .filter((item): item is CommentViewModel => item !== null)
  const notes = toArray(result?.notes)
    .map((note) => adaptNoteItem({ type: 1, note }))
    .filter((item): item is ContentCardViewModel => item !== null)

  return {
    rating: toStringValue(result?.rate) || undefined,
    recommendationText: toStringValue(result?.recommendation_tag) || undefined,
    comments,
    notes,
  }
}

export const adaptTopic = (value: unknown): TopicViewModel | null => {
  const topic = toRecord(value)
  if (!topic) return null
  const id = toStringValue(topic.id)
  const name = toStringValue(topic.name)
  if (!id || !name) return null
  const count = toStringValue(topic.content_count)
  return {
    key: `topic-${id}`,
    id,
    name,
    description: toStringValue(topic.description) || undefined,
    imageUrl: normalizeRemoteUrl(topic.image || topic.icon) || undefined,
    coverImageUrl: normalizeRemoteUrl(topic.cover_image || topic.image) || undefined,
    contentCountText: count ? `${count} 篇内容` : undefined,
  }
}

export const adaptUserInfo = (value: unknown, fallbackId: string): PublicUserViewModel | null => {
  const result = toRecord(value)
  const user = toRecord(result?.user || result?.u || value)
  if (!user) return null
  const id = toStringValue(user.id) || fallbackId
  const name = toStringValue(user.n || user.name || user.nickname)
  if (!name) return null
  return {
    id,
    name,
    avatarUrl: normalizeRemoteUrl(user.p || user.avatar || user.avatar_url) || undefined,
    bio: toStringValue(user.intro || user.description || user.bio) || undefined,
    levelText: toStringValue(user.lvl || user.level) || undefined,
    followersText: toStringValue(user.followers_count_text || user.fans_count) || undefined,
    recipesText: toStringValue(user.recipes_count_text || user.recipe_count) || undefined,
  }
}

export const adaptUserRecipe = (value: unknown): ContentCardViewModel | null => {
  const item = toRecord(value)
  return item ? adaptRecommendedItem({ type: 11, r: item.r || item.recipe || item }) : null
}

export const adaptFavoriteRecipe = (value: unknown): ContentCardViewModel | null => {
  const recipe = toRecord(value)
  if (!recipe) return null
  const author = toRecord(recipe.a || recipe.author)
  const id = toStringValue(recipe.id)
  const title = toStringValue(recipe.n || recipe.title)
  const imageUrl = normalizeRemoteUrl(recipe.img || recipe.thumb_path || recipe.p)
  if (!id || !title || !imageUrl) return null

  return {
    key: `favorite-recipe-${id}`,
    id,
    type: 'recipe',
    title,
    description: toStringValue(recipe.recommend_label) || undefined,
    imageUrl,
    imageRatio: '4 / 5',
    authorId: toStringValue(author?.id) || undefined,
    authorName: toStringValue(author?.n || author?.name) || undefined,
    avatarUrl: normalizeRemoteUrl(author?.p || author?.avatar) || undefined,
    metricText: toStringValue(recipe.views_count_text || recipe.favo_counts_text) || undefined,
    media: toStringValue(recipe.video_url || recipe.vfurl) ? 'video' : undefined,
  }
}

export const adaptUserNoteGroups = (value: unknown): ContentCardViewModel[] =>
  toArray(value).flatMap((group) => {
    const record = toRecord(group)
    return toArray(record?.day_list)
      .map((note) => adaptNoteItem({ type: 1, note }))
      .filter((item): item is ContentCardViewModel => item !== null)
  })

export const adaptCalendarDay = (value: unknown, year: number, month: number): CalendarDayViewModel | null => {
  const day = toRecord(value)
  const dayNumber = toNumber(day?.day)
  if (!dayNumber) return null
  return {
    key: `${year}-${month}-${dayNumber}`,
    day: dayNumber,
    imageUrl: normalizeRemoteUrl(day?.image) || undefined,
  }
}
