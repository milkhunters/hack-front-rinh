<script setup>
import { ref } from "vue";
import { useProjectList } from "@/modules/project/hooks/use-projects";

const filter = ref("");

const projects = useProjectList({ filter });
</script>

<template>
  <div v-if="projects.isSuccess">
    <div v-for="project in projects.data.value" :key="project.id">
      <h1>{{ project.id }}</h1>
      <p>{{ project.title }}</p>
    </div>
  </div>
</template>
