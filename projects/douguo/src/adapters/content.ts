import { ApiError } from '../api/request'
import type {
  BannerViewModel,
  CategoryViewModel,
  ContentCardViewModel,
  NoteDetailViewModel,
  RecipeDetailViewModel,
  RecipeIngredientViewModel,
  RecipeStepViewModel,
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
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value)
    if (Number.isFinite(parsed)) return parsed
  }
  return undefined
}

export const normalizeRemoteUrl = (value: unknown) => {
  const raw = toStringValue(value)
  if (!/^https?:\/\//i.test(raw)) return ''

  try {
    const url = new URL(raw)
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return ''
    if (url.protocol === 'http:') url.protocol = 'https:'
    return url.toString()
  } catch {
    return ''
  }
}

const getRatio = (width: unknown, height: unknown) => {
  const safeWidth = toNumber(width)
  const safeHeight = toNumber(height)
  return safeWidth && safeHeight && safeWidth > 0 && safeHeight > 0 ? `${safeWidth} / ${safeHeight}` : '4 / 5'
}

const getMetric = (...values: unknown[]) => values.map(toStringValue).find(Boolean)

export const adaptRecommendedBanner = (value: unknown): BannerViewModel | null => {
  const banner = toRecord(value)
  if (!banner) return null

  const imageUrl = normalizeRemoteUrl(banner.i)
  if (!imageUrl) return null

  const id = toStringValue(banner.id) || imageUrl
  const targetUrl = normalizeRemoteUrl(banner.url)
  return {
    key: `banner-${id}`,
    title: toStringValue(banner.t) || '活动推荐',
    imageUrl,
    targetUrl: targetUrl || undefined,
  }
}

export const adaptRecommendedItem = (value: unknown): ContentCardViewModel | null => {
  const item = toRecord(value)
  if (!item || toNumber(item.type) !== 11) return null

  const recipe = toRecord(item.r)
  const author = toRecord(recipe?.a)
  if (!recipe) return null

  const id = toStringValue(recipe.id)
  const title = toStringValue(recipe.n)
  const imageUrl = normalizeRemoteUrl(recipe.img || recipe.p || recipe.gif)
  if (!id || !title || !imageUrl) return null

  return {
    key: `recipe-${id}`,
    id,
    type: 'recipe',
    title,
    imageUrl,
    imageRatio: getRatio(recipe.pw, recipe.ph),
    authorName: toStringValue(author?.n) || undefined,
    authorId: toStringValue(author?.id) || undefined,
    avatarUrl: normalizeRemoteUrl(author?.p) || undefined,
    metricText: getMetric(recipe.collect_count_text, recipe.fc),
    media: toStringValue(recipe.vu || recipe.vfurl) ? 'video' : undefined,
  }
}

export const adaptNoteItem = (value: unknown): ContentCardViewModel | null => {
  const item = toRecord(value)
  if (!item || toNumber(item.type) !== 1) return null

  const note = toRecord(item.note)
  const author = toRecord(note?.author)
  if (!note) return null

  const id = toStringValue(note.id)
  const title = toStringValue(note.title)
  const imageUrl = normalizeRemoteUrl(note.image_u)
  if (!id || !title || !imageUrl) return null

  return {
    key: `note-${id}`,
    id,
    type: 'note',
    title,
    imageUrl,
    imageRatio: getRatio(note.image_w, note.image_h),
    authorName: toStringValue(author?.n) || undefined,
    authorId: toStringValue(author?.id) || undefined,
    avatarUrl: normalizeRemoteUrl(author?.p) || undefined,
    metricText: getMetric(note.like_count, note.favo_count),
    media: toNumber(note.media_type) === 1 ? 'video' : toArray(note.images).length > 1 ? 'gallery' : undefined,
  }
}

export const adaptFollowingItem = (value: unknown): ContentCardViewModel | null => {
  const feed = toRecord(value)
  if (!feed) return null

  const author = toRecord(feed.u)
  const id = toStringValue(feed.item_id)
  const title = toStringValue(feed.t || feed.trim_title || feed.n)
  const imageUrl = normalizeRemoteUrl(feed.img)
  if (!id || !title || !imageUrl) return null

  return {
    key: `recipe-${id}`,
    id,
    type: 'recipe',
    title,
    description: toStringValue(feed.n) || undefined,
    imageUrl,
    imageRatio: getRatio(feed.pw, feed.ph),
    authorName: toStringValue(author?.n) || undefined,
    authorId: toStringValue(author?.id) || undefined,
    avatarUrl: normalizeRemoteUrl(author?.p) || undefined,
    metricText: getMetric(feed.collect_count_text, feed.views_count_text, feed.fc),
    media: toNumber(feed.media_type) === 1 ? 'video' : undefined,
  }
}

export const adaptSearchItem = (value: unknown): ContentCardViewModel | null => {
  const item = toRecord(value)
  if (!item || toNumber(item.type) !== 13) return null

  const recipe = toRecord(item.r)
  const author = toRecord(recipe?.a)
  if (!recipe) return null

  const id = toStringValue(recipe.id)
  const title = toStringValue(recipe.n)
  const imageUrl = normalizeRemoteUrl(recipe.img || recipe.p)
  if (!id || !title || !imageUrl) return null

  return {
    key: `recipe-${id}`,
    id,
    type: 'recipe',
    title,
    description: toStringValue(recipe.recommendation_tag || recipe.recommend_label) || undefined,
    imageUrl,
    imageRatio: getRatio(recipe.pw, recipe.ph),
    authorName: toStringValue(author?.n || recipe.an) || undefined,
    authorId: toStringValue(author?.id) || undefined,
    avatarUrl: normalizeRemoteUrl(author?.p) || undefined,
    metricText: getMetric(recipe.vc, recipe.fc),
  }
}

export const adaptCategory = (value: unknown, path = 'category'): CategoryViewModel | null => {
  const category = toRecord(value)
  if (!category) return null

  const id = toStringValue(category.id)
  const name = toStringValue(category.name)
  const children = toArray(category.cs)
    .map((child, index) => adaptCategory(child, `${path}-${id || index}`))
    .filter((child): child is CategoryViewModel => child !== null)

  if (!name && children.length === 0) return null

  return {
    key: `${path}-${id || name}`,
    id: id || name,
    name,
    imageUrl: normalizeRemoteUrl(category.image_url) || undefined,
    children,
  }
}

export const adaptNoteDetail = (value: unknown): NoteDetailViewModel => {
  const note = toRecord(value)
  if (!note) throw new ApiError('笔记详情响应格式异常')

  const id = toStringValue(note.id)
  const title = toStringValue(note.title)
  if (!id || !title) throw new ApiError('笔记详情缺少必要字段')

  const author = toRecord(note.author)
  const content = toArray(note.contents)
    .map(toRecord)
    .filter((block): block is UnknownRecord => Boolean(block))
    .filter((block) => toNumber(block.type) === 0)
    .map((block) => toStringValue(block.c))
    .filter(Boolean)
    .join('\n\n')

  const images = toArray(note.images)
    .map(toRecord)
    .map((image) => normalizeRemoteUrl(image?.u))
    .filter(Boolean)

  return {
    type: 'note',
    id,
    title,
    content,
    images,
    authorName: toStringValue(author?.n) || undefined,
    authorId: toStringValue(author?.id) || undefined,
    avatarUrl: normalizeRemoteUrl(author?.p) || undefined,
    publishedAt: toStringValue(note.publishtime) || undefined,
    likeText: getMetric(note.like_count_text, note.like_count),
    favoriteText: getMetric(note.favo_count_text, note.favo_count),
  }
}

const adaptIngredient = (value: unknown): RecipeIngredientViewModel | null => {
  const ingredient = toRecord(value)
  if (!ingredient) return null
  const name = toStringValue(ingredient.title || ingredient.name)
  if (!name) return null
  return { name, amount: toStringValue(ingredient.note || ingredient.amount) || undefined }
}

const adaptStep = (value: unknown, index: number): RecipeStepViewModel | null => {
  const step = toRecord(value)
  if (!step) return null
  const description = toStringValue(step.content || step.c || step.text)
  if (!description) return null
  return {
    key: `step-${index + 1}`,
    number: index + 1,
    description,
    imageUrl: normalizeRemoteUrl(step.image || step.img || step.pic) || undefined,
  }
}

export const adaptRecipeDetail = (value: unknown): RecipeDetailViewModel => {
  const result = toRecord(value)
  const recipe = toRecord(result?.recipe)
  if (!recipe) throw new ApiError('当前菜谱详情响应结构暂不支持')

  const id = toStringValue(recipe.id)
  const title = toStringValue(recipe.title || recipe.n)
  if (!id || !title) throw new ApiError('菜谱详情缺少必要字段')

  const author = toRecord(recipe.author || recipe.a)
  const ingredients = [...toArray(recipe.major), ...toArray(recipe.minor)]
    .map(adaptIngredient)
    .filter((item): item is RecipeIngredientViewModel => item !== null)
  const steps = toArray(recipe.cookstep || recipe.steps)
    .map(adaptStep)
    .filter((item): item is RecipeStepViewModel => item !== null)

  return {
    type: 'recipe',
    id,
    title,
    description: toStringValue(recipe.cook_story || recipe.description) || undefined,
    imageUrl: normalizeRemoteUrl(recipe.photo_path || recipe.image || recipe.img) || undefined,
    authorName: toStringValue(author?.n || author?.name) || undefined,
    authorId: toStringValue(author?.id) || undefined,
    avatarUrl: normalizeRemoteUrl(author?.p || author?.avatar) || undefined,
    favoriteText: getMetric(recipe.collect_count_text, recipe.fc),
    ingredients,
    steps,
  }
}
