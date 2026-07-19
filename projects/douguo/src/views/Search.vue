<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  getSearchDiscovery,
  getSearchSuggestions,
  searchRecipes,
  type SearchContentType,
  type SearchOrder,
} from '../api/search'
import { getErrorMessage, isRequestCanceled } from '../api/request'
import FoodWaterfall from '../components/FoodWaterfall.vue'
import PendingState from '../components/PendingState.vue'
import { usePagedList } from '../composables/usePagedList'
import type { ContentCardViewModel, SearchDiscoveryViewModel } from '../types/content'

const route = useRoute()
const router = useRouter()
const keywordInput = ref('')
const activeKeyword = ref('')
const activeOrder = ref<SearchOrder>(0)
const activeType = ref<SearchContentType>(0)
const suggestions = ref<string[]>([])
const discovery = ref<SearchDiscoveryViewModel | null>(null)
const discoveryError = ref('')
const discoveryLoading = ref(false)
let discoveryController: AbortController | undefined
let suggestionController: AbortController | undefined
let suggestionTimer: ReturnType<typeof setTimeout> | undefined

const orderOptions: Array<{ label: string; value: SearchOrder }> = [
  { label: '综合', value: 0 },
  { label: '最热', value: 2 },
  { label: '最新', value: 3 },
]
const typeOptions: Array<{ label: string; value: SearchContentType }> = [
  { label: '菜谱', value: 0 },
  { label: '视频', value: 1 },
]

const searchState = usePagedList<ContentCardViewModel>({
  limit: 20,
  loader: (offset, limit, signal) =>
    searchRecipes(activeKeyword.value, offset, limit, activeOrder.value, activeType.value, signal),
})

const routeKeyword = computed(() => (typeof route.query.keyword === 'string' ? route.query.keyword.trim() : ''))
const routeOrder = computed<SearchOrder>(() => {
  const value = Number(route.query.order)
  return value === 2 || value === 3 ? value : 0
})
const routeType = computed<SearchContentType>(() => Number(route.query.type) === 1 ? 1 : 0)
const showSuggestions = computed(() => {
  const input = keywordInput.value.trim()
  return Boolean(input && input !== activeKeyword.value && suggestions.value.length)
})

const loadDiscovery = async () => {
  discoveryController?.abort()
  discoveryController = new AbortController()
  discoveryLoading.value = true
  discoveryError.value = ''
  try {
    discovery.value = await getSearchDiscovery(discoveryController.signal)
    if (!keywordInput.value && discovery.value.defaultSuggestion) {
      keywordInput.value = discovery.value.defaultSuggestion
    }
  } catch (requestError) {
    if (!isRequestCanceled(requestError)) discoveryError.value = getErrorMessage(requestError)
  } finally {
    discoveryLoading.value = false
  }
}

const submitSearch = (value?: string) => {
  const keyword = (value ?? keywordInput.value).trim()
  if (!keyword) return
  suggestions.value = []
  const query = { keyword, order: String(activeOrder.value), type: String(activeType.value) }
  if (
    keyword === routeKeyword.value &&
    activeOrder.value === routeOrder.value &&
    activeType.value === routeType.value
  ) {
    searchState.reset()
    void searchState.loadInitial()
    return
  }
  void router.push({ path: '/search', query })
}

const selectOrder = (value: SearchOrder) => {
  activeOrder.value = value
  if (activeKeyword.value) submitSearch(activeKeyword.value)
}

const selectType = (value: SearchContentType) => {
  activeType.value = value
  if (activeKeyword.value) submitSearch(activeKeyword.value)
}

const openItem = (item: ContentCardViewModel) => {
  void router.push({ path: `/detail/${item.id}`, query: { type: item.type } })
}

watch(keywordInput, (value) => {
  if (suggestionTimer) clearTimeout(suggestionTimer)
  suggestionController?.abort()
  suggestions.value = []
  const keyword = value.trim()
  if (!keyword || keyword === activeKeyword.value) return

  suggestionTimer = setTimeout(async () => {
    suggestionController = new AbortController()
    try {
      suggestions.value = await getSearchSuggestions(keyword, suggestionController.signal)
    } catch (requestError) {
      if (!isRequestCanceled(requestError)) suggestions.value = []
    }
  }, 260)
})

