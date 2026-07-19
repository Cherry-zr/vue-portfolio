<script setup lang="ts">
import { ref } from 'vue'
import PendingState from '../components/PendingState.vue'

const tabs = ['分组', '菜谱', '笔记', '课程']
const activeTab = ref('分组')
</script>

<template>
  <section class="favorites-page">
    <nav class="favorites-tabs" aria-label="收藏夹分类">
      <button
        v-for="tab in tabs"
        :key="tab"
        type="button"
        :class="{ active: activeTab === tab }"
        @click="activeTab = tab"
      >
        {{ tab }}
      </button>
    </nav>

    <PendingState
      :title="`${activeTab}暂不可用`"
      description="收藏接口需要真实用户身份，但当前项目没有服务端登录能力，因此不会展示或创建虚假收藏。"
      icon="star-o"
    />
  </section>
</template>

<style scoped>
.favorites-page { min-height: 100vh; padding-top: max(28px, env(safe-area-inset-top)); background: #ffffff; }
.favorites-tabs { height: 58px; padding: 0 42px; display: grid; grid-template-columns: repeat(4, 1fr); }
.favorites-tabs button { position: relative; border: 0; padding: 0; color: #999; background: transparent; font-size: 17px; }
.favorites-tabs button.active { color: #171717; font-weight: 700; }
.favorites-tabs button.active::after {
  content: ''; position: absolute; right: 27%; bottom: 3px; left: 27%; height: 4px;
  border-radius: 4px; background: #ff4d58;
}
@media (max-width: 370px) { .favorites-tabs { padding: 0 28px; } }
</style>
