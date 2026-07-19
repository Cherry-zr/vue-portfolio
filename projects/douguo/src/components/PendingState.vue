<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    description?: string
    compact?: boolean
    icon?: string
    actionLabel?: string
  }>(),
  {
    title: '内容待补充',
    description: '当前部分尚未提供效果图，暂时保留占位。',
    compact: false,
    icon: 'notes-o',
    actionLabel: '',
  },
)

const emit = defineEmits<{
  action: []
}>()
</script>

<template>
  <div class="pending-state" :class="{ 'pending-state--compact': compact }">
    <div class="pending-state__icon">
      <van-icon :name="icon" />
    </div>
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
    <button v-if="actionLabel" type="button" @click="emit('action')">{{ actionLabel }}</button>
  </div>
</template>

<style scoped>
.pending-state {
  min-height: 430px;
  padding: 110px 24px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.pending-state--compact {
  min-height: 260px;
  padding-top: 68px;
}

.pending-state__icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b8b8b8;
  background: #f5f5f5;
  font-size: 30px;
}

h2 {
  margin: 20px 0 8px;
  color: #333333;
  font-size: 18px;
}

p {
  max-width: 270px;
  margin: 0;
  color: #a0a0a0;
  font-size: 14px;
  line-height: 1.7;
}

button {
  min-width: 104px;
  height: 40px;
  margin-top: 22px;
  border: 0;
  border-radius: 21px;
  padding: 0 18px;
  color: #ffffff;
  background: #ff4d58;
  font-size: 15px;
}
</style>
