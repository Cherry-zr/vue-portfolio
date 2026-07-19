<script setup lang="ts">
import { useRouter } from 'vue-router'
import PendingState from '../components/PendingState.vue'

const router = useRouter()
</script>

<template>
  <section class="login-page">
    <header>
      <button type="button" aria-label="返回" @click="router.back()"><van-icon name="arrow-left" /></button>
      <strong>登录</strong>
      <span />
    </header>
    <PendingState
      title="暂不支持登录"
      description="当前豆果公开接口没有提供可用的登录能力，因此不会模拟登录成功或生成虚假 Token。"
      icon="contact"
    />
  </section>
</template>

<style scoped>
.login-page { min-height: 100vh; background: #ffffff; }
header {
  height: 58px; padding: max(5px, env(safe-area-inset-top)) 14px 0; display: grid;
  grid-template-columns: 44px 1fr 44px; align-items: center; border-bottom: 1px solid #f2f2f2;
}
header button { width: 40px; height: 40px; border: 0; background: transparent; font-size: 22px; }
header strong { text-align: center; font-size: 17px; }
</style>
