<template>
  <section class="page section">
    <SectionHeader
      eyebrow="Skills"
      title="技能栈"
      description="按实际项目中使用过或重点学习的方向分类展示，便于面试时快速沟通。"
    />

    <div class="skills-grid">
      <article v-for="group in skillGroups" :key="group.title" class="content-card skill-card">
        <h2>{{ group.title }}</h2>
        <p>{{ group.description }}</p>
        <TagList :tags="group.skills" />
      </article>
    </div>
  </section>
</template>

<script setup>
import SectionHeader from "../components/SectionHeader.vue";
import TagList from "../components/TagList.vue";
import { skillGroups } from "../data/skills";
</script>
