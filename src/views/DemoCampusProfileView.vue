<template>
  <section class="page section demo-page">
    <div class="demo-heading">
      <div>
        <p class="eyebrow">Static Demo</p>
        <h1>个人中心</h1>
        <p>展示发布、收藏、浏览记录等核心入口，数据均为本地 mock。</p>
      </div>
      <RouterLink class="btn btn-secondary" to="/demo/campus-market">返回商品列表</RouterLink>
    </div>

    <DemoNav />

    <div class="profile-layout">
      <article class="content-card profile-card">
        <div class="preview-profile">
          <div class="avatar-mark" aria-hidden="true">李</div>
          <div>
            <h2>{{ profile.nickname }}</h2>
            <p>{{ profile.role }}</p>
          </div>
        </div>
        <div class="preview-stats">
          <span><strong>{{ profile.published }}</strong>发布</span>
          <span><strong>{{ profile.favorites }}</strong>收藏</span>
          <span><strong>{{ profile.views }}</strong>足迹</span>
        </div>
      </article>

      <article class="content-card">
        <h2>最近沟通</h2>
        <div class="message-list">
          <p v-for="message in messages" :key="message.text" :class="message.from">
            {{ message.text }}
          </p>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import DemoNav from "../components/DemoNav.vue";
import { campusMessages, campusProfile } from "../data/campusMarket";

const profile = campusProfile;
const messages = campusMessages;
</script>
