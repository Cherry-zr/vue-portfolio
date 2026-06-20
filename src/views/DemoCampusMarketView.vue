<template>
  <section class="page section demo-page">
    <div class="campus-market-hero" :style="{ '--campus-hero-image': `url(${assetUrl('assets/campus/home.png')})` }">
      <div class="campus-market-hero__content">
        <p class="eyebrow">Static Demo · Campus Market</p>
        <h1>把闲置好物，交给同校同学继续使用</h1>
        <p>使用本地 mock 数据复现真实系统的商品搜索、分类筛选、详情浏览、发布和个人中心流程。</p>
        <div class="campus-hero-search">
          <input
            id="keyword"
            v-model="keyword"
            type="search"
            placeholder="搜索教材、iPad、台灯、球拍..."
            @input="projectStore.setCampusKeyword(keyword)"
          />
          <RouterLink class="btn btn-primary" to="/demo/campus-market/publish">发布闲置</RouterLink>
        </div>
      </div>
      <div class="campus-market-hero__card">
        <span>今日推荐</span>
        <strong>低价淘到校园好物</strong>
        <p>覆盖商品详情、收藏、订单、消息和后台审核等完整业务链路。</p>
      </div>
    </div>

    <DemoNav />

    <div class="market-layout">
      <aside class="market-filter">
        <div class="filter-summary">
          <strong>{{ filteredCampusGoods.length }}</strong>
          <span>件匹配商品</span>
        </div>

        <div class="category-list">
          <button
            v-for="category in campusCategories"
            :key="category"
            type="button"
            :class="{ active: selectedCampusCategory === category }"
            @click="projectStore.setCampusCategory(category)"
          >
            {{ category }}
          </button>
        </div>
      </aside>

      <div v-if="filteredCampusGoods.length" class="goods-grid">
        <RouterLink
          v-for="item in filteredCampusGoods"
          :key="item.id"
          class="goods-card"
          :to="`/demo/campus-market/goods/${item.id}`"
        >
          <div class="goods-thumb">
            <img :src="assetUrl(item.image)" :alt="item.title" />
            <span class="status-badge" :class="{ pending: item.statusCode === 'PENDING' }">
              {{ item.status }}
            </span>
          </div>
          <div>
            <p class="goods-status">{{ item.status }} · {{ item.condition }}</p>
            <h2>{{ item.title }}</h2>
            <p>{{ item.description }}</p>
          </div>
          <div class="goods-footer">
            <strong>¥{{ item.price }}</strong>
            <span>{{ item.categoryLabel }} · {{ item.postedAt }}</span>
          </div>
        </RouterLink>
      </div>

      <article v-else class="empty-state content-card">
        <h2>没有找到匹配商品</h2>
        <p>换一个关键词，或者切换到“全部”分类再试试。</p>
        <button class="btn btn-secondary" type="button" @click="resetFilters">重置筛选</button>
      </article>
    </div>
  </section>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import DemoNav from "../components/DemoNav.vue";
import { useProjectStore } from "../stores/projectStore";
import { assetUrl } from "../utils/assets";

const projectStore = useProjectStore();
const { campusCategories, selectedCampusCategory, filteredCampusGoods } = storeToRefs(projectStore);
const keyword = ref(projectStore.campusKeyword);

function resetFilters() {
  keyword.value = "";
  projectStore.setCampusKeyword("");
  projectStore.setCampusCategory("全部");
}
</script>
