<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  date: {
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
  <div class="card mb-4 " :style="{ backgroundColor: props.color }">
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-5">
            {{ props.name }}
          </p>
          <p class="subtitle is-6">{{ props.date }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style module lang="css"></style>
