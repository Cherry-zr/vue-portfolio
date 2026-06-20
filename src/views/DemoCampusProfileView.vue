<template>
  <section class="page section demo-page">
    <div class="demo-heading">
      <div>
        <p class="eyebrow">Static Demo</p>
        <h1>个人中心</h1>
        <p>展示发布、收藏、订单和消息等核心入口，数据均为本地 mock。</p>
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
          <span><strong>{{ profile.orders }}</strong>订单</span>
          <span><strong>{{ profile.views }}</strong>足迹</span>
        </div>
        <div class="preview-menu">
          <span v-for="menu in profile.menus" :key="menu">{{ menu }}</span>
        </div>
      </article>

      <article class="content-card">
        <h2>最近沟通</h2>
        <div class="message-list">
          <p v-for="message in messages" :key="message.text" :class="message.from">
            <strong>{{ message.name }}</strong>
            <span>{{ message.text }}</span>
          </p>
        </div>
      </article>
    </div>

    <article class="content-card order-panel">
      <div class="panel-header">
        <div>
          <h2>我的订单</h2>
          <p class="panel-copy">模拟买家视角的订单状态，展示支付、聊天和交易完成等流程入口。</p>
        </div>
      </div>
      <div class="order-table">
        <div class="order-row order-row--head">
          <span>订单号</span>
          <span>商品</span>
          <span>金额</span>
          <span>状态</span>
        </div>
        <div v-for="order in orders" :key="order.id" class="order-row">
          <span>{{ order.id }}</span>
          <strong>{{ order.title }}</strong>
          <span>¥{{ order.amount }}</span>
          <span>{{ order.status }}</span>
        </div>
      </div>
    </article>
  </section>
</template>

<script setup>
import DemoNav from "../components/DemoNav.vue";
import { campusMessages, campusOrders, campusProfile } from "../data/campusMarket";

const profile = campusProfile;
const messages = campusMessages;
const orders = campusOrders;
</script>
