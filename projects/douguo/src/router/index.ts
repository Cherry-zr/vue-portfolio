import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  type RouteRecordRaw,
} from 'vue-router'
import Categories from '../views/Categories.vue'
import Dietail from '../views/Dietail.vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Mine from '../views/Mine.vue'
import Search from '../views/Search.vue'
import Topics from '../views/Topics.vue'

const unsupportedRedirect = (title: string, reason: string) => ({
  path: '/pending',
  query: { title, reason },
})

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: { title: '首页', tabbar: true },
  },
  {
    path: '/categories',
    name: 'categories',
    component: Categories,
    meta: { title: '菜谱分类', tabbar: true },
  },
  {
    path: '/topics',
    name: 'topics',
    component: Topics,
    meta: { title: '热门话题', tabbar: true },
  },
  {
    path: '/mine',
    name: 'mine',
    component: Mine,
    meta: { title: '用户查询', tabbar: true },
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: () => import('../views/Detail.vue'),
    meta: { title: '内容详情' },
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
    meta: { title: '菜谱搜索' },
  },
  {
    path: '/topic/:id',
    name: 'topic-detail',
    component: () => import('../views/TopicDetail.vue'),
    meta: { title: '话题详情' },
  },
  {
    path: '/note/:id/related',
    name: 'note-related',
    component: () => import('../views/ContentListPage.vue'),
    props: { kind: 'note-related' },
    meta: { title: '相关笔记' },
  },
  {
    path: '/recipe/:id/related',
    name: 'recipe-related',
    component: () => import('../views/RecipeRelated.vue'),
    meta: { title: '相关内容' },
  },
  {
    path: '/recipe/:id/comments',
    name: 'recipe-comments',
    component: () => import('../views/RecipeComments.vue'),
    meta: { title: '菜谱评论' },
  },
  {
    path: '/recipe/:id/learned',
    name: 'recipe-learned',
    component: () => import('../views/ContentListPage.vue'),
    props: { kind: 'learned' },
    meta: { title: '大家学做' },
  },
  {
    path: '/recipe/:id/material/:name',
    name: 'recipe-material',
    component: () => import('../views/DataCapability.vue'),
    props: { kind: 'material' },
    meta: { title: '食材详情' },
  },
  {
    path: '/recipe/:id/nutrient',
    name: 'recipe-nutrient',
    component: () => import('../views/DataCapability.vue'),
    props: { kind: 'nutrient' },
    meta: { title: '营养分析' },
  },
  {
    path: '/user/:id',
    name: 'user-profile',
    component: () => import('../views/UserProfile.vue'),
    meta: { title: '公开用户主页' },
  },
  {
    path: '/user/:id/calendar',
    name: 'user-calendar',
    component: () => import('../views/UserCalendar.vue'),
    meta: { title: '用户日历' },
  },
  {
    path: '/pending',
    name: 'pending',
    component: () => import('../views/Pending.vue'),
    meta: { title: '功能说明' },
  },
  {
    path: '/nutrition',
    name: 'nutrition',
    component: Dietail,
    meta: { title: 'AI 营养师' },
  },
  {
    path: '/dietail',
    redirect: '/nutrition',
  },
  {
    path: '/favorites',
    redirect: unsupportedRedirect('个人收藏入口已调整', '公开接口需要指定用户 ID，请从用户查询页进入公开收藏列表。'),
  },
  {
    path: '/classify',
    redirect: '/categories',
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { title: '登录' },
  },
  { path: '/:pathMatch(.*)*', redirect: '/home' },
]

const router = createRouter({
  history: import.meta.env.PROD
    ? createWebHashHistory(import.meta.env.BASE_URL)
    : createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    if (to.meta.tabbar === true && from.meta.tabbar === true) return false
    return savedPosition ?? { top: 0 }
  },
})

router.afterEach((to) => {
  document.title = typeof to.meta.title === 'string'
    ? `${to.meta.title} - 豆果美食 UI 复刻`
    : '豆果美食 UI 复刻'
})

export default router
