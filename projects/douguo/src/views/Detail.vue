<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getNoteDetail, getRecipeDetail } from '../api/recipe'
import { getErrorMessage, isRequestCanceled } from '../api/request'
import DisabledActionBar from '../components/DisabledActionBar.vue'
import PageHeader from '../components/PageHeader.vue'
import PendingState from '../components/PendingState.vue'
import type { DetailViewModel } from '../types/content'

const route = useRoute()
const router = useRouter()
const loading = ref(false)
const error = ref('')
const detail = ref<DetailViewModel | null>(null)
const failedImages = ref(new Set<string>())
let controller: AbortController | undefined

const loadDetail = async () => {
  controller?.abort()
  detail.value = null
  error.value = ''
  failedImages.value = new Set()

  const id = typeof route.params.id === 'string' ? route.params.id.trim() : ''
  const type = typeof route.query.type === 'string' ? route.query.type : 'recipe'
  if (!id) {
    error.value = '详情地址缺少内容 ID'
    return
  }
  if (type !== 'recipe' && type !== 'note') {
    error.value = '详情地址中的内容类型无效'
    return
  }

  controller = new AbortController()
  loading.value = true
  try {
    detail.value = type === 'note'
      ? await getNoteDetail(id, controller.signal)
      : await getRecipeDetail(id, controller.signal)
  } catch (requestError) {
    if (!isRequestCanceled(requestError)) error.value = getErrorMessage(requestError)
  } finally {
    loading.value = false
  }
}

const markImageFailed = (key: string) => {
  failedImages.value = new Set(failedImages.value).add(key)
}

const openAuthor = () => {
  if (detail.value?.authorId) void router.push(`/user/${detail.value.authorId}`)
}

const openMaterial = (name: string) => {
  if (detail.value?.type === 'recipe') {
    void router.push(`/recipe/${detail.value.id}/material/${encodeURIComponent(name)}`)
  }
}

watch(() => route.fullPath, () => void loadDetail(), { immediate: true })
onBeforeUnmount(() => controller?.abort())
</script>

<template>
  <section class="detail-page">
    <PageHeader :title="detail?.type === 'note' ? '笔记详情' : '菜谱详情'" />

    <main class="detail-main">
      <div v-if="loading" class="detail-loading">
        <van-skeleton image title avatar :row="8" />
      </div>

      <PendingState
        v-else-if="error"
        title="详情加载失败"
        :description="error"
        icon="warning-o"
        action-label="重新加载"
        @action="loadDetail"
      />

      <van-empty v-else-if="!detail" description="服务器未返回详情内容" />

      <article v-else-if="detail.type === 'note'" class="detail-content note-detail">
        <button class="detail-author" :disabled="!detail.authorId" type="button" @click="openAuthor">
          <img
            v-if="detail.avatarUrl && !failedImages.has('avatar')"
            :src="detail.avatarUrl"
            alt=""
            @error="markImageFailed('avatar')"
          />
          <span v-else class="avatar-placeholder"><van-icon name="contact" /></span>
          <span class="author-copy">
            <strong>{{ detail.authorName || '豆果用户' }}</strong>
            <small>{{ detail.publishedAt || '美食笔记' }}</small>
          </span>
          <van-icon v-if="detail.authorId" name="arrow" />
        </button>
        <h1>{{ detail.title }}</h1>
        <p v-if="detail.content" class="note-copy">{{ detail.content }}</p>
        <div class="note-images">
          <template v-for="(image, index) in detail.images" :key="image">
            <img
              v-if="!failedImages.has(`note-${index}`)"
              :src="image"
              :alt="`${detail.title} 图片 ${index + 1}`"
              @error="markImageFailed(`note-${index}`)"
            />
            <span v-else class="detail-image-placeholder"><van-icon name="photo-fail" /></span>
          </template>
        </div>
        <div class="detail-stats">
          <span v-if="detail.likeText"><van-icon name="like-o" /> {{ detail.likeText }}</span>
          <span v-if="detail.favoriteText"><van-icon name="star-o" /> {{ detail.favoriteText }}</span>
        </div>
        <nav class="detail-links" aria-label="笔记相关内容">
          <button type="button" @click="router.push(`/note/${detail.id}/related`)">
            <span><van-icon name="notes-o" /><strong>相关笔记</strong></span>
            <van-icon name="arrow" />
          </button>
        </nav>
      </article>

      <article v-else class="detail-content recipe-detail">
        <template v-if="detail.imageUrl">
          <img
            v-if="!failedImages.has('recipe-cover')"
            class="recipe-cover"
            :src="detail.imageUrl"
            :alt="detail.title"
            @error="markImageFailed('recipe-cover')"
          />
          <span v-else class="detail-image-placeholder"><van-icon name="photo-fail" /></span>
        </template>
        <h1>{{ detail.title }}</h1>
        <button v-if="detail.authorName" class="detail-author" :disabled="!detail.authorId" type="button" @click="openAuthor">
          <img
            v-if="detail.avatarUrl && !failedImages.has('recipe-avatar')"
            :src="detail.avatarUrl"
            alt=""
            @error="markImageFailed('recipe-avatar')"
          />
          <span v-else class="avatar-placeholder"><van-icon name="contact" /></span>
          <span class="author-copy"><strong>{{ detail.authorName }}</strong><small>菜谱作者</small></span>
          <van-icon v-if="detail.authorId" name="arrow" />
        </button>
        <p v-if="detail.description" class="recipe-description">{{ detail.description }}</p>
        <section v-if="detail.ingredients.length" class="detail-section">
          <div class="section-title">
            <h2>食材</h2>
            <small>点击食材查看接口详情</small>
          </div>
          <button
            v-for="ingredient in detail.ingredients"
            :key="`${ingredient.name}-${ingredient.amount}`"
            class="ingredient-row"
            type="button"
            @click="openMaterial(ingredient.name)"
          >
            <span>{{ ingredient.name }}</span><em>{{ ingredient.amount || '适量' }}</em>
          </button>
        </section>
        <section v-if="detail.steps.length" class="detail-section">
          <h2>制作步骤</h2>
          <div v-for="step in detail.steps" :key="step.key" class="recipe-step">
            <strong>{{ step.number }}</strong><p>{{ step.description }}</p>
            <img
              v-if="step.imageUrl && !failedImages.has(step.key)"
              :src="step.imageUrl"
              :alt="`步骤 ${step.number}`"
              @error="markImageFailed(step.key)"
            />
          </div>
        </section>
        <nav class="detail-links" aria-label="菜谱相关内容">
          <button type="button" @click="router.push(`/recipe/${detail.id}/related`)">
            <span><van-icon name="cluster-o" /><strong>相关内容</strong></span><van-icon name="arrow" />
          </button>
          <button type="button" @click="router.push(`/recipe/${detail.id}/comments`)">
            <span><van-icon name="comment-o" /><strong>全部评论</strong></span><van-icon name="arrow" />
          </button>
          <button type="button" @click="router.push(`/recipe/${detail.id}/learned`)">
            <span><van-icon name="photograph" /><strong>大家学做</strong></span><van-icon name="arrow" />
          </button>
          <button type="button" @click="router.push(`/recipe/${detail.id}/nutrient`)">
            <span><van-icon name="chart-trending-o" /><strong>营养分析</strong></span><van-icon name="arrow" />
          </button>
        </nav>
      </article>
    </main>

    <DisabledActionBar v-if="detail" />
  </section>
