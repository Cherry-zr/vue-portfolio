<template>
  <section class="city-party-preview" aria-label="CityParty 移动端与管理后台页面预览">
    <figure
      v-for="(screenshot, index) in previewScreenshots"
      :key="screenshot.id"
      class="city-party-preview__item"
      :class="`city-party-preview__item--${screenshot.orientation}`"
    >
      <CityPartyImage
        :src="screenshot.src"
        :alt="screenshot.title"
        :width="screenshot.width"
        :height="screenshot.height"
        :orientation="screenshot.orientation"
        :loading="index === 0 ? 'eager' : 'lazy'"
        :fetchpriority="index === 0 ? 'high' : 'auto'"
      />
      <figcaption>{{ screenshot.title }}</figcaption>
    </figure>
  </section>
</template>

<script setup>
import { computed } from "vue";
import CityPartyImage from "./CityPartyImage.vue";

const props = defineProps({
  screenshots: {
    type: Array,
    default: () => []
  },
  imageIds: {
    type: Array,
    default: () => []
  }
});

const previewScreenshots = computed(() =>
  props.imageIds
    .map((id) => props.screenshots.find((screenshot) => screenshot.id === id))
    .filter(Boolean)
);
</script>
