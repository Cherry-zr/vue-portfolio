<template>
  <div
    class="city-party-media"
    :class="[`city-party-media--${orientation}`, { 'city-party-media--failed': failed }]"
  >
    <img
      v-if="!failed"
      :src="assetUrl(src)"
      :alt="alt"
      :width="width"
      :height="height"
      :loading="loading"
      :fetchpriority="fetchpriority"
      @error="handleError"
    />
    <div v-else class="city-party-media__fallback" role="img" :aria-label="`${alt}加载失败`">
      <strong>图片暂时无法加载</strong>
      <span>{{ alt }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { assetUrl } from "../utils/assets";

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    required: true
  },
  width: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  orientation: {
    type: String,
    default: "landscape"
  },
  loading: {
    type: String,
    default: "lazy"
  },
  fetchpriority: {
    type: String,
    default: "auto"
  }
});

const failed = ref(false);

function handleError() {
  failed.value = true;
}

watch(
  () => props.src,
  () => {
    failed.value = false;
  }
);
</script>
