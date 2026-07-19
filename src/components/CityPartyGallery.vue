<template>
  <div class="city-party-gallery">
    <section aria-labelledby="city-party-mobile-gallery-title">
      <div class="city-party-gallery__heading">
        <div>
          <p class="eyebrow">Mobile Experience</p>
          <h2 id="city-party-mobile-gallery-title">用户端业务画廊</h2>
        </div>
        <p>从活动发现、报名候补到群聊、通知和信用记录，展示完整参与流程。</p>
      </div>

      <div class="city-party-gallery__mobile-grid">
        <figure v-for="screenshot in mobileScreenshots" :key="screenshot.id">
          <button
            type="button"
            class="city-party-gallery__trigger"
            :aria-label="`查看大图：${screenshot.title}`"
            @click="openLightbox(screenshot, $event)"
          >
            <CityPartyImage
              :src="screenshot.src"
              :alt="screenshot.title"
              :width="screenshot.width"
              :height="screenshot.height"
              :orientation="screenshot.orientation"
            />
          </button>
          <figcaption>
            <strong>{{ screenshot.title }}</strong>
            <span>{{ screenshot.description }}</span>
          </figcaption>
        </figure>
      </div>
    </section>

    <section class="city-party-gallery__admin" aria-labelledby="city-party-admin-gallery-title">
      <div class="city-party-gallery__heading">
        <div>
          <p class="eyebrow">Admin Console</p>
          <h2 id="city-party-admin-gallery-title">管理后台画廊</h2>
        </div>
        <p>宽图保留图表、指标和管理表格的可读性，点击可查看完整尺寸。</p>
      </div>

      <div class="city-party-gallery__admin-grid">
        <figure v-for="screenshot in adminScreenshots" :key="screenshot.id">
          <button
            type="button"
            class="city-party-gallery__trigger"
            :aria-label="`查看大图：${screenshot.title}`"
            @click="openLightbox(screenshot, $event)"
          >
            <CityPartyImage
              :src="screenshot.src"
              :alt="screenshot.title"
              :width="screenshot.width"
              :height="screenshot.height"
              :orientation="screenshot.orientation"
            />
          </button>
          <figcaption>
            <strong>{{ screenshot.title }}</strong>
            <span>{{ screenshot.description }}</span>
          </figcaption>
        </figure>
      </div>
    </section>

    <p class="city-party-gallery__note">
      截图来自本地演示环境，页面中的用户、活动和统计数据均为展示数据，不代表线上运营情况。
    </p>

    <Teleport to="body">
      <div
        v-if="activeScreenshot"
        ref="dialog"
        class="city-party-lightbox"
        role="dialog"
        aria-modal="true"
        :aria-label="`${activeScreenshot.title}大图预览`"
        @click.self="closeLightbox"
      >
        <div class="city-party-lightbox__panel" @click.stop>
          <button
            ref="closeButton"
            type="button"
            class="city-party-lightbox__close"
            aria-label="关闭图片预览"
            @click="closeLightbox"
          >
            关闭 ×
          </button>

          <div class="city-party-lightbox__image">
            <CityPartyImage
              :src="activeScreenshot.src"
              :alt="activeScreenshot.title"
              :width="activeScreenshot.width"
              :height="activeScreenshot.height"
              :orientation="activeScreenshot.orientation"
              loading="eager"
            />
          </div>

          <div class="city-party-lightbox__footer">
            <button type="button" class="city-party-lightbox__nav" aria-label="查看上一张图片" @click="showPrevious">
              ← 上一张
            </button>
            <div aria-live="polite">
              <strong>{{ activeScreenshot.title }}</strong>
              <span>{{ activeIndex + 1 }} / {{ allScreenshots.length }}</span>
            </div>
            <button type="button" class="city-party-lightbox__nav" aria-label="查看下一张图片" @click="showNext">
              下一张 →
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, ref, watch } from "vue";
import CityPartyImage from "./CityPartyImage.vue";

const props = defineProps({
  screenshots: {
    type: Array,
    default: () => []
  }
});

const dialog = ref(null);
const closeButton = ref(null);
const activeIndex = ref(-1);
const previousTrigger = ref(null);
let originalBodyOverflow = "";

const mobileScreenshots = computed(() =>
  props.screenshots.filter((screenshot) => screenshot.group === "mobile")
);
const adminScreenshots = computed(() =>
  props.screenshots.filter((screenshot) => screenshot.group === "admin")
);
const allScreenshots = computed(() => [...mobileScreenshots.value, ...adminScreenshots.value]);
const activeScreenshot = computed(() => allScreenshots.value[activeIndex.value] || null);
const isOpen = computed(() => Boolean(activeScreenshot.value));

function openLightbox(screenshot, event) {
  const index = allScreenshots.value.findIndex((item) => item.id === screenshot.id);
  if (index < 0) return;

  previousTrigger.value = event.currentTarget;
  activeIndex.value = index;
}

function closeLightbox() {
  activeIndex.value = -1;
}

function showPrevious() {
  if (!allScreenshots.value.length) return;
  activeIndex.value = (activeIndex.value - 1 + allScreenshots.value.length) % allScreenshots.value.length;
}

function showNext() {
  if (!allScreenshots.value.length) return;
  activeIndex.value = (activeIndex.value + 1) % allScreenshots.value.length;
}

function handleKeydown(event) {
  if (!isOpen.value) return;

  if (event.key === "Escape") {
    event.preventDefault();
    closeLightbox();
    return;
  }

  if (event.key === "ArrowLeft") {
    event.preventDefault();
    showPrevious();
    return;
  }

  if (event.key === "ArrowRight") {
    event.preventDefault();
    showNext();
    return;
  }

  if (event.key !== "Tab" || !dialog.value) return;

  const focusable = [...dialog.value.querySelectorAll("button:not([disabled])")];
  if (!focusable.length) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

watch(isOpen, async (open) => {
  if (open) {
    originalBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeydown);
    await nextTick();
    closeButton.value?.focus();
    return;
  }

  document.body.style.overflow = originalBodyOverflow;
  window.removeEventListener("keydown", handleKeydown);
  await nextTick();
  previousTrigger.value?.focus();
});

onBeforeUnmount(() => {
  document.body.style.overflow = originalBodyOverflow;
  window.removeEventListener("keydown", handleKeydown);
});
</script>
