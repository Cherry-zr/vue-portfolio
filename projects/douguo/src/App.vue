<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MainSwipeLayout from './layouts/MainSwipeLayout.vue'

const route = useRoute()
const isMainRoute = computed(() => route.meta.tabbar === true)
</script>

<template>
  <div class="app-shell">
    <MainSwipeLayout v-if="isMainRoute" />
    <main v-if="!isMainRoute" class="page-main">
      <RouterView />
    </main>
  </div>
</template>
