<script setup lang="ts">
import PendingState from '../components/PendingState.vue'
</script>

<template>
  <section class="nutrition-page">
    <div class="nutrition-hero">
      <span><van-icon name="smile-o" /></span>
      <h1>AI 营养师</h1>
      <p>健康管理界面已保留，但当前没有可用的 AI 或个人健康数据接口。</p>
    </div>
    <PendingState
      compact
      title="AI 服务暂不可用"
      description="为避免展示虚假的健康档案、完成度或 AI 回答，本页面只保留功能说明。"
      icon="warning-o"
    />
  </section>
</template>

<style scoped>
.nutrition-page { min-height: 100vh; padding: max(34px, env(safe-area-inset-top)) 20px 30px; color: #242424; background: #f7f7f9; }
.nutrition-hero { padding: 38px 24px; border-radius: 18px; background: #ffffff; text-align: center; }
.nutrition-hero > span {
  width: 82px; height: 82px; margin: 0 auto; border-radius: 50%; display: flex;
  align-items: center; justify-content: center; color: #6ec69b; background: #e8f8f0; font-size: 42px;
}
.nutrition-hero h1 { margin: 22px 0 10px; font-size: 27px; }
.nutrition-hero p { margin: 0; color: #777; font-size: 15px; line-height: 1.7; }
</style>
