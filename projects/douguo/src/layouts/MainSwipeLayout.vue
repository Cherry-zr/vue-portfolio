<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppTabbar from '../components/AppTabbar.vue'
import { isMainSwipeBlocked } from '../composables/mainSwipeState'
import { useMainTabSwipe } from '../composables/useMainTabSwipe'
import Categories from '../views/Categories.vue'
import Home from '../views/Home.vue'
import Mine from '../views/Mine.vue'
import Topics from '../views/Topics.vue'

const mainTabs = ['/home', '/categories', '/topics', '/mine'] as const
const route = useRoute()
const router = useRouter()

const getMainTabIndex = (path: string) => {
  if (path === '/categories') return 1
  if (path === '/topics') return 2
  if (path === '/mine') return 3
  if (path === '/home') return 0
  return -1
}

const activeIndex = ref(Math.max(0, getMainTabIndex(route.path)))

const commitRoute = (index: number) => {
  const path = mainTabs[index]
  if (!path || getMainTabIndex(route.path) === index) return
  void router.push(path)
}

const {
  viewport,
  trackStyle,
  isDragging,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
  onClickCapture,
  syncToIndex,
} = useMainTabSwipe({
  activeIndex,
  tabCount: mainTabs.length,
  blocked: isMainSwipeBlocked,
  onCommit: commitRoute,
})

const setViewport = (element: unknown) => {
  viewport.value = element instanceof HTMLElement ? element : null
}

watch(
  () => route.path,
  (path, previousPath) => {
    const nextIndex = getMainTabIndex(path)
    if (nextIndex < 0 || nextIndex === activeIndex.value) return

    syncToIndex(nextIndex, getMainTabIndex(previousPath) >= 0)
  },
)
</script>

<template>
  <section class="main-swipe-layout">
    <div
      :ref="setViewport"
      class="main-swipe-viewport"
      :class="{ 'main-swipe-viewport--dragging': isDragging }"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerCancel"
      @click.capture="onClickCapture"
    >
      <div class="main-swipe-track" :style="trackStyle">
        <div class="main-swipe-slide"><div class="main-swipe-slide__scroll"><Home /></div></div>
        <div class="main-swipe-slide"><div class="main-swipe-slide__scroll"><Categories embedded /></div></div>
        <div class="main-swipe-slide"><div class="main-swipe-slide__scroll"><Topics embedded /></div></div>
        <div class="main-swipe-slide"><div class="main-swipe-slide__scroll"><Mine /></div></div>
      </div>
    </div>
    <AppTabbar />
  </section>
</template>

<style scoped>
.main-swipe-layout {
  height: 100vh;
  height: 100dvh;
  overflow: hidden;
  background: #ffffff;
}

.main-swipe-viewport {
  height: calc(100% - 68px - env(safe-area-inset-bottom));
  overflow: hidden;
  cursor: grab;
  touch-action: pan-y;
}

.main-swipe-viewport--dragging {
  cursor: grabbing;
  user-select: none;
  -webkit-user-select: none;
}

.main-swipe-track {
  width: 100%;
  height: 100%;
  display: flex;
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1);
  will-change: transform;
}

.main-swipe-slide {
  width: 100%;
  min-width: 0;
  height: 100%;
  flex: 0 0 100%;
  overflow: hidden;
}

.main-swipe-slide__scroll {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior-y: contain;
  -webkit-overflow-scrolling: touch;
}

@media (prefers-reduced-motion: reduce) {
  .main-swipe-track {
    transition-duration: 80ms !important;
  }
}
</style>
