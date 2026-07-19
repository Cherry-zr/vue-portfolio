<script setup lang="ts">
import { onUnmounted, watch } from 'vue'
import { releaseMainSwipeBlocker, setMainSwipeBlocked } from '../composables/mainSwipeState'

const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{
  close: []
  select: [title: string]
}>()

const swipeBlockerId = Symbol('side-drawer')

const drawerItems = [
  { title: '菜谱分类', icon: 'apps-o', groupAfter: false },
  { title: '热门话题', icon: 'fire-o', groupAfter: false },
  { title: '最近浏览', icon: 'clock-o', groupAfter: false },
  { title: '发布内容', icon: 'plus', groupAfter: true },
  { title: '用户协议', icon: 'description', groupAfter: false },
  { title: '隐私协议', icon: 'shield-o', groupAfter: false },
]

watch(
  () => props.visible,
  (visible) => {
    document.body.style.overflow = visible ? 'hidden' : ''
    setMainSwipeBlocked(swipeBlockerId, visible)
  },
  { immediate: true },
)

onUnmounted(() => {
  document.body.style.overflow = ''
  releaseMainSwipeBlocker(swipeBlockerId)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="drawer">
      <div v-if="visible" class="drawer-shell" data-swipe-exclude>
        <button class="drawer-mask" type="button" aria-label="关闭侧边菜单" @click="emit('close')" />
        <aside class="side-drawer" aria-label="侧边菜单">
          <nav class="drawer-menu">
            <button
              v-for="item in drawerItems"
              :key="item.title"
              type="button"
              class="drawer-item"
              :class="{ 'drawer-item--group-end': item.groupAfter }"
              @click="emit('select', item.title)"
            >
              <van-icon :name="item.icon" class="drawer-item__icon" />
              <span>{{ item.title }}</span>
            </button>
          </nav>
        </aside>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.drawer-shell {
  position: fixed;
  inset: 0;
  z-index: 3000;
  width: 100%;
  max-width: 430px;
  margin: 0 auto;
  overflow: hidden;
}

.drawer-mask {
  position: absolute;
  inset: 0;
  border: 0;
  padding: 0;
  background: rgba(0, 0, 0, 0.55);
}

.side-drawer {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 76%;
  max-width: 326px;
  overflow-y: auto;
  background: #ffffff;
  overscroll-behavior: contain;
}

.drawer-menu {
  min-height: 100%;
  padding: max(102px, env(safe-area-inset-top)) 0 max(28px, env(safe-area-inset-bottom));
}

.drawer-item {
  width: 100%;
  min-height: 56px;
  border: 0;
  padding: 0 24px 0 48px;
  display: flex;
  align-items: center;
  gap: 24px;
  color: #252525;
  background: transparent;
  text-align: left;
  font-size: 18px;
  font-weight: 500;
}

.drawer-item--group-end {
  margin-bottom: 74px;
}

.drawer-item:active {
  background: #f7f7f7;
}

.drawer-item__icon {
  width: 27px;
  flex: 0 0 27px;
  font-size: 27px;
}

.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.22s ease;
}

.drawer-enter-active .side-drawer,
.drawer-leave-active .side-drawer {
  transition: transform 0.24s ease;
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}

.drawer-enter-from .side-drawer,
.drawer-leave-to .side-drawer {
  transform: translateX(-100%);
}
</style>
