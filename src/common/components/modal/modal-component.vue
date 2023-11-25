<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true
  },
  close: {
    type: Function,
    required: true
  },

});

</script>

<template>
  <div class='modal' :class='{"is-active": isActive}'>
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title "><b>{{ props.title }}</b> </p>
        <button @click="close" class="delete is-danger" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <slot></slot>
      </section>
    </div>
  </div>
</template>

<style></style>
