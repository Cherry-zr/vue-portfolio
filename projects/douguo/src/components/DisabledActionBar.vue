<script setup lang="ts">
import { showToast } from 'vant'

const actions = [
  { label: '点赞', icon: 'like-o' },
  { label: '评论', icon: 'comment-o' },
  { label: '收藏', icon: 'star-o' },
]

const explainDisabled = (label: string) => {
  showToast(`${label}需要登录及写入接口，当前仅支持浏览`)
}
</script>

<template>
  <aside class="disabled-action-bar" aria-label="只读操作说明">
    <button v-for="action in actions" :key="action.label" type="button" @click="explainDisabled(action.label)">
      <van-icon :name="action.icon" />
      <span>{{ action.label }}</span>
    </button>
  </aside>
</template>

<style scoped>
.disabled-action-bar {
  position: sticky;
  bottom: 0;
  z-index: 30;
  min-height: 58px;
  padding: 6px 20px calc(6px + env(safe-area-inset-bottom));
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid #eeeeee;
  background: rgba(255, 255, 255, 0.97);
  backdrop-filter: blur(12px);
}

.disabled-action-bar button {
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  color: #777777;
  background: transparent;
  font-size: 13px;
}

.disabled-action-bar :deep(.van-icon) { color: #333333; font-size: 22px; }
</style>
