<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <button class="button is-primary ml-3">
    <span class="icon">
      <i class="fi fi-rr-add mr-1"></i>
    </span>
    <span>{{ label }}</span>
  </button>
</template>

<style scoped lang="scss">

</style>
