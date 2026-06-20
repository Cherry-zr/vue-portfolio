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
        <RouterLink class="btn btn-primary" :to="project.demoRoute">查看在线 Demo</RouterLink>
        <a
          class="btn btn-secondary"
          :href="project.githubUrl || '#'"
          :aria-disabled="!project.githubUrl"
          :class="{ disabled: !project.githubUrl }"
          target="_blank"
          rel="noreferrer"
          @click="handleEmptyLink"
        >
          {{ project.githubUrl ? "GitHub 源码" : "GitHub 待补充" }}
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
          <div>
            <dt>源码路径</dt>
            <dd>{{ project.sourcePath }}</dd>
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

    <article class="content-card">
      <h2>项目截图区域</h2>
      <div v-if="project.screenshots?.length" class="screenshot-grid">
        <figure v-for="screenshot in project.screenshots" :key="screenshot.src">
          <img :src="assetUrl(screenshot.src)" :alt="screenshot.title" />
          <figcaption>{{ screenshot.title }}</figcaption>
        </figure>
      </div>
      <p v-else>暂无截图，后续会补充真实运行页面。</p>
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

function handleEmptyLink(event) {
  if (!project.value?.githubUrl) {
    event.preventDefault();
  }
}
</script>
