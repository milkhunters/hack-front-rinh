<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="card mb-4" :style="{ backgroundColor: color }">
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-5">{{ title }}</p>
          <p>{{ content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style module lang="css"></style>
