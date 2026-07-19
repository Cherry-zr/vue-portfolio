<script setup lang="ts">
import { ref } from 'vue'
import type { BannerViewModel } from '../types/content'

defineProps<{
  banners: BannerViewModel[]
}>()

const failedImages = ref(new Set<string>())

const markImageFailed = (key: string) => {
  failedImages.value = new Set(failedImages.value).add(key)
}
</script>

<template>
  <section class="home-carousel" aria-label="首页轮播图" data-swipe-exclude>
    <van-swipe :autoplay="3500" lazy-render :show-indicators="true">
      <van-swipe-item v-for="banner in banners" :key="banner.key">
        <a
          v-if="banner.targetUrl"
          :href="banner.targetUrl"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="banner.title"
        >
          <img
            v-if="!failedImages.has(banner.key)"
            :src="banner.imageUrl"
            :alt="banner.title"
            @error="markImageFailed(banner.key)"
          />
          <span v-else class="image-placeholder"><van-icon name="photo-fail" /></span>
        </a>
        <template v-else>
          <img
            v-if="!failedImages.has(banner.key)"
            :src="banner.imageUrl"
            :alt="banner.title"
            @error="markImageFailed(banner.key)"
          />
          <span v-else class="image-placeholder"><van-icon name="photo-fail" /></span>
        </template>
      </van-swipe-item>
    </van-swipe>
  </section>
</template>

<style scoped>
.home-carousel {
  overflow: hidden;
  border-radius: 13px;
  background: #f3f3f3;
}

.home-carousel :deep(.van-swipe) {
  aspect-ratio: 1024 / 300;
}

.home-carousel img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.home-carousel a,
.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
}

.image-placeholder {
  align-items: center;
  justify-content: center;
  color: #b6b6b6;
  background: #eeeeee;
  font-size: 30px;
}

.home-carousel :deep(.van-swipe__indicator) {
  width: 17px;
  height: 3px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.7);
  opacity: 0.75;
}

.home-carousel :deep(.van-swipe__indicator--active) {
  width: 30px;
  background: #ffffff;
  opacity: 1;
}
</style>
