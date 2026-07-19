<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getRecipeComments } from '../api/recipe'
import CommentList from '../components/CommentList.vue'
import PageHeader from '../components/PageHeader.vue'
import PendingState from '../components/PendingState.vue'
import { usePagedList } from '../composables/usePagedList'
import type { CommentViewModel } from '../types/content'

const route = useRoute()
const router = useRouter()
const id = computed(() => (typeof route.params.id === 'string' ? route.params.id.trim() : ''))
const comments = usePagedList<CommentViewModel>({
  limit: 20,
  loader: (offset, limit, signal) => id.value
    ? getRecipeComments(id.value, offset, limit, signal)
    : Promise.reject(new Error('页面地址缺少菜谱 ID')),
})

watch(id, () => {
  comments.reset()
  void comments.loadInitial()
}, { immediate: true })
</script>

<template>
  <section class="comments-page">
    <PageHeader title="菜谱评论" />
    <main class="comments-body">
      <van-skeleton v-if="comments.initialLoading.value && comments.items.value.length === 0" title avatar :row="5" />
      <PendingState
        v-else-if="comments.error.value && comments.items.value.length === 0"
        compact
        title="评论加载失败"
        :description="comments.error.value"
        icon="warning-o"
        action-label="重新加载"
        @action="comments.retry"
      />
      <van-empty v-else-if="comments.items.value.length === 0" description="暂时没有评论" />
      <van-list
        v-else
        :loading="comments.loadingMore.value"
        :finished="comments.finished.value"
        finished-text="没有更多评论了"
        @load="comments.loadMore"
      >
        <CommentList :comments="comments.items.value" @open-user="router.push(`/user/${$event}`)" />
      </van-list>
    </main>
  </section>
</template>

<style scoped>
.comments-page { min-height: 100vh; background: #fff; }
.comments-body { padding: 4px 18px 36px; }
</style>
