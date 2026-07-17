<template>
  <section class="city-party-preview" aria-label="同城活动发现与陌生人组局平台页面预览">
    <figure v-if="primaryScreenshot" class="city-party-preview__primary">
      <img
        :src="assetUrl(primaryScreenshot.src)"
        :alt="primaryScreenshot.title"
        width="375"
        height="812"
      />
      <figcaption>{{ primaryScreenshot.title }}</figcaption>
    </figure>

    <div class="city-party-preview__secondary">
      <figure v-for="screenshot in secondaryScreenshots" :key="screenshot.src">
        <img
          :src="assetUrl(screenshot.src)"
          :alt="screenshot.title"
          loading="lazy"
          width="640"
          height="420"
        />
        <figcaption>{{ screenshot.title }}</figcaption>
      </figure>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { assetUrl } from "../utils/assets";

const props = defineProps({
  screenshots: {
    type: Array,
    default: () => []
  }
});

const primaryScreenshot = computed(() =>
  props.screenshots.find((screenshot) => screenshot.src.endsWith("/home.png"))
);

const secondaryScreenshots = computed(() =>
  ["/map.png", "/admin-analytics.png"]
    .map((fileName) => props.screenshots.find((screenshot) => screenshot.src.endsWith(fileName)))
    .filter(Boolean)
);
</script>
