<script setup lang="ts">
import { useRouter } from 'vue-router'

withDefaults(
  defineProps<{
    title: string
    showBack?: boolean
  }>(),
  { showBack: true },
)

const router = useRouter()
</script>

<template>
  <header class="page-header">
    <button v-if="showBack" type="button" aria-label="返回" @click="router.back()">
      <van-icon name="arrow-left" />
    </button>
    <span v-else />
    <strong>{{ title }}</strong>
    <slot name="right"><span /></slot>
  </header>
</template>

<style scoped>
.page-header {
  position: sticky;
  top: 0;
  z-index: 80;
  min-height: 56px;
  padding: max(5px, env(safe-area-inset-top)) 12px 0;
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr) 44px;
  align-items: center;
  border-bottom: 1px solid #f1f1f1;
  background: rgba(255, 255, 255, 0.97);
  backdrop-filter: blur(12px);
}

.page-header button {
  width: 40px;
  height: 40px;
  border: 0;
  padding: 0;
  color: #202020;
  background: transparent;
  font-size: 22px;
}

.page-header strong {
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 17px;
}
</style>
