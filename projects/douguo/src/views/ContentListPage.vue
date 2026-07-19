<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getRelatedNotes } from '../api/notes'
import { getLearnedNotes } from '../api/recipe'
import FoodWaterfall from '../components/FoodWaterfall.vue'
import PageHeader from '../components/PageHeader.vue'
import PendingState from '../components/PendingState.vue'
import { usePagedList } from '../composables/usePagedList'
import type { ContentCardViewModel } from '../types/content'

const props = defineProps<{ kind: 'note-related' | 'learned' }>()
const route = useRoute()
const router = useRouter()
const id = computed(() => (typeof route.params.id === 'string' ? route.params.id.trim() : ''))
const title = computed(() => props.kind === 'learned' ? '大家学做的笔记' : '相关笔记')

const list = usePagedList<ContentCardViewModel>({
  limit: 20,
  loader: (offset, limit, signal) => {
    if (!id.value) return Promise.reject(new Error('页面地址缺少内容 ID'))
    return props.kind === 'learned'
      ? getLearnedNotes(id.value, offset, limit, signal)
      : getRelatedNotes(id.value, offset, limit, signal)
  },
})

watch(id, () => {
  list.reset()
  void list.loadInitial()
}, { immediate: true })
</script>

<template>
  <section class="content-list-page">
    <PageHeader :title="title" />
    <main class="content-list-body">
      <div v-if="list.initialLoading.value && list.items.value.length === 0" class="skeleton-grid">
        <van-skeleton v-for="index in 6" :key="index" image title :row="2" />
      </div>
      <PendingState
        v-else-if="list.error.value && list.items.value.length === 0"
        compact
        :title="`${title}加载失败`"
        :description="list.error.value"
        icon="warning-o"
        action-label="重新加载"
        @action="list.retry"
      />
      <van-empty v-else-if="list.items.value.length === 0" description="服务器暂未返回笔记" />
      <van-list
        v-else
        :loading="list.loadingMore.value"
        :finished="list.finished.value"
        finished-text="没有更多笔记了"
        @load="list.loadMore"
      >
        <FoodWaterfall
          :items="list.items.value"
          @open="router.push({ path: `/detail/${$event.id}`, query: { type: $event.type } })"
          @open-author="router.push(`/user/${$event}`)"
        />
      </van-list>
    </main>
  </section>
</template>

<style scoped>
.content-list-page { min-height: 100vh; background: #fff; }
.content-list-body { padding: 18px 11px 36px; }
.skeleton-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px 10px; }
</style>
