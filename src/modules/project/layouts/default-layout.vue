<script setup>
import { computed, reactive, ref, watch } from "vue";
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

function toggleDropdown(key) {
  closeAllDropdowns();
  key.value = !key.value;
}

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
          <div class="select is-rounded">
            <select @change="changeBoard">
              <option value="tasks">Доска</option>
              <option value="wiki">Вики</option>
            </select>
          </div>

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

          <project-button @click="openProjectModal" label="Новый проект" />
          <project-button
            v-if="projectStore.currentProjectId"
            @click="projectStore.generateLink"
            label="Ссылка на проект"
          />
        </div>
      </div>
      <div :class="$style.rigth">
        <div v-if="userStore.user" :class="$style.avatar">
          <div class="dropdown is-right" :class="{ 'is-active': dropdowns.user }">
            <div class="dropdown-trigger">
              <button class="button" @click="logout">
                <b>{{ userStore.user?.firstName }}</b> - Выйти
              </button>
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

<style module lang="scss">
.flow {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main {
  width: 100%;
  height: calc(100% - 70px);
}

.header {
  height: 70px;
  display: flex;
  grid-area: "header";
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  background-color: white;
  border-bottom: 1px solid grey;
}

.left {
  display: flex;
  align-items: center;
  width: 400px;
}

.rigth {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 180px;
}

.notifications {
  font-size: 24px;
  font-weight: bold;
}
</style>
