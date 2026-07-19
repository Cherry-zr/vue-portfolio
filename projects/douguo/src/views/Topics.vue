<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getTopics } from '../api/notes'
import PageHeader from '../components/PageHeader.vue'
import PendingState from '../components/PendingState.vue'
import { usePagedList } from '../composables/usePagedList'
import type { TopicViewModel } from '../types/content'

withDefaults(defineProps<{ embedded?: boolean }>(), { embedded: false })

const router = useRouter()
const failedImages = ref(new Set<string>())
const topics = usePagedList<TopicViewModel>({
  limit: 20,
  loader: (offset, limit, signal) => getTopics(offset, limit, signal),
})

const markFailed = (key: string) => {
  failedImages.value = new Set(failedImages.value).add(key)
}

onMounted(() => void topics.loadInitial())
</script>

<template>
  <section class="topics-page">
    <PageHeader title="热门话题" :show-back="!embedded" />
    <main class="topics-content">
      <div v-if="topics.initialLoading.value && topics.items.value.length === 0" class="topic-skeletons">
        <van-skeleton v-for="index in 5" :key="index" image title :row="2" />
      </div>
      <PendingState
        v-else-if="topics.error.value && topics.items.value.length === 0"
        compact
        title="话题加载失败"
        :description="topics.error.value"
        icon="warning-o"
        action-label="重新加载"
        @action="topics.retry"
      />
      <van-empty v-else-if="topics.items.value.length === 0" description="暂时没有热门话题" />
      <van-list
        v-else
        :loading="topics.loadingMore.value"
        :finished="topics.finished.value"
        finished-text="没有更多话题了"
        @load="topics.loadMore"
      >
        <div class="topic-list">
          <article
            v-for="topic in topics.items.value"
            :key="topic.key"
            class="topic-card"
            role="button"
            tabindex="0"
            @click="router.push(`/topic/${topic.id}`)"
            @keydown.enter="router.push(`/topic/${topic.id}`)"
          >
            <div class="topic-card__media">
              <img
                v-if="topic.coverImageUrl && !failedImages.has(topic.key)"
                :src="topic.coverImageUrl"
                :alt="topic.name"
                @error="markFailed(topic.key)"
              />
              <span v-else><van-icon name="fire-o" /></span>
            </div>
            <div class="topic-card__copy">
              <h2># {{ topic.name }}</h2>
              <p>{{ topic.description || '和豆果用户一起分享美食灵感' }}</p>
              <small>{{ topic.contentCountText }}</small>
            </div>
            <van-icon name="arrow" />
          </article>
        </div>
      </van-list>
    </main>
  </section>
</template>

<style scoped>
.topics-page { min-height: 100%; background: #fff; }
.topics-content { padding: 14px 12px 30px; }
.topic-list { display: flex; flex-direction: column; gap: 12px; }
.topic-card { min-height: 112px; border-radius: 14px; padding: 10px; display: grid; grid-template-columns: 108px 1fr 20px; align-items: center; gap: 12px; background: #f8f8f8; outline: none; }
.topic-card__media { height: 92px; border-radius: 10px; overflow: hidden; display: flex; align-items: center; justify-content: center; color: #ff6b61; background: #ffeceb; font-size: 32px; }
.topic-card__media img { width: 100%; height: 100%; display: block; object-fit: cover; }
.topic-card__copy { min-width: 0; }
.topic-card h2 { margin: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 17px; }
.topic-card p { margin: 8px 0; display: -webkit-box; overflow: hidden; color: #777; font-size: 13px; line-height: 1.45; -webkit-box-orient: vertical; -webkit-line-clamp: 2; }
.topic-card small { color: #ff5b62; }
.topic-card > :deep(.van-icon) { color: #bbb; }
.topic-skeletons { display: flex; flex-direction: column; gap: 15px; }
</style>
