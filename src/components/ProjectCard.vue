<template>
  <article class="project-card">
    <div class="project-card__meta">{{ project.subtitle }}</div>
    <h3>{{ project.title }}</h3>
    <p>{{ project.summary }}</p>
    <TagList :tags="project.techStack.slice(0, 5)" />
    <RouterLink class="text-button" :to="`/projects/${project.slug}`">
      查看详情
      <span aria-hidden="true">→</span>
    </RouterLink>
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
