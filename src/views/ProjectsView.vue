<template>
  <section class="page section">
    <SectionHeader
      eyebrow="Projects"
      title="项目展示"
      description="重点展示本机源码项目和静态 Demo，突出项目结构、功能模块和技术栈。"
    />

    <div class="project-list">
      <article v-for="project in projects" :key="project.slug" class="project-row">
        <div>
          <p class="project-row__meta">{{ project.subtitle }}</p>
          <h2>{{ project.title }}</h2>
          <p>{{ project.summary }}</p>
          <TagList :tags="project.techStack.slice(0, 7)" />
        </div>
        <div class="project-row__actions">
          <RouterLink class="btn btn-primary" :to="`/projects/${project.slug}`">查看详情</RouterLink>
          <RouterLink class="btn btn-secondary" :to="project.demoRoute">在线 Demo</RouterLink>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { storeToRefs } from "pinia";
import SectionHeader from "../components/SectionHeader.vue";
import TagList from "../components/TagList.vue";
import { useProjectStore } from "../stores/projectStore";

const projectStore = useProjectStore();
const { projects } = storeToRefs(projectStore);
</script>
