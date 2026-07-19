<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import PendingState from '../components/PendingState.vue'
import SideDrawer from '../components/SideDrawer.vue'

const router = useRouter()
const drawerVisible = ref(false)
const userId = ref('')

const handleDrawerSelect = (title: string) => {
  drawerVisible.value = false
  if (title === '菜谱分类') {
    void router.push('/categories')
    return
  }
  if (title === '热门话题') {
    void router.push('/topics')
    return
  }
  void router.push({
    path: '/pending',
    query: { title, reason: '当前豆果公开接口暂不支持该功能' },
  })
}

const openPublicUser = () => {
  const id = userId.value.trim()
  if (!/^\d+$/.test(id)) return
  void router.push(`/user/${id}`)
}
</script>

<template>
  <section class="mine-page">
    <header class="mine-tools">
      <button type="button" aria-label="打开侧边栏" @click="drawerVisible = true"><van-icon name="wap-nav" /></button>
      <span>公开用户</span>
      <span />
    </header>

    <div class="anonymous-card">
      <span class="anonymous-avatar"><van-icon name="contact" /></span>
      <div><h1>查看公开主页</h1><p>输入豆果用户 ID，读取公开作品、笔记和收藏。</p></div>
    </div>

    <form class="user-lookup" @submit.prevent="openPublicUser">
      <van-field v-model="userId" inputmode="numeric" placeholder="例如：16753515" clearable />
      <button type="submit" :disabled="!/^\d+$/.test(userId.trim())">查看</button>
    </form>

    <PendingState
      compact
      title="未接入登录"
      description="登录和注册不在复刻范围内；本页面只浏览指定用户 ID 的公开内容。"
      icon="contact"
    />

    <SideDrawer :visible="drawerVisible" @close="drawerVisible = false" @select="handleDrawerSelect" />
  </section>
</template>

<style scoped>
.mine-page { min-height: 100vh; padding: max(12px, env(safe-area-inset-top)) 20px 34px; color: #202020; background: #ffffff; }
.mine-tools { height: 57px; display: grid; grid-template-columns: 42px 1fr 42px; align-items: center; text-align: center; font-size: 18px; font-weight: 700; }
.mine-tools button { width: 38px; height: 40px; border: 0; padding: 0; display: flex; align-items: center; justify-content: center; background: transparent; font-size: 27px; }
.anonymous-card { margin-top: 20px; padding: 22px 18px; border-radius: 16px; display: grid; grid-template-columns: 58px 1fr; align-items: center; gap: 13px; background: #f7f7f7; }
.anonymous-avatar { width: 58px; height: 58px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #aaa; background: #e8e8e8; font-size: 31px; }
.anonymous-card h1 { margin: 0; font-size: 20px; }
.anonymous-card p { margin: 7px 0 0; color: #888; font-size: 13px; line-height: 1.5; }
.user-lookup { margin-top: 14px; display: grid; grid-template-columns: 1fr 72px; gap: 10px; }
.user-lookup :deep(.van-field) { border-radius: 12px; background: #f7f7f7; }
.user-lookup button { border: 0; border-radius: 12px; color: #fff; background: #ff4d58; }
.user-lookup button:disabled { background: #d8d8d8; }
@media (max-width: 370px) { .mine-page { padding-right: 14px; padding-left: 14px; } .anonymous-card { padding-right: 12px; padding-left: 12px; } }
</style>
