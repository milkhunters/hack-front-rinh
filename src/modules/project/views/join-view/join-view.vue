<script setup>
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProjectJoinMutation } from "@/modules/project/hooks/use-projects";

const route = useRoute();
const router = useRouter();

const joinMutation = useProjectJoinMutation();

onMounted(async () => {
  const projectId = route.params.projectId;
  const { succeed } = await joinMutation.mutate(projectId);
  if (succeed) await router.push({ name: "projects" });
});
</script>

<template>
  <div>Joining...</div>
</template>
