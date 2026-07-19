<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const activePath = computed(() => {
  if (route.path.startsWith('/categories')) return '/categories'
  if (route.path.startsWith('/topics')) return '/topics'
  if (route.path.startsWith('/mine')) return '/mine'
  return '/home'
})

const navigate = (path: string) => {
  if (path === activePath.value) return
  void router.push(path)
}

const openPublish = () => {
  void router.push({ path: '/pending', query: { title: '发布内容', reason: '当前接口不支持内容发布' } })
}
</script>

<template>
  <nav class="app-tabbar" aria-label="主导航">
    <button
      type="button"
      class="tabbar-item"
      :class="{ 'tabbar-item--active': activePath === '/home' }"
      @click="navigate('/home')"
    >
      首页
    </button>
    <button
      type="button"
      class="tabbar-item tabbar-item--wide"
      :class="{ 'tabbar-item--active': activePath === '/categories' }"
      @click="navigate('/categories')"
    >
      分类
    </button>
    <button class="tabbar-plus" type="button" aria-label="发布内容" @click="openPublish">
      <span>+</span>
    </button>
    <button
      type="button"
      class="tabbar-item tabbar-item--wide"
      :class="{ 'tabbar-item--active': activePath === '/topics' }"
      @click="navigate('/topics')"
    >
      话题
    </button>
    <button
      type="button"
      class="tabbar-item"
      :class="{ 'tabbar-item--active': activePath === '/mine' }"
      @click="navigate('/mine')"
    >
      用户
    </button>
  </nav>
</template>

<style scoped>
.app-tabbar {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1200;
  width: 100%;
  max-width: 430px;
  min-height: 64px;
  margin: 0 auto;
  padding: 7px 8px calc(7px + env(safe-area-inset-bottom));
  display: grid;
  grid-template-columns: 1fr 1.35fr 64px 1.25fr 1fr;
  align-items: end;
  border-top: 1px solid #eeeeee;
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 -5px 18px rgba(35, 35, 35, 0.025);
  backdrop-filter: blur(12px);
}

.tabbar-item,
.tabbar-plus {
  border: 0;
  padding: 0;
  background: transparent;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.tabbar-item {
  height: 46px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #9b9b9b;
  font-size: clamp(15px, 4.2vw, 18px);
  line-height: 1;
  white-space: nowrap;
}

.tabbar-item--active {
  color: #191919;
  font-weight: 600;
}

.tabbar-plus {
  width: 54px;
  height: 54px;
  margin: -8px auto 0;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  background: linear-gradient(145deg, #ff9b43 0%, #ff7f3f 40%, #ff414d 100%);
  box-shadow: 0 5px 14px rgba(255, 78, 72, 0.22);
}

.tabbar-plus span {
  display: block;
  margin-top: -4px;
  font-size: 47px;
  font-weight: 300;
  line-height: 1;
}

@media (max-width: 360px) {
  .app-tabbar {
    grid-template-columns: 0.9fr 1.25fr 58px 1.15fr 0.9fr;
    padding-right: 4px;
    padding-left: 4px;
  }

  .tabbar-item {
    font-size: 14px;
  }

  .tabbar-plus {
    width: 50px;
    height: 50px;
  }
}
</style>
