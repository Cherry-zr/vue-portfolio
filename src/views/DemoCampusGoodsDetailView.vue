<template>
  <section v-if="goods" class="page section demo-page">
    <RouterLink class="back-link" to="/demo/campus-market">← 返回商品列表</RouterLink>

    <div class="goods-detail">
      <div class="goods-detail__image">
        <img :src="assetUrl(goods.image)" :alt="goods.title" />
        <span class="status-badge" :class="{ pending: goods.statusCode === 'PENDING' }">
          {{ goods.status }}
        </span>
      </div>
      <div class="goods-detail__content">
        <p class="goods-status">{{ goods.categoryLabel }} · {{ goods.condition }}</p>
        <h1>{{ goods.title }}</h1>
        <strong class="detail-price">¥{{ goods.price }}</strong>
        <p>{{ goods.description }}</p>

        <div class="seller-card">
          <div class="avatar-mark" aria-hidden="true">{{ goods.seller.slice(0, 1) }}</div>
          <div>
            <strong>{{ goods.seller }}</strong>
            <p>同校交易更方便，建议先沟通商品状态和取货地点。</p>
          </div>
        </div>

        <dl class="info-list">
          <div>
            <dt>卖家</dt>
            <dd>{{ goods.seller }}</dd>
          </div>
          <div>
            <dt>地点</dt>
            <dd>{{ goods.location }}</dd>
          </div>
          <div>
            <dt>发布时间</dt>
            <dd>{{ goods.postedAt }}</dd>
          </div>
        </dl>
        <TagList :tags="goods.features" />
        <div class="hero__actions">
          <RouterLink class="btn btn-primary" to="/demo/campus-market/profile">模拟下单</RouterLink>
          <RouterLink class="btn btn-secondary" to="/demo/campus-market/auth">联系卖家</RouterLink>
          <RouterLink class="btn btn-secondary" to="/demo/campus-market/profile">查看个人中心</RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import TagList from "../components/TagList.vue";
import { useProjectStore } from "../stores/projectStore";
import { assetUrl } from "../utils/assets";

const route = useRoute();
const projectStore = useProjectStore();
const goods = computed(() => projectStore.getGoodsById(route.params.id));
</script>
