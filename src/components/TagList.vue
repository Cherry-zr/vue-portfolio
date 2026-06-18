<template>
  <div class="tag-list">
    <span v-for="tag in tags" :key="tag" class="tag">{{ tag }}</span>
  </div>
</template>

<script setup>
defineProps({
  tags: {
    type: Array,
    required: true
  }
});
</script>
