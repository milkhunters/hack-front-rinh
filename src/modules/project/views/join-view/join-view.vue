<script setup>
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import useProjectStore from "@/modules/project/stores/use-project-store";
import { useProjectJoinMutation } from "@/modules/project/hooks/use-projects";

const route = useRoute();
const router = useRouter();

const joinMutation = useProjectJoinMutation();
const projectStore = useProjectStore();

onMounted(async () => {
  const projectId = route.params.projectId;
  joinMutation.mutate(projectId);
  projectStore.currentProjectId = projectId;
  router.push({ name: "tasks" });
});
</script>

<template>
  <div>Joining...</div>
</template>
