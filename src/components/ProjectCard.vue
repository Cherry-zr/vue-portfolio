<template>
  <article class="project-card">
    <div class="project-card__meta">{{ project.subtitle }}</div>
    <h3>{{ project.title }}</h3>
    <p>{{ project.summary }}</p>
    <TagList :tags="project.techStack.slice(0, 5)" />
    <div class="project-card__actions">
      <RouterLink class="text-button" :to="`/projects/${project.slug}`">
        查看详情
        <span aria-hidden="true">→</span>
      </RouterLink>
      <RouterLink v-if="project.demoRoute" class="text-button" :to="project.demoRoute">在线 Demo</RouterLink>
      <a
        v-if="project.githubUrl"
        class="text-button"
        :href="project.githubUrl"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub 源码
      </a>
    </div>
  </article>
</template>

<script setup>
import TagList from "./TagList.vue";

defineProps({
  project: {
    type: Object,
    required: true
  }
});
</script>
