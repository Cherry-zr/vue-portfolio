<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getTopicDetail } from '../api/notes'
import FoodWaterfall from '../components/FoodWaterfall.vue'
import PageHeader from '../components/PageHeader.vue'
import PendingState from '../components/PendingState.vue'
import { usePagedList } from '../composables/usePagedList'
import type { ContentCardViewModel, TopicViewModel } from '../types/content'

const route = useRoute()
const router = useRouter()
const topic = ref<TopicViewModel | null>(null)
const coverFailed = ref(false)
const id = computed(() => (typeof route.params.id === 'string' ? route.params.id.trim() : ''))

const content = usePagedList<ContentCardViewModel>({
  limit: 20,
  loader: async (offset, limit, signal) => {
    if (!id.value) throw new Error('话题地址缺少 ID')
    const page = await getTopicDetail(id.value, offset, limit, signal)
    topic.value = page.topic
    return page
  },
})

const openItem = (item: ContentCardViewModel) => {
  void router.push({ path: `/detail/${item.id}`, query: { type: item.type } })
}

watch(id, () => {
  topic.value = null
  coverFailed.value = false
  content.reset()
  void content.loadInitial()
}, { immediate: true })
</script>

<template>
  <section class="topic-detail-page">
    <PageHeader :title="topic?.name || '话题详情'" />
    <main>
      <section v-if="topic" class="topic-hero">
        <img
          v-if="topic.coverImageUrl && !coverFailed"
          class="topic-hero__cover"
          :src="topic.coverImageUrl"
          alt=""
          @error="coverFailed = true"
        />
        <div>
          <h1># {{ topic.name }}</h1>
          <p>{{ topic.description || '分享你的美食灵感与作品' }}</p>
          <span>{{ topic.contentCountText }}</span>
        </div>
      </section>
      <div class="topic-feed">
        <van-skeleton v-if="content.initialLoading.value && content.items.value.length === 0" image title :row="4" />
        <PendingState
          v-else-if="content.error.value && content.items.value.length === 0"
          compact
          title="话题内容加载失败"
          :description="content.error.value"
          icon="warning-o"
          action-label="重新加载"
          @action="content.retry"
        />
        <van-empty v-else-if="content.items.value.length === 0" description="该话题暂时没有内容" />
        <van-list
          v-else
          :loading="content.loadingMore.value"
          :finished="content.finished.value"
          finished-text="没有更多内容了"
          @load="content.loadMore"
        >
          <FoodWaterfall
            :items="content.items.value"
            @open="openItem"
            @open-author="router.push(`/user/${$event}`)"
          />
        </van-list>
      </div>
    </main>
  </section>
</template>

<style scoped>
.topic-detail-page { min-height: 100vh; background: #fff; }
.topic-hero { position: relative; min-height: 190px; overflow: hidden; padding: 26px 20px; display: flex; align-items: end; color: #fff; background: linear-gradient(135deg, #ff8a75, #ff4d58); }
.topic-hero__cover { position: absolute; inset: 0; width: 100%; height: 100%; display: block; object-fit: cover; }
.topic-hero::before { content: ''; position: absolute; inset: 0; background: linear-gradient(transparent 15%, rgba(0, 0, 0, 0.68)); }
.topic-hero > div { position: relative; z-index: 1; }
.topic-hero h1 { margin: 0; font-size: 25px; }
.topic-hero p { margin: 10px 0; line-height: 1.55; }
.topic-hero span { font-size: 13px; opacity: 0.85; }
.topic-feed { padding: 18px 11px 36px; }
</style>
