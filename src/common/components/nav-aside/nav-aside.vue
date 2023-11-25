<script setup>
import { ref } from "vue";
const projects = ref([
  {
    id: 1,
    title: "Project 1",
  },
  {
    id: 2,
    title: "Project 2",
  },
  {
    id: 3,
    title: "Project 3",
  },
  {
    id: 4,
    title: "Project 4",
  },
]);
</script>

<template>
  <div :class="$style.flow">
    <header :class="$style.header">
        RndTeam
        </header>

    <p :class="$style.title">
      Projects
    </p>
    <div :class="$style.items">
      <div v-for="project in projects" :key="project.id" :class="$style.item">
        <h2>{{ project.title }}</h2>
      </div>
      <div></div>
    </div>
  </div>
</template>

<style module lang="scss">
.flow {
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100vh;
  width: 100%;
  background: #0f1d40;
  color: white;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  font-size: 30px;
  font-weight: 700;

  img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-right: 5px;
  }
}

.title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  padding: 0;
}

.search {
  background: #0f1d40;
}
</style>
