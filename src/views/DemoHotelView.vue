<template>
  <section class="page section demo-page">
    <div class="demo-heading">
      <div>
        <p class="eyebrow">Project Gallery</p>
        <h1>LuxeStay 酒店管理系统</h1>
        <p>展示本地 SSM 酒店后台管理系统截图，当前页面为静态作品展示。</p>
      </div>
      <RouterLink class="btn btn-secondary" to="/projects/hotel-management">返回项目详情</RouterLink>
    </div>

    <div class="screenshot-grid large">
      <figure v-for="image in screenshots" :key="image.src">
        <img :src="assetUrl(image.src)" :alt="image.title" />
        <figcaption>{{ image.title }}</figcaption>
      </figure>
    </div>
  </section>
</template>

<script setup>
import { assetUrl } from "../utils/assets";

const screenshots = [
  { title: "登录页", src: "assets/hotel/login.png" },
  { title: "后台工作台", src: "assets/hotel/dashboard.png" },
  { title: "房间管理", src: "assets/hotel/rooms.png" },
  { title: "房型管理", src: "assets/hotel/room_types.png" },
  { title: "商品管理", src: "assets/hotel/products.png" }
];
</script>