</template>

<style scoped>
.detail-page { min-height: 100vh; background: #ffffff; }
.detail-main { min-height: calc(100vh - 56px); }
.detail-loading { padding: 24px 18px; }
.detail-content { padding: 18px 18px 34px; }
.detail-content h1 { margin: 18px 0; color: #222; font-size: 25px; line-height: 1.4; }
.detail-author { width: 100%; border: 0; padding: 0; display: grid; grid-template-columns: 42px 1fr 20px; align-items: center; gap: 10px; text-align: left; color: #333; background: transparent; }
.detail-author:disabled { opacity: 1; }
.detail-author > img,
.avatar-placeholder { width: 42px; height: 42px; border-radius: 50%; flex: 0 0 42px; }
.detail-author > img { object-fit: cover; }
.avatar-placeholder { display: flex; align-items: center; justify-content: center; color: #999; background: #eee; font-size: 22px; }
.author-copy { min-width: 0; display: flex; flex-direction: column; gap: 4px; }
.author-copy strong { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.author-copy small { color: #999; }
.detail-author > :deep(.van-icon) { color: #bbb; }
.note-copy,
.recipe-description { margin: 0 0 22px; color: #555; white-space: pre-wrap; font-size: 15px; line-height: 1.85; }
.note-images { display: flex; flex-direction: column; gap: 12px; }
.note-images img,
.recipe-cover { width: 100%; border-radius: 12px; display: block; object-fit: cover; }
.detail-image-placeholder { width: 100%; min-height: 220px; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #aaa; background: #eee; font-size: 32px; }
.detail-stats { margin-top: 20px; display: flex; gap: 22px; color: #777; }
.detail-section { margin-top: 30px; }
.detail-section h2 { margin: 0 0 16px; font-size: 21px; }
.section-title { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; }
.section-title small { color: #aaa; font-size: 11px; }
.ingredient-row { width: 100%; min-height: 48px; border: 0; border-bottom: 1px solid #f1f1f1; padding: 0; display: flex; justify-content: space-between; align-items: center; text-align: left; background: transparent; }
.ingredient-row span { color: #333; }
.ingredient-row em { color: #888; font-style: normal; }
.recipe-step { margin-top: 20px; display: grid; grid-template-columns: 30px 1fr; gap: 8px; }
.recipe-step > strong { width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; background: #ff4d58; }
.recipe-step p { margin: 1px 0 0; line-height: 1.75; }
.recipe-step img { grid-column: 2; width: 100%; margin-top: 8px; border-radius: 10px; }
.detail-links { margin-top: 30px; border-radius: 14px; padding: 0 14px; background: #f8f8f8; }
.detail-links button { width: 100%; min-height: 54px; border: 0; display: flex; align-items: center; justify-content: space-between; color: #444; background: transparent; }
.detail-links button + button { border-top: 1px solid #ebebeb; }
.detail-links button > span { display: flex; align-items: center; gap: 10px; }
.detail-links button > span :deep(.van-icon) { color: #ff4d58; font-size: 20px; }
.detail-links button > :deep(.van-icon) { color: #bbb; }
</style>
