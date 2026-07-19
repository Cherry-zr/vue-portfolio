<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAppInitialization } from '../api/app'
import { getEvents, getFollowing, getNotes, getRecommended, getVideos } from '../api/home'
import FoodWaterfall from '../components/FoodWaterfall.vue'
import HomeCarousel from '../components/HomeCarousel.vue'
import PendingState from '../components/PendingState.vue'
import SideDrawer from '../components/SideDrawer.vue'
import { usePagedList } from '../composables/usePagedList'
import type { BannerViewModel, ContentCardViewModel } from '../types/content'

type HomeCategory = '关注' | '推荐' | '笔记' | '视频' | '活动'
type FeedState = ReturnType<typeof usePagedList<ContentCardViewModel>>

const router = useRouter()
const keyword = ref('')
const drawerVisible = ref(false)
const categoryTabs: HomeCategory[] = ['关注', '推荐', '笔记', '视频', '活动']
const activeCategory = ref<HomeCategory>('推荐')
const recommendedBanners: BannerViewModel[] = [
  {
    key: 'banner-summer-wave',
    title: '清凉一夏 冰爽造浪计划',
    imageUrl: `${import.meta.env.BASE_URL}images/home-banners/summer-wave-banner.png`,
    targetUrl: 'https://m.douguo.com/activity/ncpzj/detail/4323?isapp=1&open=0&&dg_refreshkey=publishnote',
  },
  {
    key: 'banner-football-sauce',
    title: '看球必备 捞汁够味',
    imageUrl: `${import.meta.env.BASE_URL}images/home-banners/football-sauce-banner.png`,
    targetUrl: 'https://m.douguo.com/activity/ncpzj/detail/4317?isapp=1&open=0&&dg_refreshkey=publishnote',
  },
]

let noteBtmid: string | undefined

const recommendedState = usePagedList<ContentCardViewModel>({
  limit: 10,
  loader: (offset, limit, signal) => getRecommended(offset, limit, signal),
})
const followingState = usePagedList<ContentCardViewModel>({
  limit: 20,
  loader: (offset, limit, signal) => getFollowing(offset, limit, signal),
})
const notesState = usePagedList<ContentCardViewModel>({
  limit: 20,
  loader: async (offset, limit, signal) => {
    const page = await getNotes(offset, limit, offset === 0 ? undefined : noteBtmid, signal)
    noteBtmid = page.nextBtmid
    return page
  },
})
const eventsState = usePagedList<ContentCardViewModel>({
  limit: 20,
  loader: (offset, limit, signal) => getEvents(offset, limit, signal),
})
const videosState = usePagedList<ContentCardViewModel>({
  limit: 20,
  loader: (offset, limit, signal) => getVideos(offset, limit, signal),
})

const feedStates: Partial<Record<HomeCategory, FeedState>> = {
  关注: followingState,
  推荐: recommendedState,
  笔记: notesState,
  视频: videosState,
  活动: eventsState,
}

const activeState = computed(() => feedStates[activeCategory.value])
const activeItems = computed(() => activeState.value?.items.value ?? [])
const activeBanners = computed(() =>
  activeCategory.value === '推荐' ? recommendedBanners : activeState.value?.banners.value ?? [],
)
const activeInitialLoading = computed(() => activeState.value?.initialLoading.value ?? false)
const activeRefreshing = computed(() => activeState.value?.refreshing.value ?? false)
const activeLoadingMore = computed(() => activeState.value?.loadingMore.value ?? false)
const activeFinished = computed(() => activeState.value?.finished.value ?? true)
const activeError = computed(() => activeState.value?.error.value ?? '')
const isSupportedCategory = computed(() => Boolean(activeState.value))

const goPending = (title: string, reason = '当前豆果公开接口暂不支持该功能') => {
  void router.push({ path: '/pending', query: { title, reason } })
}

const handleSearch = () => {
  const value = keyword.value.trim()
  if (!value) return
  void router.push({ path: '/search', query: { keyword: value } })
}

const handleDrawerSelect = (title: string) => {
  drawerVisible.value = false
  if (title === '菜谱分类') {
    void router.push('/categories')
    return
  }
  if (title === '热门话题') {
    void router.push('/topics')
    return
  }
  goPending(title)
}

const selectCategory = (category: HomeCategory) => {
  activeCategory.value = category
  void feedStates[category]?.loadInitial()
}

const openFeed = (item: ContentCardViewModel) => {
  void router.push({ path: `/detail/${item.id}`, query: { type: item.type } })
}

const openAuthor = (id: string) => {
  void router.push(`/user/${id}`)
}

const refreshActive = () => activeState.value?.refresh()
const loadMoreActive = () => activeState.value?.loadMore()
const retryActive = () => activeState.value?.retry()

onMounted(() => {
  void getAppInitialization().catch(() => undefined)
  void recommendedState.loadInitial()
})
</script>