watch(
  () => [routeKeyword.value, routeOrder.value, routeType.value] as const,
  ([keyword, order, type]) => {
    keywordInput.value = keyword
    activeKeyword.value = keyword
    activeOrder.value = order
    activeType.value = type
    searchState.reset()
    if (keyword) void searchState.loadInitial()
  },
  { immediate: true },
)

onMounted(() => void loadDiscovery())
onBeforeUnmount(() => {
  if (suggestionTimer) clearTimeout(suggestionTimer)
  discoveryController?.abort()
  suggestionController?.abort()
})
</script>

<template>
  <section class="search-page">
    <header class="search-header">
      <button type="button" aria-label="返回" @click="router.back()"><van-icon name="arrow-left" /></button>
      <van-search
        v-model="keywordInput"
        class="search-input"
        shape="round"
        :placeholder="discovery?.defaultSuggestion || '输入菜谱关键词'"
        @search="submitSearch()"
      />
      <button class="search-submit" type="button" @click="submitSearch()">搜索</button>
    </header>

    <div v-if="showSuggestions" class="suggestion-panel">
      <button v-for="item in suggestions" :key="item" type="button" @click="submitSearch(item)">
        <van-icon name="search" />
        <span>{{ item }}</span>
        <van-icon name="arrow" />
      </button>
    </div>

    <main v-if="!activeKeyword" class="discovery-content">
      <section class="discovery-section">
        <div class="section-heading"><h1>热门搜索</h1><small>来自豆果实时接口</small></div>
        <div v-if="discoveryLoading" class="hot-loading"><van-loading size="22" /> 正在加载</div>
        <PendingState
          v-else-if="discoveryError"
          compact
          title="搜索推荐加载失败"
          :description="discoveryError"
          icon="warning-o"
          action-label="重新加载"
          @action="loadDiscovery"
        />
        <div v-else class="hot-keywords">
          <button
            v-for="(item, index) in discovery?.suggestions"
            :key="item"
            type="button"
            :class="{ 'hot-keywords__top': index < 3 }"
            @click="submitSearch(item)"
          >
            <em>{{ index + 1 }}</em><span>{{ item }}</span>
          </button>
        </div>
      </section>

      <section v-if="discovery?.categories.length" class="discovery-section">
        <div class="section-heading"><h2>大家都在找</h2></div>
        <div class="category-shortcuts">
          <button v-for="item in discovery.categories" :key="item.key" type="button" @click="submitSearch(item.title)">
            <img v-if="item.imageUrl" :src="item.imageUrl" :alt="item.title" />
            <span v-else><van-icon name="fire-o" /></span>
            <strong>{{ item.title }}</strong>
          </button>
        </div>
      </section>
    </main>

    <van-pull-refresh
      v-else
      :model-value="searchState.refreshing.value"
      success-text="刷新成功"
      @refresh="searchState.refresh"
    >
      <div class="search-content">
        <div class="result-heading">
          <h1>“{{ activeKeyword }}”</h1>
          <small>搜索结果</small>
        </div>

        <div class="filter-row">
          <div>
            <button
              v-for="option in orderOptions"
              :key="option.value"
              type="button"
              :class="{ active: activeOrder === option.value }"
              @click="selectOrder(option.value)"
            >{{ option.label }}</button>
          </div>
          <div class="type-filter">
            <button
              v-for="option in typeOptions"
              :key="option.value"
              type="button"
              :class="{ active: activeType === option.value }"
              @click="selectType(option.value)"
            >{{ option.label }}</button>
          </div>
        </div>

        <div v-if="searchState.initialLoading.value && searchState.items.value.length === 0" class="skeleton-grid">
          <van-skeleton v-for="index in 6" :key="index" image title :row="2" />
        </div>

        <PendingState
          v-else-if="searchState.error.value && searchState.items.value.length === 0"
          compact
          title="搜索失败"
          :description="searchState.error.value"
          icon="warning-o"
          action-label="重新搜索"
          @action="searchState.retry"
        />

        <van-empty
          v-else-if="searchState.items.value.length === 0"
          :description="activeType === 1 ? '当前关键词没有视频结果' : '没有搜索到相关菜谱'"
        />

        <template v-else>
          <van-list
            :loading="searchState.loadingMore.value"
            :finished="searchState.finished.value"
            finished-text="没有更多结果了"
            @load="searchState.loadMore"
          >
            <FoodWaterfall
              :items="searchState.items.value"
              @open="openItem"
              @open-author="router.push(`/user/${$event}`)"
            />
          </van-list>
          <div v-if="searchState.error.value" class="load-error">
            <span>{{ searchState.error.value }}</span>
            <button type="button" @click="searchState.retry">重试</button>
          </div>
        </template>
      </div>
    </van-pull-refresh>
  </section>
