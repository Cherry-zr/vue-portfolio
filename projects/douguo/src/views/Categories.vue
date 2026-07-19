<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getCategories } from '../api/category'
import { getErrorMessage, isRequestCanceled } from '../api/request'
import PendingState from '../components/PendingState.vue'
import type { CategoryViewModel } from '../types/content'

withDefaults(defineProps<{ embedded?: boolean }>(), { embedded: false })

const router = useRouter()
const categories = ref<CategoryViewModel[]>([])
const activeIndex = ref(0)
const loading = ref(false)
const error = ref('')
let controller: AbortController | undefined

const activeCategory = computed(() => categories.value[activeIndex.value])

const loadCategories = async () => {
  controller?.abort()
  controller = new AbortController()
  loading.value = true
  error.value = ''

  try {
    categories.value = await getCategories(controller.signal)
    activeIndex.value = 0
  } catch (requestError) {
    if (!isRequestCanceled(requestError)) error.value = getErrorMessage(requestError)
  } finally {
    loading.value = false
  }
}

const searchCategory = (category: CategoryViewModel) => {
  const keyword = category.name.trim()
  if (!keyword) return
  void router.push({ path: '/search', query: { keyword } })
}

onMounted(() => void loadCategories())
onBeforeUnmount(() => controller?.abort())
</script>

<template>
  <section class="categories-page">
    <header class="page-header">
      <button v-if="!embedded" type="button" aria-label="返回" @click="router.back()"><van-icon name="arrow-left" /></button>
      <span v-else />
      <strong>菜谱分类</strong>
      <span />
    </header>

    <div v-if="loading" class="category-loading">
      <van-loading size="28px">正在加载服务器分类...</van-loading>
    </div>

    <PendingState
      v-else-if="error"
      title="分类加载失败"
      :description="error"
      icon="warning-o"
      action-label="重新加载"
      @action="loadCategories"
    />

    <van-empty v-else-if="categories.length === 0" description="服务器没有返回分类数据" />

    <div v-else class="category-layout">
      <nav class="category-roots" aria-label="一级分类">
        <button
          v-for="(category, index) in categories"
          :key="category.key"
          type="button"
          :class="{ active: activeIndex === index }"
          @click="activeIndex = index"
        >
          {{ category.name }}
        </button>
      </nav>

      <main v-if="activeCategory" class="category-groups">
        <section v-for="group in activeCategory.children" :key="group.key" class="category-group">
          <button type="button" class="category-group__title" @click="searchCategory(group)">
            <img v-if="group.imageUrl" :src="group.imageUrl" alt="" />
            <strong>{{ group.name || activeCategory.name }}</strong>
            <van-icon name="arrow" />
          </button>
          <div class="category-chips">
            <button
              v-for="child in group.children"
              :key="child.key"
              type="button"
              @click="searchCategory(child)"
            >
              {{ child.name }}
            </button>
          </div>
        </section>

        <button
          v-if="activeCategory.children.length === 0"
          type="button"
          class="direct-search"
          @click="searchCategory(activeCategory)"
        >
          查看“{{ activeCategory.name }}”菜谱
        </button>
      </main>
    </div>
  </section>
</template>

<style scoped>
.categories-page { min-height: 100vh; background: #ffffff; }
.page-header {
  position: sticky; top: 0; z-index: 20; height: 58px; padding: max(5px, env(safe-area-inset-top)) 14px 0;
  display: grid; grid-template-columns: 44px 1fr 44px; align-items: center;
  border-bottom: 1px solid #f2f2f2; background: #ffffff;
}
.page-header button { width: 40px; height: 40px; border: 0; padding: 0; background: transparent; font-size: 22px; }
.page-header strong { text-align: center; font-size: 17px; }
.category-loading { min-height: 420px; display: flex; align-items: center; justify-content: center; }
.category-layout { min-height: calc(100vh - 126px); display: grid; grid-template-columns: 94px minmax(0, 1fr); }
.category-roots { background: #f7f7f7; }
.category-roots button {
  width: 100%; min-height: 54px; border: 0; padding: 8px; color: #777; background: transparent; font-size: 14px;
}
.category-roots button.active { color: #202020; background: #ffffff; font-weight: 700; }
.category-groups { min-width: 0; padding: 18px 15px 32px; }
.category-group + .category-group { margin-top: 25px; }
.category-group__title {
  width: 100%; min-height: 40px; border: 0; padding: 0; display: flex; align-items: center;
  gap: 9px; color: #222; background: transparent; text-align: left;
}
.category-group__title img { width: 40px; height: 40px; border-radius: 8px; object-fit: cover; }
.category-group__title strong { min-width: 0; flex: 1; font-size: 16px; }
.category-group__title :deep(.van-icon) { color: #bbb; }
.category-chips { margin-top: 12px; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 9px 7px; }
.category-chips button,
.direct-search {
  min-height: 38px; border: 0; border-radius: 8px; padding: 6px; color: #5f5f5f; background: #f7f7f7; font-size: 13px;
}
.direct-search { width: 100%; margin-top: 24px; color: #ff4d58; }
</style>