<template>
  <section class="home-page">
    <div class="home-sticky">
      <header class="home-header">
        <button class="icon-button menu-button" type="button" aria-label="打开侧边栏" @click="drawerVisible = true">
          <van-icon name="wap-nav" />
        </button>

        <van-search
          v-model="keyword"
          class="home-search"
          placeholder="搜索菜谱"
          shape="round"
          background="#ffffff"
          @search="handleSearch"
        />

        <div class="home-actions">
          <button class="icon-button" type="button" aria-label="菜谱分类" @click="router.push('/categories')">
            <van-icon name="apps-o" />
          </button>
          <button class="icon-button notice-button" type="button" aria-label="消息通知" @click="goPending('消息通知')">
            <van-icon name="bell" />
          </button>
        </div>
      </header>

      <nav class="category-tabs" aria-label="首页频道">
        <button
          v-for="tab in categoryTabs"
          :key="tab"
          type="button"
          :class="{ active: activeCategory === tab }"
          @click="selectCategory(tab)"
        >
          {{ tab }}
        </button>
      </nav>
    </div>

    <PendingState
      v-if="!isSupportedCategory"
      :title="`${activeCategory}频道暂不可用`"
      description="当前豆果公开接口没有提供该频道的数据，本页面不会使用本地假数据代替。"
      icon="warning-o"
    />

    <van-pull-refresh
      v-else
      :model-value="activeRefreshing"
      success-text="刷新成功"
      @refresh="refreshActive"
    >
      <div class="home-content">
        <template v-if="activeInitialLoading && activeItems.length === 0">
          <van-skeleton title avatar :row="3" />
          <div class="skeleton-grid">
            <van-skeleton v-for="index in 4" :key="index" image title :row="2" />
          </div>
        </template>

        <PendingState
          v-else-if="activeError && activeItems.length === 0"
          compact
          title="内容加载失败"
          :description="activeError"
          icon="warning-o"
          action-label="重新加载"
          @action="retryActive"
        />

        <template v-else>
          <HomeCarousel
            v-if="activeCategory === '推荐' && activeBanners.length > 0"
            :banners="activeBanners"
          />

          <van-empty v-if="activeItems.length === 0" description="服务器暂未返回内容" />

          <van-list
            v-else
            :loading="activeLoadingMore"
            :finished="activeFinished"
            finished-text="没有更多内容了"
            @load="loadMoreActive"
          >
            <FoodWaterfall :items="activeItems" @open="openFeed" @open-author="openAuthor" />
          </van-list>

          <div v-if="activeError && activeItems.length > 0" class="load-more-error">
            <span>{{ activeError }}</span>
            <button type="button" @click="retryActive">重试</button>
          </div>
        </template>
      </div>
    </van-pull-refresh>

    <SideDrawer :visible="drawerVisible" @close="drawerVisible = false" @select="handleDrawerSelect" />
  </section>
</template>

<style scoped>
.home-page { min-height: 100vh; background: #ffffff; }
.home-sticky {
  position: sticky; top: 0; z-index: 200; padding-top: max(10px, env(safe-area-inset-top));
  background: rgba(255, 255, 255, 0.97); backdrop-filter: blur(12px);
}
.home-header { height: 58px; padding: 0 13px; display: flex; align-items: center; gap: 8px; }
.icon-button {
  position: relative; width: 39px; height: 42px; border: 0; border-radius: 9px; padding: 0;
  display: inline-flex; align-items: center; justify-content: center; flex: 0 0 auto;
  color: #262626; background: transparent; font-size: 29px;
}
.menu-button { font-size: 31px; }
.icon-button:active { background: #f5f5f5; }
.home-search { min-width: 0; flex: 1 1 auto; padding: 0; }
.home-search :deep(.van-search__content) { height: 42px; padding-left: 14px; border-radius: 22px; background: #f5f5f5; }
.home-search :deep(.van-field__left-icon) { margin-right: 8px; color: #a8a8a8; font-size: 20px; }
.home-search :deep(.van-field__control) { color: #666666; font-size: 16px; }
.home-search :deep(.van-field__control::placeholder) { color: #a3a3a3; }
.home-actions { display: flex; align-items: center; }
.category-tabs {
  height: 58px; padding: 0 16px; display: grid; grid-template-columns: repeat(5, 1fr);
  align-items: stretch; border-bottom: 1px solid #f4f4f4;
}
.category-tabs button {
  position: relative; min-width: 0; border: 0; padding: 0 2px; color: #9a9a9a;
  background: transparent; font-size: 16px; white-space: nowrap;
}
.category-tabs button.active { color: #171717; font-weight: 700; }
.category-tabs button.active::after {
  content: ''; position: absolute; right: 25%; bottom: 5px; left: 25%; height: 4px;
  border-radius: 4px; background: #ff4d58;
}
.home-content { padding: 16px 11px 28px; display: flex; flex-direction: column; gap: 17px; }
.skeleton-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px 10px; }
.load-more-error {
  display: flex; align-items: center; justify-content: center; gap: 12px; padding: 12px;
  color: #999999; font-size: 13px;
}
.load-more-error button { border: 0; color: #ff4d58; background: transparent; }
@media (max-width: 375px) {
  .home-header { padding-right: 8px; padding-left: 8px; gap: 4px; }
  .icon-button { width: 34px; font-size: 26px; }
  .category-tabs { padding: 0 8px; }
  .category-tabs button { font-size: 14px; }
}
</style>
