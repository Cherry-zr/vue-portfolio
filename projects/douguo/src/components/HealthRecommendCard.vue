<script setup lang="ts">
const healthItems = [
  { label: '饮食', icon: 'smile-o' },
  { label: '运动', icon: 'fire-o' },
  { label: '饮水', icon: 'cup-o' },
  { label: '睡眠', icon: 'clock-o' },
]
</script>

<template>
  <section class="health-card" aria-label="AI 健康服务状态">
    <div class="health-card__hero">
      <div>
        <h2>记录每日健康</h2>
        <p>定制推荐健康菜</p>
      </div>
      <span class="status-badge">今日饮食方案</span>
    </div>

    <div class="health-card__content">
      <div class="health-actions">
        <div v-for="item in healthItems" :key="item.label" class="health-action">
          <span class="health-action__icon"><van-icon :name="item.icon" /></span>
          <span>{{ item.label }}</span>
        </div>
      </div>
      <p class="health-card__notice"></p>
    </div>
  </section>
</template>

<style scoped>
.health-card { overflow: hidden; border-radius: 14px; background: #effbf7; }
.health-card__hero {
  min-height: 86px; padding: 20px 16px 16px; display: flex; align-items: center;
  justify-content: space-between; gap: 12px;
  background: linear-gradient(110deg, #d2f6e9 0%, #ccf4e6 48%, #d9f7ed 100%);
}
.health-card__hero h2 { margin: 0; color: #202525; font-size: clamp(19px, 5.4vw, 23px); }
.health-card__hero p { margin: 7px 0 0; color: #1a9c68; font-size: 14px; }
.status-badge {
  min-width: 86px; height: 34px; border-radius: 18px; display: inline-flex; align-items: center;
  justify-content: center; color: #ffffff; background: #23b979; font-size: 13px;
}
.health-card__content { padding: 17px 16px 19px; }
.health-actions { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
.health-action {
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  color: #87918d; font-size: 14px;
}
.health-action__icon {
  width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center;
  justify-content: center; color: #74bfa1; background: rgba(255, 255, 255, 0.88); font-size: 25px;
}
.health-card__notice {
  margin: 18px 0 0; padding-top: 15px; border-top: 1px solid rgba(23, 160, 104, 0.12);
  color: #70817b; font-size: 13px; line-height: 1.65;
}
</style>
