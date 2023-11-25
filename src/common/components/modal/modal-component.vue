<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  close: {
    type: Function,
    required: true,
  },
});
</script>

<template>
  <div class="modal" :class="{ 'is-active': isActive }">
    <div class="modal-background" @click.stop="close"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          <b>{{ title }}</b>
        </p>
        <button @click="close" class="delete is-danger" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <slot></slot>
      </section>
    </div>
  </div>
</template>
