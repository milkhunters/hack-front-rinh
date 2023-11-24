<script setup>
import { useProjectList } from "./hooks/use-projects";

const projects = useProjectList();
</script>

<template>
  <div v-if="projects.isSuccess">
    <div v-for="project in projects.data.value" :key="project.id">
      <h1>{{ project.id }}</h1>
      <p>{{ project.title }}</p>
    </div>
  </div>
</template>
