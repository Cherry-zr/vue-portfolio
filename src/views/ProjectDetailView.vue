<template>
  <section v-if="project" class="page section">
    <RouterLink class="back-link" to="/projects">← 返回项目列表</RouterLink>

    <div class="detail-hero">
      <div>
        <p class="eyebrow">{{ project.subtitle }}</p>
        <h1>{{ project.title }}</h1>
        <p>{{ project.description }}</p>
      </div>
      <div class="detail-actions">
        <RouterLink v-if="project.demoRoute" class="btn btn-primary" :to="project.demoRoute">查看在线 Demo</RouterLink>
        <a
          v-if="project.githubUrl"
          class="btn"
          :class="project.demoRoute ? 'btn-secondary' : 'btn-primary'"
          :href="project.githubUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub 源码
        </a>
      </div>
    </div>

    <div class="detail-grid">
      <article class="content-card">
        <h2>项目介绍</h2>
        <p>{{ project.summary }}</p>
        <dl class="info-list">
          <div>
            <dt>我的角色</dt>
            <dd>{{ project.role }}</dd>
          </div>
          <div v-if="project.status">
            <dt>项目状态</dt>
            <dd>{{ project.status }}</dd>
          </div>
          <div v-if="project.githubUrl">
            <dt>项目仓库</dt>
            <dd>
              <a class="inline-link" :href="project.githubUrl" target="_blank" rel="noopener noreferrer">
                GitHub 公开源码
              </a>
            </dd>
          </div>
        </dl>
      </article>

      <article class="content-card">
        <h2>技术栈</h2>
        <TagList :tags="project.techStack" />
      </article>
    </div>

    <article class="content-card">
      <h2>功能模块</h2>
      <ul class="check-list">
        <li v-for="feature in project.features" :key="feature">{{ feature }}</li>
      </ul>
    </article>

    <article class="content-card">
      <h2>难点与解决方案</h2>
      <div class="challenge-list">
        <div v-for="item in project.challenges" :key="item.title">
          <strong>{{ item.title }}</strong>
          <p>{{ item.solution }}</p>
        </div>
      </div>
    </article>

    <article v-if="project.quality?.length" class="content-card">
      <h2>测试与工程质量</h2>
      <p class="quality-note">以下为项目仓库中的历史验收记录，不代表线上生产指标。</p>
      <ul class="check-list">
        <li v-for="item in project.quality" :key="item">{{ item }}</li>
      </ul>
    </article>

    <article v-if="project.screenshots?.length" class="content-card">
      <h2>项目截图区域</h2>
      <div class="screenshot-grid">
        <figure v-for="screenshot in project.screenshots" :key="screenshot.src">
          <a
            :href="assetUrl(screenshot.src)"
            :aria-label="`查看${screenshot.title}原图`"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img :src="assetUrl(screenshot.src)" :alt="screenshot.title" loading="lazy" />
          </a>
          <figcaption>{{ screenshot.title }}</figcaption>
        </figure>
      </div>
    </article>
  </section>

  <section v-else class="page section">
    <SectionHeader title="项目不存在" description="请返回项目列表查看已有项目。" />
    <RouterLink class="btn btn-primary" to="/projects">返回项目列表</RouterLink>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import SectionHeader from "../components/SectionHeader.vue";
import TagList from "../components/TagList.vue";
import { useProjectStore } from "../stores/projectStore";
import { assetUrl } from "../utils/assets";

const route = useRoute();
const projectStore = useProjectStore();
const project = computed(() => projectStore.getProjectBySlug(route.params.slug));
</script>
