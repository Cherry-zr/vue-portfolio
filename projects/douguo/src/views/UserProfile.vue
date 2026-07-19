<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { showToast } from 'vant'
import { useRoute, useRouter } from 'vue-router'
import { getUserFavorites, getUserInfo, getUserNotes, getUserRecipes } from '../api/user'
import { getErrorMessage, isRequestCanceled } from '../api/request'
import FoodWaterfall from '../components/FoodWaterfall.vue'
import PageHeader from '../components/PageHeader.vue'
import PendingState from '../components/PendingState.vue'
import { usePagedList } from '../composables/usePagedList'
import type { ContentCardViewModel, PublicUserViewModel } from '../types/content'

type UserTab = '菜谱' | '笔记' | '收藏'
type FeedState = ReturnType<typeof usePagedList<ContentCardViewModel>>

const route = useRoute()
const router = useRouter()
const id = computed(() => (typeof route.params.id === 'string' ? route.params.id.trim() : ''))
const profile = ref<PublicUserViewModel | null>(null)
const profileError = ref('')
const profileLoading = ref(false)
const activeTab = ref<UserTab>('菜谱')
const tabs: UserTab[] = ['菜谱', '笔记', '收藏']
let profileController: AbortController | undefined

const recipes = usePagedList<ContentCardViewModel>({ limit: 20, loader: (o, l, s) => getUserRecipes(id.value, o, l, s) })
const notes = usePagedList<ContentCardViewModel>({ limit: 20, loader: (o, l, s) => getUserNotes(id.value, o, l, s) })
const favorites = usePagedList<ContentCardViewModel>({ limit: 20, loader: (o, l, s) => getUserFavorites(id.value, o, l, s) })
const states: Record<UserTab, FeedState> = { 菜谱: recipes, 笔记: notes, 收藏: favorites }
const activeState = computed(() => states[activeTab.value])
const firstKnownItem = computed(() => recipes.items.value[0] || notes.items.value[0] || favorites.items.value[0])
const displayName = computed(() => profile.value?.name || firstKnownItem.value?.authorName || `豆果用户 ${id.value}`)
const displayAvatar = computed(() => profile.value?.avatarUrl || firstKnownItem.value?.avatarUrl)

const loadProfile = async () => {
  profileController?.abort()
  profile.value = null
  profileError.value = ''
  if (!id.value) return
  profileController = new AbortController()
  profileLoading.value = true
  try {
    profile.value = await getUserInfo(id.value, profileController.signal)
  } catch (requestError) {
    if (!isRequestCanceled(requestError)) profileError.value = getErrorMessage(requestError)
  } finally {
    profileLoading.value = false
  }
}

const selectTab = (tab: UserTab) => {
  activeTab.value = tab
  void states[tab].loadInitial()
}

const reset = () => {
  activeTab.value = '菜谱'
  recipes.reset()
  notes.reset()
  favorites.reset()
  void Promise.all([loadProfile(), recipes.loadInitial()])
}

watch(id, reset, { immediate: true })
onBeforeUnmount(() => profileController?.abort())
</script>

<template>
  <section class="user-page">
    <PageHeader :title="displayName" />
    <main>
      <section class="user-hero">
        <img v-if="displayAvatar" :src="displayAvatar" alt="" />
        <span v-else><van-icon name="contact" /></span>
        <div>
          <h1>{{ displayName }}</h1>
          <p>{{ profile?.bio || '公开豆果主页' }}</p>
          <small v-if="profile?.levelText">等级 {{ profile.levelText }}</small>
        </div>
        <button type="button" @click="showToast('关注需要登录及写入接口，当前仅支持浏览')">关注</button>
      </section>
      <p v-if="profileError" class="profile-warning">
        用户资料接口：{{ profileError }}。下方公开作品列表仍会独立加载。
      </p>
      <div v-if="profileLoading" class="profile-loading"><van-loading size="18px" /> 正在读取公开资料</div>
      <nav class="user-tools">
        <button type="button" @click="router.push(`/user/${id}/calendar`)"><van-icon name="calendar-o" />发布日历</button>
        <button type="button" @click="showToast('私信需要登录接口，当前不可用')"><van-icon name="chat-o" />私信</button>
      </nav>
      <nav class="user-tabs">
        <button v-for="tab in tabs" :key="tab" type="button" :class="{ active: activeTab === tab }" @click="selectTab(tab)">{{ tab }}</button>
      </nav>
      <section class="user-feed">
        <div v-if="activeState.initialLoading.value && activeState.items.value.length === 0" class="skeleton-grid">
          <van-skeleton v-for="index in 4" :key="index" image title :row="2" />
        </div>
        <PendingState
          v-else-if="activeState.error.value && activeState.items.value.length === 0"
          compact
          :title="`${activeTab}加载失败`"
          :description="activeState.error.value"
          icon="warning-o"
          action-label="重新加载"
          @action="activeState.retry"
        />
        <van-empty v-else-if="activeState.items.value.length === 0" :description="`该用户暂无${activeTab}`" />
        <van-list
          v-else
          :loading="activeState.loadingMore.value"
          :finished="activeState.finished.value"
          finished-text="没有更多内容了"
          @load="activeState.loadMore"
        >
          <FoodWaterfall
            :items="activeState.items.value"
            @open="router.push({ path: `/detail/${$event.id}`, query: { type: $event.type } })"
            @open-author="router.push(`/user/${$event}`)"
          />
        </van-list>
      </section>
    </main>
  </section>
</template>

<style scoped>
.user-page { min-height: 100vh; background: #fff; }
.user-hero { padding: 24px 18px 18px; display: grid; grid-template-columns: 66px 1fr auto; align-items: center; gap: 13px; }
.user-hero > img, .user-hero > span { width: 66px; height: 66px; border-radius: 50%; }
.user-hero > img { object-fit: cover; }
.user-hero > span { display: flex; align-items: center; justify-content: center; color: #aaa; background: #eee; font-size: 32px; }
.user-hero h1 { margin: 0; font-size: 21px; }
.user-hero p { margin: 6px 0; color: #777; font-size: 13px; }
.user-hero small { color: #ff5b62; }
.user-hero > button { min-width: 68px; height: 35px; border: 0; border-radius: 19px; color: #fff; background: #ff4d58; }
.profile-warning { margin: 0 18px 10px; border-radius: 10px; padding: 10px 12px; color: #8d6c49; background: #fff8ed; font-size: 12px; line-height: 1.55; }
.profile-loading { margin: 0 18px 10px; color: #999; font-size: 12px; }
.user-tools { margin: 0 18px 18px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
.user-tools button { min-height: 42px; border: 0; border-radius: 10px; color: #555; background: #f7f7f7; }
.user-tools :deep(.van-icon) { margin-right: 7px; color: #ff5b62; }
.user-tabs { height: 50px; display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid #f3f3f3; border-bottom: 1px solid #f3f3f3; }
.user-tabs button { position: relative; border: 0; color: #999; background: #fff; }
.user-tabs button.active { color: #222; font-weight: 700; }
.user-tabs button.active::after { content: ''; position: absolute; right: 36%; bottom: 4px; left: 36%; height: 3px; border-radius: 3px; background: #ff4d58; }
.user-feed { padding: 17px 11px 38px; }
.skeleton-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px 10px; }
</style>
