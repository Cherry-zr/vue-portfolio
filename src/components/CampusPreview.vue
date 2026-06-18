<template>
  <section class="campus-preview" aria-label="校园二手交易平台预览">
    <div class="preview-column preview-search">
      <h3>搜索 / 分类</h3>
      <div class="preview-input">搜索商品、类别、用户</div>
      <div class="preview-tabs">
        <span>全部</span>
        <span>数码</span>
        <span>书籍</span>
        <span>生活</span>
      </div>
      <div class="preview-category-grid">
        <span>运动</span>
        <span>文具</span>
        <span>其他</span>
        <span>校园</span>
      </div>
    </div>

    <div class="preview-column">
      <h3>商品列表</h3>
      <div v-for="item in goods" :key="item.id" class="preview-good">
        <div class="preview-thumb" aria-hidden="true"></div>
        <div>
          <strong>{{ item.title }}</strong>
          <span>¥{{ item.price }} · {{ item.postedAt }}</span>
        </div>
      </div>
    </div>

    <div class="preview-column">
      <h3>个人中心</h3>
      <div class="preview-profile">
        <div class="avatar-mark" aria-hidden="true">李</div>
        <div>
          <strong>{{ profile.nickname }}</strong>
          <span>{{ profile.role }}</span>
        </div>
      </div>
      <div class="preview-stats">
        <span><strong>{{ profile.published }}</strong>发布</span>
        <span><strong>{{ profile.favorites }}</strong>收藏</span>
        <span><strong>{{ profile.views }}</strong>足迹</span>
      </div>
      <div class="preview-menu">
        <span v-for="menu in profile.menus" :key="menu">{{ menu }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { campusGoods, campusProfile } from "../data/campusMarket";

const goods = campusGoods.slice(0, 3);
const profile = campusProfile;
</script>
