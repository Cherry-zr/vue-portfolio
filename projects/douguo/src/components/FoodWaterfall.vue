<script setup lang="ts">
import { ref } from 'vue'
import type { ContentCardViewModel } from '../types/content'

const props = defineProps<{
  items: ContentCardViewModel[]
}>()

const emit = defineEmits<{
  open: [item: ContentCardViewModel]
  openAuthor: [id: string]
}>()

const failedImages = ref(new Set<string>())
const failedAvatars = ref(new Set<string>())

const markFailed = (target: 'image' | 'avatar', key: string) => {
  const source = target === 'image' ? failedImages : failedAvatars
  source.value = new Set(source.value).add(key)
}
</script>

<template>
  <section class="food-grid" aria-label="推荐内容">
    <article
      v-for="item in props.items"
      :key="item.id"
      class="food-card"
      role="button"
      tabindex="0"
      @click="emit('open', item)"
      @keydown.enter="emit('open', item)"
    >
      <div class="food-card__media" :style="{ aspectRatio: item.imageRatio }">
        <img
          v-if="item.imageUrl && !failedImages.has(item.key)"
          :src="item.imageUrl"
          :alt="item.title"
          @error="markFailed('image', item.key)"
        />
        <span v-else class="food-card__placeholder"><van-icon name="photo-fail" /></span>
        <span v-if="item.media" class="media-badge">
          <van-icon :name="item.media === 'video' ? 'play' : 'photo-o'" />
        </span>
      </div>
      <h3>{{ item.title }}</h3>
      <p v-if="item.description" class="food-card__description">{{ item.description }}</p>
      <div class="food-card__meta">
        <button
          type="button"
          class="author"
          :disabled="!item.authorId"
          :aria-label="item.authorId ? `查看 ${item.authorName || '豆果用户'} 的主页` : item.authorName || '豆果用户'"
          @click.stop="item.authorId && emit('openAuthor', item.authorId)"
        >
          <i>
            <img
              v-if="item.avatarUrl && !failedAvatars.has(item.key)"
              :src="item.avatarUrl"
              alt=""
              @error="markFailed('avatar', item.key)"
            />
            <van-icon v-else name="contact" />
          </i>
          <em>{{ item.authorName || '豆果用户' }}</em>
        </button>
        <span v-if="item.metricText" class="likes">
          <van-icon name="like-o" />
          {{ item.metricText }}
        </span>
      </div>
    </article>
  </section>
</template>

<style scoped>
.food-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: start;
  gap: 19px 10px;
}

.food-card {
  min-width: 0;
  color: #222222;
  outline: none;
  cursor: pointer;
}

.food-card__media {
  position: relative;
  overflow: hidden;
  border-radius: 11px;
  background: #f4f4f4;
}

.food-card__media img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.food-card__placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b7b7b7;
  background: #eeeeee;
  font-size: 28px;
}

.media-badge {
  position: absolute;
  top: 9px;
  right: 9px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  background: rgba(69, 75, 85, 0.6);
  font-size: 16px;
}

.food-card h3 {
  margin: 8px 7px 0;
  display: -webkit-box;
  overflow: hidden;
  color: #222222;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.38;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.food-card__description {
  margin: 9px 7px 0;
  display: -webkit-box;
  overflow: hidden;
  color: #6a9d96;
  font-size: 13px;
  line-height: 1.45;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.food-card__meta {
  margin: 10px 7px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  color: #999999;
  font-size: 12px;
}

.author {
  min-width: 0;
  border: 0;
  padding: 0;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: inherit;
  background: transparent;
}

.author i {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 22px;
  overflow: hidden;
  background: #f0ece8;
  font-size: 13px;
  font-style: normal;
}

.author i img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.author em {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-style: normal;
}

.likes {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  flex: 0 0 auto;
  font-size: 12px;
}

.likes :deep(.van-icon) {
  font-size: 18px;
}
</style>
