<template>
  <section class="page section demo-page">
    <div class="demo-heading">
      <div>
        <p class="eyebrow">Static Demo</p>
        <h1>发布商品</h1>
        <p>表单仅做前端展示，不会提交到后端或数据库。</p>
      </div>
      <RouterLink class="btn btn-secondary" to="/demo/campus-market">返回商品列表</RouterLink>
    </div>

    <DemoNav />

    <form class="content-card form-card" @submit.prevent="submitted = true">
      <label>
        商品标题
        <input v-model="form.title" type="text" placeholder="例如：机械键盘 青轴" />
      </label>
      <label>
        分类
        <select v-model="form.category">
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>
      </label>
      <label>
        价格
        <input v-model.number="form.price" type="number" min="1" />
      </label>
      <label>
        商品描述
        <textarea v-model="form.description" rows="5" placeholder="描述成色、交易地点和注意事项"></textarea>
      </label>
      <button class="btn btn-primary" type="submit">生成本地预览</button>
    </form>

    <article v-if="submitted" class="content-card preview-result">
      <p class="goods-status">本地预览 · 不会保存</p>
      <h2>{{ form.title || "未填写标题" }}</h2>
      <p>{{ form.description || "暂无描述" }}</p>
      <TagList :tags="[form.category, `¥${form.price || 0}`]" />
    </article>
  </section>
</template>

<script setup>
import { reactive, ref } from "vue";
import DemoNav from "../components/DemoNav.vue";
import TagList from "../components/TagList.vue";
import { campusCategories } from "../data/campusMarket";

const categories = campusCategories.filter((category) => category !== "全部");
const submitted = ref(false);
const form = reactive({
  title: "",
  category: "数码",
  price: 50,
  description: ""
});
</script>
