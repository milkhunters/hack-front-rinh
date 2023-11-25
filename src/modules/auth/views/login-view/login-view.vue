<script setup>
import useUserStore from "@/modules/auth/stores/use-user-store";

const userStore = useUserStore();
</script>

<template>
  <div>Login</div>
  <div>{{ userStore.user }}</div>
</template>
