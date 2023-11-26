<script setup>
import { reactive, ref, watch } from "vue";
import { RouterView, useRoute, useRouter } from "vue-router";
import ModalComponent from "@/common/components/modal/modal-component.vue";
import SignButton from "@/common/components/sign-button/sign-button.vue";
import ProjectButton from "@/modules/project/layouts/project-button/project-button.vue";
import useProjectStore from "@/modules/project/stores/use-project-store";
import { useCreateProjectMutation } from "@/modules/project/hooks/use-projects";
import useUserStore from "@/modules/auth/stores/use-user-store";

const newProject = ref({ title: "", endTime: new Date() });
const isProjectModalOpen = ref(false);

function openProjectModal() {
  newProject.value = { title: "", endTime: new Date() };
  isProjectModalOpen.value = true;
}

function closeProjectModal() {
  isProjectModalOpen.value = false;
}

const createProjectMutation = useCreateProjectMutation();

function createProject() {
  const data = {
    title: newProject.value.title,
    startTime: new Date().toISOString(),
    endTime: new Date(newProject.value.endTime).toISOString(),
  };

  createProjectMutation.mutate(data, {
    onSuccess() {
      closeProjectModal();
    },
  });
}

const dropdowns = reactive({
  user: false,
  workspace: false,
  project: false,
  notifications: false,
});

function closeAllDropdowns() {
  for (const key of Object.keys(dropdowns)) {
    dropdowns[key] = false;
  }
}

const router = useRouter();

function changeBoard(event) {
  const route = event.target.value;
  router.push({ name: route });
}

const projectStore = useProjectStore();
const userStore = useUserStore();

function logout() {
  userStore.logout.mutate();
  router.push({ name: "login" });
}

const route = useRoute();

watch(
  () => route.query.id,
  (value) => {
    projectStore.currentProjectId = value;
  },
);

watch(
  () => projectStore.currentProjectId,
  (value) => {
    router.push({ query: { id: value } });
  },
);

function goToLogin() {
  router.push({ name: "login" });
}
</script>

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
        <div class="is-black is-medium is-bold"><b>RndTeam</b></div>
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
      <div :class="$style.rigth">
        <div :class="$style.avatar">
          <div class="dropdown is-right" :class="{ 'is-active': dropdowns.user }">
            <div class="dropdown-trigger">
              <button v-if="userStore.user" class="button" @click="logout">
                <b>{{ userStore.user?.firstName }}</b> - Выйти
              </button>
              <button v-else class="button" @click="goToLogin">Войти</button>
            </div>
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
