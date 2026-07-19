export type ContentType = 'recipe' | 'note'

export interface BannerViewModel {
  key: string
  title: string
  imageUrl: string
  targetUrl?: string
}

export interface ContentCardViewModel {
  key: string
  id: string
  type: ContentType
  title: string
  description?: string
  imageUrl: string
  imageRatio: string
  authorName?: string
  authorId?: string
  avatarUrl?: string
  metricText?: string
  media?: 'video' | 'gallery'
}

export interface PagedResult<T> {
  items: T[]
  hasMore: boolean
  banners?: BannerViewModel[]
  nextBtmid?: string
}

export interface RecipeIngredientViewModel {
  name: string
  amount?: string
}

export interface RecipeStepViewModel {
  key: string
  number: number
  description: string
  imageUrl?: string
}

export interface RecipeDetailViewModel {
  type: 'recipe'
  id: string
  title: string
  description?: string
  imageUrl?: string
  authorName?: string
  authorId?: string
  avatarUrl?: string
  favoriteText?: string
  ingredients: RecipeIngredientViewModel[]
  steps: RecipeStepViewModel[]
}

export interface NoteDetailViewModel {
  type: 'note'
  id: string
  title: string
  content: string
  images: string[]
  authorName?: string
  authorId?: string
  avatarUrl?: string
  publishedAt?: string
  likeText?: string
  favoriteText?: string
}

export type DetailViewModel = RecipeDetailViewModel | NoteDetailViewModel

export interface CategoryViewModel {
  key: string
  id: string
  name: string
  imageUrl?: string
  children: CategoryViewModel[]
}

export interface SearchCategoryViewModel {
  key: string
  title: string
  imageUrl?: string
}

export interface SearchDiscoveryViewModel {
  defaultSuggestion: string
  suggestions: string[]
  categories: SearchCategoryViewModel[]
}

export interface CommentViewModel {
  key: string
  id: string
  authorId?: string
  authorName: string
  avatarUrl?: string
  content: string
  time?: string
  location?: string
  likeText?: string
  replies: CommentViewModel[]
}

export interface TopicViewModel {
  key: string
  id: string
  name: string
  description?: string
  imageUrl?: string
  coverImageUrl?: string
  contentCountText?: string
}

export interface PublicUserViewModel {
  id: string
  name: string
  avatarUrl?: string
  bio?: string
  levelText?: string
  followersText?: string
  recipesText?: string
}

export interface CalendarDayViewModel {
  key: string
  day: number
  imageUrl?: string
}

export interface RecipeRelatedViewModel {
  rating?: string
  recommendationText?: string
  comments: CommentViewModel[]
  notes: ContentCardViewModel[]
}
