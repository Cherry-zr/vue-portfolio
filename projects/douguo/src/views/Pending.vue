<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PendingState from '../components/PendingState.vue'

const route = useRoute()
const router = useRouter()
const title = computed(() => (typeof route.query.title === 'string' ? route.query.title : '内容待补充'))
const reason = computed(() =>
  typeof route.query.reason === 'string'
    ? route.query.reason
    : '当前豆果公开接口暂不支持该功能，本页面不会使用本地数据模拟业务结果。',
)
</script>

<template>
  <section class="pending-page">
    <header class="pending-header">
      <button type="button" aria-label="返回" @click="router.back()"><van-icon name="arrow-left" /></button>
      <strong>{{ title }}</strong>
      <span />
    </header>
    <PendingState :title="title" :description="reason" icon="warning-o" />
  </section>
</template>

<style scoped>
.pending-page {
  min-height: 100vh;
  background: #ffffff;
}

.pending-header {
  position: sticky;
  top: 0;
  z-index: 10;
  height: 56px;
  padding: max(5px, env(safe-area-inset-top)) 14px 0;
  display: grid;
  grid-template-columns: 44px 1fr 44px;
  align-items: center;
  border-bottom: 1px solid #f3f3f3;
  background: #ffffff;
}

.pending-header button {
  width: 40px;
  height: 40px;
  border: 0;
  padding: 0;
  color: #222222;
  background: transparent;
  font-size: 22px;
}

.pending-header strong {
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 17px;
}
</style>
