<template>
  <section class="page section demo-page">
    <div class="demo-heading">
      <div>
        <p class="eyebrow">Static Demo</p>
        <h1>校园二手交易平台</h1>
        <p>本页面使用本地 mock 数据模拟商品搜索、分类筛选、详情浏览和个人中心入口。</p>
      </div>
      <RouterLink class="btn btn-secondary" to="/projects/campus-market">返回项目详情</RouterLink>
    </div>

    <DemoNav />

    <div class="market-layout">
      <aside class="market-filter">
        <label for="keyword">搜索商品</label>
        <input
          id="keyword"
          v-model="keyword"
          type="search"
          placeholder="搜索商品、类别、描述"
          @input="projectStore.setCampusKeyword(keyword)"
        />

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

      <div class="goods-grid">
        <RouterLink
          v-for="item in filteredCampusGoods"
          :key="item.id"
          class="goods-card"
          :to="`/demo/campus-market/goods/${item.id}`"
        >
          <div class="goods-thumb" aria-hidden="true">
            <span>{{ item.category }}</span>
          </div>
          <div>
            <p class="goods-status">{{ item.status }} · {{ item.condition }}</p>
            <h2>{{ item.title }}</h2>
            <p>{{ item.description }}</p>
          </div>
          <div class="goods-footer">
            <strong>¥{{ item.price }}</strong>
            <span>{{ item.postedAt }}</span>
          </div>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import DemoNav from "../components/DemoNav.vue";
import { useProjectStore } from "../stores/projectStore";

const projectStore = useProjectStore();
const { campusCategories, selectedCampusCategory, filteredCampusGoods } = storeToRefs(projectStore);
const keyword = ref(projectStore.campusKeyword);
</script>
