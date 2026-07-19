<template>
  <section class="page section">
    <SectionHeader
      eyebrow="Projects"
      title="项目展示"
      description="展示项目结构、业务功能、技术难点、工程质量与可访问的静态 Demo。"
    />

    <div class="project-list">
      <template v-for="project in projects" :key="project.slug">
        <CityPartyProjectRow
          v-if="project.slug === 'city-party-platform'"
          :project="project"
        />
        <article v-else class="project-row">
          <div>
            <p class="project-row__meta">{{ project.subtitle }}</p>
            <h2>{{ project.title }}</h2>
            <p>{{ project.summary }}</p>
            <TagList :tags="project.techStack.slice(0, 7)" />
          </div>
          <div class="project-row__actions">
            <RouterLink class="btn btn-primary" :to="`/projects/${project.slug}`">查看详情</RouterLink>
            <RouterLink v-if="project.demoRoute" class="btn btn-secondary" :to="project.demoRoute">在线 Demo</RouterLink>
            <a
              v-if="project.githubUrl"
              class="btn btn-secondary"
              :href="project.githubUrl"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub 源码
            </a>
          </div>
        </article>
      </template>
    </div>
  </section>
</template>

<script setup>
import { storeToRefs } from "pinia";
import CityPartyProjectRow from "../components/CityPartyProjectRow.vue";
import SectionHeader from "../components/SectionHeader.vue";
import TagList from "../components/TagList.vue";
import { useProjectStore } from "../stores/projectStore";

const projectStore = useProjectStore();
const { projects } = storeToRefs(projectStore);
</script>
