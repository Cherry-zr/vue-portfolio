<template>
  <section class="page section demo-page">
    <div class="demo-heading">
      <div>
        <p class="eyebrow">Project Gallery</p>
        <h1>电影评分数据分析与可视化</h1>
        <p>展示 Python 数据分析项目生成的核心图表，当前页面为静态作品展示。</p>
      </div>
      <RouterLink class="btn btn-secondary" to="/projects/movie-rating-analysis">返回项目详情</RouterLink>
    </div>

    <div class="screenshot-grid large">
      <figure v-for="image in figures" :key="image.src">
        <img :src="assetUrl(image.src)" :alt="image.title" />
        <figcaption>{{ image.title }}</figcaption>
      </figure>
    </div>
  </section>
</template>

<script setup>
import { assetUrl } from "../utils/assets";

const figures = [
  { title: "评分分布", src: "assets/movie/rating_distribution.png" },
  { title: "类型平均评分", src: "assets/movie/genre_average_ratings.png" },
  { title: "评分时间热力图", src: "assets/movie/rating_weekday_hour_heatmap.png" },
  { title: "IMDb 对比分析", src: "assets/movie/imdb_comparison.png" },
  { title: "分析流程", src: "assets/movie/analysis_workflow.png" }
];
</script>
