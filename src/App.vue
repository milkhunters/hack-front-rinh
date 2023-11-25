<script setup>
import defaultLayout from '@/common/layouts/default-layout.vue';

const auth = true;

</script>

<template>
<default-layout v-if="auth"/>
<div v-else>
  <router-view/>
</div>
</template>

<style module lang="scss">

</style>
