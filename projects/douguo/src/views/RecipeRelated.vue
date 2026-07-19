<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getRecipeRelated } from '../api/recipe'
import { getErrorMessage, isRequestCanceled } from '../api/request'
import CommentList from '../components/CommentList.vue'
import FoodWaterfall from '../components/FoodWaterfall.vue'
import PageHeader from '../components/PageHeader.vue'
import PendingState from '../components/PendingState.vue'
import type { RecipeRelatedViewModel } from '../types/content'

const route = useRoute()
const router = useRouter()
const id = computed(() => (typeof route.params.id === 'string' ? route.params.id.trim() : ''))
const data = ref<RecipeRelatedViewModel | null>(null)
const loading = ref(false)
const error = ref('')
let controller: AbortController | undefined

const load = async () => {
  controller?.abort()
  data.value = null
  error.value = ''
  if (!id.value) {
    error.value = '页面地址缺少菜谱 ID'
    return
  }
  controller = new AbortController()
  loading.value = true
  try {
    data.value = await getRecipeRelated(id.value, controller.signal)
  } catch (requestError) {
    if (!isRequestCanceled(requestError)) error.value = getErrorMessage(requestError)
  } finally {
    loading.value = false
  }
}

watch(id, () => void load(), { immediate: true })
onBeforeUnmount(() => controller?.abort())
</script>

<template>
  <section class="related-page">
    <PageHeader title="菜谱相关信息" />
    <main class="related-body">
      <van-skeleton v-if="loading" title avatar :row="8" />
      <PendingState v-else-if="error" compact title="相关信息加载失败" :description="error" icon="warning-o" action-label="重新加载" @action="load" />
      <template v-else-if="data">
        <section class="rating-card">
          <div><strong>{{ data.rating || '--' }}</strong><span>综合评分</span></div>
          <p>{{ data.recommendationText || '来自豆果用户的真实反馈' }}</p>
        </section>
        <nav class="related-links">
          <button type="button" @click="router.push(`/recipe/${id}/comments`)"><van-icon name="comment-o" />全部评论</button>
          <button type="button" @click="router.push(`/recipe/${id}/learned`)"><van-icon name="notes-o" />学做笔记</button>
          <button type="button" @click="router.push(`/recipe/${id}/nutrient`)"><van-icon name="chart-trending-o" />营养分析</button>
        </nav>
        <section v-if="data.comments.length" class="related-section">
          <h2>热门评论</h2>
          <CommentList :comments="data.comments" @open-user="router.push(`/user/${$event}`)" />
        </section>
        <section v-if="data.notes.length" class="related-section">
          <h2>大家的学做笔记</h2>
          <FoodWaterfall
            :items="data.notes"
            @open="router.push({ path: `/detail/${$event.id}`, query: { type: $event.type } })"
            @open-author="router.push(`/user/${$event}`)"
          />
        </section>
      </template>
    </main>
  </section>
</template>

<style scoped>
.related-page { min-height: 100vh; background: #fff; }
.related-body { padding: 18px 14px 40px; }
.rating-card { border-radius: 15px; padding: 20px; display: flex; align-items: center; gap: 18px; color: #fff; background: linear-gradient(135deg, #ff805d, #ff4d58); }
.rating-card div { display: flex; flex-direction: column; align-items: center; }
.rating-card strong { font-size: 34px; }
.rating-card span, .rating-card p { font-size: 13px; }
.rating-card p { margin: 0; line-height: 1.6; }
.related-links { margin: 14px 0 26px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 9px; }
.related-links button { min-height: 74px; border: 0; border-radius: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; color: #555; background: #f7f7f7; font-size: 13px; }
.related-links :deep(.van-icon) { color: #ff5b62; font-size: 24px; }
.related-section + .related-section { margin-top: 30px; }
.related-section h2 { margin: 0 0 10px; font-size: 19px; }
</style>
