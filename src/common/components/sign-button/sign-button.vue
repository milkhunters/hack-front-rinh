<script setup>
defineProps({
  isLoading: {
    type: Boolean,
    required: false,
    default: false,
  },
  label: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <button :class="$style.sign_button">
    <div v-if="isLoading" :class="$style.wrapper">
      <button class="button is-loading is-primary" :class="$style.spinner"></button>
    </div>
    <template v-else>{{ label }}</template>
  </button>
</template>

<style module lang="scss">
@import "@/styles/variables.scss";

.sign_button {
  width: 100%;
  border: 0;
  border-radius: 6px;
  height: 40px;
  max-height: 40px;
  font-size: 16px;
  font-weight: 500;
  padding: 0 15px;
  cursor: pointer;
  background: $primary-color;
  color: rgb(255, 255, 255);
  margin-top: 10px;
  user-select: none;
}

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  z-index: 10;
}

.spinner {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>
