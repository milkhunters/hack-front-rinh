<script setup>
import { computed, onMounted, provide, ref } from "vue";
import AuthLayout from "@/modules/auth/layouts/auth-layout.vue";
import DefaultLayout from "@/modules/project/layouts/default-layout.vue";
import { LAYOUT_KEY } from "@/common/keys";
import useUserStore from "@/modules/auth/stores/use-user-store";

const layout = ref({ layout: "default", data: {} });

const layoutComponent = computed(() => {
  return layout.value.layout === "auth" ? AuthLayout : DefaultLayout;
});

provide(LAYOUT_KEY, layout);

const userStore = useUserStore();

onMounted(userStore.fetch);
</script>

<template>
  <component :is="layoutComponent" v-bind="layout.data">
    <router-view />
  </component>
</template>
