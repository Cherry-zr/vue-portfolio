<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getUserCalendar } from '../api/user'
import { getErrorMessage, isRequestCanceled } from '../api/request'
import PageHeader from '../components/PageHeader.vue'
import PendingState from '../components/PendingState.vue'
import type { CalendarDayViewModel } from '../types/content'

const route = useRoute()
const id = computed(() => (typeof route.params.id === 'string' ? route.params.id.trim() : ''))
const now = new Date()
const year = ref(now.getFullYear())
const month = ref(now.getMonth() + 1)
const days = ref<CalendarDayViewModel[]>([])
const prompt = ref('')
const loading = ref(false)
const error = ref('')
let controller: AbortController | undefined

const imageByDay = computed(() => new Map(days.value.map((item) => [item.day, item.imageUrl])))
const calendarCells = computed(() => {
  const firstWeekday = new Date(year.value, month.value - 1, 1).getDay()
  const count = new Date(year.value, month.value, 0).getDate()
  return [
    ...Array.from({ length: firstWeekday }, (_, index) => ({ key: `blank-${index}`, day: 0, imageUrl: undefined })),
    ...Array.from({ length: count }, (_, index) => ({
      key: `${year.value}-${month.value}-${index + 1}`,
      day: index + 1,
      imageUrl: imageByDay.value.get(index + 1),
    })),
  ]
})

const load = async () => {
  controller?.abort()
  error.value = ''
  days.value = []
  controller = new AbortController()
  loading.value = true
  try {
    const result = await getUserCalendar(id.value, year.value, month.value, controller.signal)
    days.value = result.days
    prompt.value = result.prompt
  } catch (requestError) {
    if (!isRequestCanceled(requestError)) error.value = getErrorMessage(requestError)
  } finally {
    loading.value = false
  }
}

const changeMonth = (delta: number) => {
  const date = new Date(year.value, month.value - 1 + delta, 1)
  year.value = date.getFullYear()
  month.value = date.getMonth() + 1
}

watch([id, year, month], () => void load(), { immediate: true })
onBeforeUnmount(() => controller?.abort())
</script>

<template>
  <section class="calendar-page">
    <PageHeader title="发布日历" />
    <main class="calendar-body">
      <header class="calendar-switcher">
        <button type="button" aria-label="上个月" @click="changeMonth(-1)"><van-icon name="arrow-left" /></button>
        <strong>{{ year }} 年 {{ month }} 月</strong>
        <button type="button" aria-label="下个月" @click="changeMonth(1)"><van-icon name="arrow" /></button>
      </header>
      <van-loading v-if="loading" vertical>正在读取发布记录...</van-loading>
      <PendingState v-else-if="error" compact title="日历加载失败" :description="error" icon="warning-o" action-label="重新加载" @action="load" />
      <template v-else>
        <div class="calendar-grid calendar-weekdays"><span v-for="day in ['日','一','二','三','四','五','六']" :key="day">{{ day }}</span></div>
        <div class="calendar-grid calendar-days">
          <div v-for="cell in calendarCells" :key="cell.key" :class="{ empty: !cell.day, published: cell.imageUrl }">
            <span v-if="cell.day">{{ cell.day }}</span>
            <img v-if="cell.imageUrl" :src="cell.imageUrl" alt="" />
          </div>
        </div>
        <p class="calendar-note">{{ prompt || (days.length ? `本月共有 ${days.length} 天发布记录` : '本月没有公开发布记录') }}</p>
      </template>
    </main>
  </section>
</template>

<style scoped>
.calendar-page { min-height: 100vh; background: #fff; }
.calendar-body { padding: 18px 15px 40px; }
.calendar-switcher { height: 48px; display: grid; grid-template-columns: 44px 1fr 44px; align-items: center; }
.calendar-switcher button { width: 40px; height: 40px; border: 0; background: transparent; font-size: 20px; }
.calendar-switcher strong { text-align: center; font-size: 18px; }
.calendar-grid { display: grid; grid-template-columns: repeat(7, 1fr); }
.calendar-weekdays { margin-top: 12px; padding: 9px 0; color: #999; text-align: center; font-size: 12px; }
.calendar-days { gap: 5px; }
.calendar-days div { position: relative; aspect-ratio: 1; border-radius: 10px; overflow: hidden; display: flex; align-items: center; justify-content: center; background: #f7f7f7; }
.calendar-days div.empty { background: transparent; }
.calendar-days span { position: relative; z-index: 1; font-size: 13px; }
.calendar-days img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.calendar-days .published span { align-self: start; margin-top: 4px; border-radius: 8px; padding: 1px 5px; color: #fff; background: rgba(0,0,0,.45); }
.calendar-note { margin-top: 20px; color: #999; text-align: center; font-size: 13px; }
</style>
