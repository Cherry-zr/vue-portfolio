export interface DouguoEnvelope<T> {
  state: string
  result: T
  code?: number | string
}

export interface RecommendedResult {
  banner?: unknown[]
  list?: unknown[]
}

export interface FollowingResult {
  feeds?: unknown[]
  end?: number
  bottom_id?: number | string
}

export interface NotesResult {
  list?: unknown[]
  end?: number
  btmid?: unknown
}

export interface EventsResult {
  list?: unknown[]
  end?: number
}

export interface VideosResult {
  list?: unknown[]
  end?: number
}

export interface SearchResult {
  list?: unknown[]
  end?: number
}

export interface SearchDiscoveryResult {
  suggests?: unknown[]
  suggestdetails?: unknown[]
  categories?: unknown[]
  defaultsuggest?: unknown
  default_search?: unknown
}

export interface CategoriesResult {
  cs?: unknown[]
}

export interface NoteDetailResult {
  note?: unknown
}

export interface RecipeRelatedResult {
  rate?: unknown
  recommendation_tag?: unknown
  comments?: unknown[]
  notes?: unknown[]
}

export interface CommentsResult {
  comments?: unknown[]
  el?: number
}

export interface NoteListResult {
  list?: unknown[]
  end?: number
  btmid?: unknown
}

export interface TopicListResult {
  list?: unknown[]
}

export interface TopicDetailResult extends NoteListResult {
  topic?: unknown
}

export interface UserInfoResult {
  user?: unknown
  u?: unknown
}

export interface UserCalendarResult {
  day_list?: unknown[]
  prompt_text?: unknown
}

export interface UserNotesResult {
  notes?: unknown[]
  end?: number
}

export interface UserRecipesResult {
  list?: unknown[]
  end?: number
}

export interface UserFavoritesResult {
  recipes?: unknown[]
  end?: number
}
