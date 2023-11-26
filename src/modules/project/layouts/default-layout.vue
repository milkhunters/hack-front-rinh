<template>
  <modal-component :isActive="isProjectModalOpen" @close="closeProjectModal" title="Новый проект">
    <label for="name">Название проекта</label>
    <input
      id="name"
      class="input"
      v-model="newProject.title"
      type="text"
      placeholder="Введите название проекта..."
      required
    />

    <label class="mt-2" for="end_date">Дата конца</label>
    <input
      id="end_date"
      class="input"
      v-model="newProject.endTime"
      type="date"
      placeholder="Введите время окончания..."
      required
    />

    <sign-button class="button is-primary mt-2" @click="createProject" label="Добавить" />
  </modal-component>

  <div :class="$style.flow" @click.stop="closeAllDropdowns">
    <header :class="$style.header">
      <div :class="$style.left">
        <button class="button is-black is-medium is-bold"><b>RndTeam</b></button>
        
        <div class="is-flex ml-4">
          <div v-if="projectStore.userProjects.data?.length" class="select is-rounded ml-2">
            <select v-model="projectStore.currentProjectId">
              <option
                v-for="project in projectStore.userProjects.data"
                :key="project.id"
                :value="project.id"
              >
                {{ project.title }}
              </option>
            </select>
          </div>

          <project-button @click="changeBoard('tasks')" label="Доска" />
          <project-button @click="changeBoard('wiki')" label="Вики" />
          <project-button @click="openProjectModal" label="Новый проект" />
          <project-button
            v-if="projectStore.currentProjectId"
            @click="projectStore.generateLink"
            label="Ссылка на проект"
          />
        </div>
      </div>

      <div :class="$style.right">
        <div :class="$style.notifications">
          <div class="dropdown is-right" :class="{ 'is-active': dropdowns.notifications }">
            <!-- Your notification dropdown content -->
          </div>
        
          <div v-if="userStore.user" :class="$style.avatar">
            <div class="dropdown is-right" :class="{ 'is-active': dropdowns.user }">
              <!-- Your user profile dropdown content -->
            </div>
          </div>

          <div v-if="userStore.user" :class="$style.avatar">
            <button class="button" @click="logout">
              Выйти
            </button>
          </div>
        </div>
      </div>
    </header>

    <main :class="$style.main">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
// Import other necessary components and functions

const newProject = ref({ title: "", endTime: new Date() });
const isProjectModalOpen = ref(false);

// Rest of your reactive variables and functions

// Detect mobile view
const isMobileView = ref(false);

function checkMobileView() {
  isMobileView.value = window.innerWidth <= 768; // Adjust breakpoint as needed
}

window.addEventListener('resize', () => {
  checkMobileView();
});

onMounted(() => {
  checkMobileView();
});

</script>

<style module lang="scss">
/* Your existing styles... */

/* Mobile responsiveness */
@media screen and (max-width: 768px) {
  .flow {
    height: auto;
  }

  .header {
    flex-direction: column;
    height: auto;
    padding: 20px 10px; /* Adjust padding as needed */
  }

  .left, .right {
    width: 100%;
    margin-bottom: 10px; /* Adjust spacing as needed */
  }

  .right {
    order: -1; /* Reorder right section for mobile view */
  }
}
</style>
