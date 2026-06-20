<template>
  <section class="page section demo-page">
    <div class="demo-heading">
      <div>
        <p class="eyebrow">Static Demo</p>
        <h1>发布商品</h1>
        <p>模拟真实系统的发布流程，表单只生成本地预览，不会提交到后端或数据库。</p>
      </div>
      <RouterLink class="btn btn-secondary" to="/demo/campus-market">返回商品列表</RouterLink>
    </div>

    <DemoNav />

    <div class="publish-layout">
      <form class="content-card form-card publish-form" @submit.prevent="submitted = true">
        <div class="form-section">
          <h2>基本信息</h2>
          <div class="form-grid">
            <label>
              商品标题
              <input v-model="form.title" type="text" maxlength="80" placeholder="例如：九成新计算器 / 宿舍小冰箱" />
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
          </div>
        </div>

        <div class="form-section">
          <h2>交易信息</h2>
          <div class="form-grid">
            <label>
              成色
              <select v-model="form.condition">
                <option>全新</option>
                <option>九成新</option>
                <option>八成新</option>
                <option>七成新</option>
              </select>
            </label>
            <label>
              交易地点
              <input v-model="form.location" type="text" placeholder="例如：图书馆东门" />
            </label>
          </div>
        </div>

        <div class="form-section">
          <h2>商品描述</h2>
          <label>
            描述
            <textarea v-model="form.description" rows="5" placeholder="说明成色、购买时间、是否有瑕疵、建议交易地点等"></textarea>
          </label>
        </div>

        <div class="form-section">
          <h2>商品图片</h2>
          <div class="upload-placeholder">
            <strong>点击或拖拽上传商品图片</strong>
            <span>静态 Demo 不处理真实文件上传，这里展示发布页的图片上传区域。</span>
          </div>
        </div>

        <button class="btn btn-primary" type="submit">生成本地预览</button>
      </form>

      <aside class="content-card publish-tips">
        <h2>发布建议</h2>
        <ul class="check-list">
          <li>标题写清楚品牌、型号和成色。</li>
          <li>描述里说明瑕疵、配件和交易地点。</li>
          <li>优先选择校园公共区域当面交易。</li>
        </ul>
      </aside>
    </div>

    <article v-if="submitted" class="content-card preview-result">
      <div class="preview-result__cover">
        <span>{{ form.category }}</span>
      </div>
      <div>
        <p class="goods-status">本地预览 · 不会保存 · {{ form.condition }}</p>
        <h2>{{ form.title || "未填写标题" }}</h2>
        <p>{{ form.description || "暂无描述" }}</p>
        <TagList :tags="[form.category, form.location || '待填写地点', `¥${form.price || 0}`]" />
      </div>
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
  category: "数码设备",
  price: 50,
  condition: "九成新",
  location: "",
  description: ""
});
</script>
