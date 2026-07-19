<template>
  <article class="project-row city-party-project-row">
    <RouterLink
      class="city-party-project-row__visual"
      :to="`/projects/${project.slug}`"
      aria-label="查看 CityParty 项目详情"
    >
      <CityPartyImage
        v-if="desktopScreenshot"
        class="city-party-project-row__desktop"
        :src="desktopScreenshot.src"
        :alt="desktopScreenshot.title"
        :width="desktopScreenshot.width"
        :height="desktopScreenshot.height"
        :orientation="desktopScreenshot.orientation"
      />
      <CityPartyImage
        v-if="mobileScreenshot"
        class="city-party-project-row__phone"
        :src="mobileScreenshot.src"
        :alt="mobileScreenshot.title"
        :width="mobileScreenshot.width"
        :height="mobileScreenshot.height"
        :orientation="mobileScreenshot.orientation"
      />
    </RouterLink>

    <div class="city-party-project-row__content">
      <p class="project-row__meta">{{ project.subtitle }}</p>
      <h2>{{ project.cardTitle }}</h2>
      <strong class="city-party-project-row__subtitle">{{ project.cardSubtitle }}</strong>
      <span class="city-party-project-row__status">{{ project.status }}</span>
      <p>{{ project.summary }}</p>
      <TagList :tags="project.listTags" />
    </div>

    <div class="project-row__actions city-party-project-row__actions">
      <RouterLink class="btn btn-primary" :to="`/projects/${project.slug}`">查看详情</RouterLink>
      <a
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

<script setup>
import { computed } from "vue";
import CityPartyImage from "./CityPartyImage.vue";
import TagList from "./TagList.vue";

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
});

const listScreenshots = computed(() =>
  props.project.showcase.list
    .map((id) => props.project.screenshots.find((screenshot) => screenshot.id === id))
    .filter(Boolean)
);

const desktopScreenshot = computed(() =>
  listScreenshots.value.find((screenshot) => screenshot.orientation === "landscape")
);

const mobileScreenshot = computed(() =>
  listScreenshots.value.find((screenshot) => screenshot.orientation === "portrait")
);
</script>
