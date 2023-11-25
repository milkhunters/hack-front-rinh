<script setup>
import { computed, provide, ref } from "vue";
import AuthLayout from "@/modules/auth/layouts/auth-layout.vue";
import DefaultLayout from "@/modules/project/layouts/default-layout.vue";
import { LAYOUT_KEY } from "@/common/keys";

const layout = ref({ layout: "default", data: {} });

const layoutComponent = computed(() => {
  return layout.value.layout === "auth" ? AuthLayout : DefaultLayout;
});

provide(LAYOUT_KEY, layout);
</script>

<template>
  <component :is="layoutComponent" v-bind="layout.data">
    <router-view />
  </component>
</template>
