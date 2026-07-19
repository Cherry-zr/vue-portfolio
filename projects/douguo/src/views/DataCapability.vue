<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getMaterialDetail, getNutrientAnalysis } from '../api/recipe'
import { getErrorMessage, isRequestCanceled } from '../api/request'
import PageHeader from '../components/PageHeader.vue'
import PendingState from '../components/PendingState.vue'

const props = defineProps<{ kind: 'material' | 'nutrient' }>()
const route = useRoute()
const loading = ref(false)
const error = ref('')
const data = ref<Record<string, unknown> | null>(null)
let controller: AbortController | undefined

const title = computed(() => props.kind === 'material' ? '食材详情' : '营养分析')
const target = computed(() => {
  if (props.kind === 'material') return typeof route.params.name === 'string' ? route.params.name.trim() : ''
  return typeof route.params.id === 'string' ? route.params.id.trim() : ''
})
const entries = computed(() => Object.entries(data.value || {}).slice(0, 30))

const formatValue = (value: unknown) => {
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return String(value)
  try {
    return JSON.stringify(value)
  } catch {
    return '暂无法展示'
  }
}

const load = async () => {
  controller?.abort()
  data.value = null
  error.value = ''
  if (!target.value) {
    error.value = `页面地址缺少${props.kind === 'material' ? '食材名称' : '菜谱 ID'}`
    return
  }
  controller = new AbortController()
  loading.value = true
  try {
    data.value = props.kind === 'material'
      ? await getMaterialDetail(target.value, controller.signal)
      : await getNutrientAnalysis(target.value, controller.signal)
  } catch (requestError) {
    if (!isRequestCanceled(requestError)) error.value = getErrorMessage(requestError)
  } finally {
    loading.value = false
  }
}

watch(() => route.fullPath, () => void load(), { immediate: true })
onBeforeUnmount(() => controller?.abort())
</script>

<template>
  <section class="capability-page">
    <PageHeader :title="title" />
    <main class="capability-body">
      <van-loading v-if="loading" vertical>正在读取豆果数据...</van-loading>
      <PendingState
        v-else-if="error"
        compact
        :title="`${title}暂不可用`"
        :description="`${error}。该入口来自接口文档，当前上游未返回可展示数据。`"
        icon="warning-o"
        action-label="重新加载"
        @action="load"
      />
      <van-empty v-else-if="entries.length === 0" description="服务器没有返回可展示内容" />
      <section v-else class="data-card">
        <h1>{{ target }}</h1>
        <dl>
          <template v-for="entry in entries" :key="entry[0]">
            <dt>{{ entry[0] }}</dt>
            <dd>{{ formatValue(entry[1]) }}</dd>
          </template>
        </dl>
      </section>
    </main>
  </section>
</template>

<style scoped>
.capability-page { min-height: 100vh; background: #fff; }
.capability-body { padding: 28px 18px 40px; }
.data-card h1 { margin: 0 0 18px; font-size: 24px; }
.data-card dl { margin: 0; }
.data-card dt { margin-top: 14px; color: #999; font-size: 12px; }
.data-card dd { margin: 5px 0 0; overflow-wrap: anywhere; color: #333; font-size: 14px; line-height: 1.65; }
</style>
