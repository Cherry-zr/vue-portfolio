<template>
  <section v-if="goods" class="page section demo-page">
    <RouterLink class="back-link" to="/demo/campus-market">← 返回商品列表</RouterLink>

    <div class="goods-detail">
      <div class="goods-detail__image" aria-hidden="true">
        <span>{{ goods.category }}</span>
      </div>
      <div class="goods-detail__content">
        <p class="goods-status">{{ goods.status }} · {{ goods.condition }}</p>
        <h1>{{ goods.title }}</h1>
        <p>{{ goods.description }}</p>
        <strong class="detail-price">¥{{ goods.price }}</strong>
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
          <RouterLink class="btn btn-primary" to="/demo/campus-market/auth">模拟联系卖家</RouterLink>
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

const route = useRoute();
const projectStore = useProjectStore();
const goods = computed(() => projectStore.getGoodsById(route.params.id));
</script>