</template>

<style scoped>
.search-page { min-height: 100vh; background: #ffffff; }
.search-header {
  position: sticky; top: 0; z-index: 40; min-height: 60px; padding: max(6px, env(safe-area-inset-top)) 8px 4px;
  display: grid; grid-template-columns: 42px minmax(0, 1fr) 52px; align-items: center;
  border-bottom: 1px solid #f2f2f2; background: rgba(255, 255, 255, 0.98); backdrop-filter: blur(12px);
}
.search-header > button { height: 40px; border: 0; padding: 0; color: #252525; background: transparent; font-size: 22px; }
.search-header .search-submit { color: #ff4d58; font-size: 15px; font-weight: 600; }
.search-input { min-width: 0; padding: 0; }
.suggestion-panel { position: fixed; z-index: 35; top: 60px; right: 0; left: 0; max-width: 430px; margin: 0 auto; padding: 5px 14px 12px; border-bottom: 1px solid #eee; background: #fff; box-shadow: 0 14px 24px rgba(0,0,0,.08); }
.suggestion-panel button { width: 100%; min-height: 46px; border: 0; display: grid; grid-template-columns: 24px 1fr 18px; align-items: center; text-align: left; color: #555; background: transparent; }
.suggestion-panel button + button { border-top: 1px solid #f4f4f4; }
.suggestion-panel :deep(.van-icon:last-child) { color: #bbb; }
.discovery-content { padding: 20px 16px 36px; }
.discovery-section + .discovery-section { margin-top: 32px; }
.section-heading { margin-bottom: 16px; display: flex; align-items: baseline; justify-content: space-between; }
.section-heading h1, .section-heading h2 { margin: 0; font-size: 20px; }
.section-heading small { color: #aaa; font-size: 11px; }
.hot-loading { height: 120px; display: flex; align-items: center; justify-content: center; gap: 8px; color: #999; }
.hot-keywords { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 22px; }
.hot-keywords button { min-width: 0; height: 44px; border: 0; display: flex; align-items: center; gap: 9px; text-align: left; background: transparent; }
.hot-keywords em { width: 18px; color: #aaa; font-style: normal; font-size: 13px; }
.hot-keywords span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: #444; font-size: 14px; }
.hot-keywords__top em { color: #ff4d58; font-weight: 700; }
.category-shortcuts { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 18px 10px; }
.category-shortcuts button { min-width: 0; border: 0; padding: 0; display: flex; flex-direction: column; align-items: center; gap: 7px; background: transparent; }
.category-shortcuts img, .category-shortcuts button > span { width: 62px; height: 62px; border-radius: 18px; display: flex; align-items: center; justify-content: center; object-fit: cover; color: #ff695f; background: #fff0ef; font-size: 25px; }
.category-shortcuts strong { overflow: hidden; max-width: 100%; text-overflow: ellipsis; white-space: nowrap; color: #555; font-size: 12px; font-weight: 500; }
.search-content { padding: 18px 12px 40px; }
.result-heading { margin: 0 4px 16px; display: flex; align-items: baseline; gap: 8px; }
.result-heading h1 { margin: 0; font-size: 20px; }
.result-heading small { color: #aaa; }
.filter-row { margin: 0 0 18px; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.filter-row > div { padding: 3px; display: flex; gap: 2px; border-radius: 18px; background: #f6f6f6; }
.filter-row button { height: 30px; border: 0; border-radius: 15px; padding: 0 13px; color: #888; background: transparent; font-size: 12px; }
.filter-row button.active { color: #fff; background: #ff4d58; box-shadow: 0 4px 10px rgba(255,77,88,.2); }
.type-filter button { padding: 0 11px; }
.skeleton-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px 10px; }
.load-error { display: flex; align-items: center; justify-content: center; gap: 10px; padding: 16px; color: #999; font-size: 13px; }
.load-error button { border: 0; color: #ff4d58; background: transparent; }
@media (max-width: 350px) {
  .filter-row { align-items: flex-start; flex-direction: column; }
  .category-shortcuts img, .category-shortcuts button > span { width: 56px; height: 56px; }
}
</style>
