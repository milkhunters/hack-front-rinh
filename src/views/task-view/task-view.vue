<script setup>
import { reactive } from "vue";
import taskCard from "./components/task-card.vue";
import modalComponent from "@/common/components/modal/modal-component.vue";

const statuses = reactive([
  {
    id: 1,
    name: "ToDo 🤔",
    color: "#D8DCFF",
  },
  {
    id: 2,
    name: "In Progress 🏃",
    color: "#ABE9CE",
  },
  {
    id: 3,
    name: "Freeze ❄",
    color: "#FEC6B7",
  },
  {
    id: 4,
    name: "Review 👀",
    color: "#D8DCFF",
  },
  {
    id: 5,
    name: "Done 🎉",
    color: "#ABE9CE",
  },
  {
    id: 6,
    name: "Trash 🗑",
    color: "#FEC6B7",
  },
  {
    id: 7,
    name: "Archived 🔒",
    color: "#D8DCFF",
  },
]);

const tasks = reactive([
  {
    id: 1,
    title: "Create Project Proposal",
    description: "Draft a proposal for the upcoming project",
    statusId: 1,
    date: "01.01.2023",
    color: "#D8DCFF",
  },
  {
    id: 2,
    title: "Develop User Interface",
    description: "Design and implement the UI for the new feature",
    statusId: 2,
    color: "#ABE9CE",
  },
  {
    id: 3,
    title: "Bug Fixing - Login Page",
    description: "Investigate and fix bugs on the login page",
    statusId: 3,
    color: "#FEC6B7",
  },
  {
    id: 4,
    title: "Code Review - Backend",
    description: "Conduct a thorough review of backend code",
    statusId: 4,
    color: "#ABE9CE",
  },
  {
    id: 5,
    title: "Release Version 1.0",
    description: "Prepare and deploy the first version of the software",
    statusId: 5,
    color: "#FFDFBA",
  },
  {
    id: 6,
    title: "Obsolete Feature Cleanup",
    description: "Remove outdated features from the codebase",
    statusId: 6,
    color: "#FEC6B7",
  },

  {
    id: 8,
    title: "Enhance User Experience",
    description: "Implement improvements to enhance overall user experience",
    statusId: 1,
    color: "#ABE9CE",
  },

  {
    id: 10,
    title: "Optimize Database Queries",
    description: "Improve the efficiency of database queries for better performance",
    statusId: 2,
    color: "#FFDFBA",
  },
  {
    id: 11,
    title: "Create Mobile Responsive Design",
    description: "Adapt the UI to ensure optimal display on mobile devices",
    statusId: 2,
    color: "#ABE9CE",
  },
  {
    id: 12,
    title: "Address Security Vulnerabilities",
    description: "Identify and address potential security risks in the system",
    statusId: 2,
    color: "#D8DCFF",
  },
  {
    id: 13,
    title: "Temporary Feature Suspension",
    description: "Temporarily suspend a non-critical feature to resolve issues",
    statusId: 3,
    color: "#ABE9CE",
  },
  {
    id: 14,
    title: "Update External Libraries",
    description: "Upgrade external libraries to the latest versions for security and functionality",
    statusId: 3,
    color: "#ABE9CE",
  },
  {
    id: 15,
    title: "Performance Testing",
    description: "Conduct performance testing to ensure optimal system response times",
    statusId: 3,
    color: "#FFDFBA",
  },
  {
    id: 16,
    title: "Implement User Feedback",
    description: "Incorporate user feedback and suggestions into the system",
    statusId: 4,
    color: "#D8DCFF",
  },
  {
    id: 17,
    title: "Code Refactoring - Frontend",
    description: "Refactor frontend code for improved maintainability",
    statusId: 4,
    color: "#ABE9CE",
  },
  {
    id: 18,
    title: "Collaborative Code Review",
    description: "Engage in a collaborative code review session with the development team",
    statusId: 4,
    color: "#ABE9CE",
  },
  {
    id: 19,
    title: "Prepare Release Notes",
    description: "Compile release notes detailing new features and bug fixes",
    statusId: 5,
    color: "#FEC6B7",
  },
  {
    id: 20,
    title: "User Training Materials",
    description: "Create training materials for end-users on the new features",
    statusId: 5,
    color: "#FEC6B7",
  },
  {
    id: 21,
    title: "Post-Release Feedback Analysis",
    description: "Analyze user feedback after the release to identify areas for improvement",
    statusId: 5,
    color: "#D8DCFF",
  },
  {
    id: 22,
    title: "Obsolete Feature Removal",
    description: "Permanently remove outdated features from the codebase",
    statusId: 6,
    color: "#FFDFBA",
  },
  {
    id: 23,
    title: "Code Cleanup",
    description: "Perform routine code cleanup to maintain code quality",
    statusId: 6,
    color: "#D8DCFF",
  },
  {
    id: 24,
    title: "Archival of Legacy Code",
    description: "Archive legacy code that is no longer in use",
    statusId: 6,
    color: "#FEC6B7",
  },
]);

const onDragStart = (event, item) => {
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("itemId", item.id.toString());
};

const onDrop = (event, statusId) => {
  const itemId = parseInt(event.dataTransfer.getData("itemId"));
  tasks.values = tasks.map((task) => {
    if (task.id === itemId) task.statusId = statusId;
    return task;
  });
};

const newTask = reactive({
  title: "",
  description: "",
  statusId: null,
  color: "#D8DCFF",
});


const colors = reactive(["#D8DCFF", "#ABE9CE", "#FEC6B7", "#FFDFBA", "#F2BAE1"]);

const modals = reactive({
  addTask: false,
  addStatus: false,
  addProject: false,
});

const countTasksByStatusId = (statusId) => {
  return tasks.filter((task) => task.statusId === statusId).length;
};

const openModal = (modal) => {
  modals[modal] = true;
};

const closeModal = (modal) => {
  modals[modal] = false;
};

const addTask = () => {
  newTask.id = Math.floor(Math.random() * 1000000);
  tasks.push({...newTask});
  newTask.title = "";
  newTask.description = "";
  newTask.statusId = null;
  closeModal('addTask');
};
</script>

<template>
  <div :class="$style.flow" @click.stop="closeAllDropdowns">
    <modal-component
      :close="() => closeModal('addTask')"
      :isActive="modals.addTask"
      title="Новая карточка"
      footer="active"
    >
      <label for="name">Название задачи</label>
      <input
        class="input"
        type="text"
        v-model="newTask.title"
        placeholder="Введите название задачи..."
      />

      <label class='mt-2' for="description">Описание задачи</label>
      <input
        class="input"
        type="text"
        v-model="newTask.description"
        placeholder="Введите описание задачи..."
      />

      <label class='mt-2' for="login">Цвет</label>
      <div class="select">
        <select v-model="newTask.color">
          <option :style="{ backgroundColor: color }" v-for="(color, item) of colors" :key="item">
            <div>{{ color }}</div>
          </option>
        </select>
      </div>

      <br />
      <br />

      <button @click.stop="addTask" class="button is-primary">Добавить</button>
    </modal-component>

    <main :class="$style.main">
      <div
        v-for="status in statuses"
        :key="status.id"
        @drop="onDrop($event, status.id)"
        :class="$style.column"
        @dragover.prevent
        @dragenter.prevent
      >
        <div class="box mt-4">
          <div class="is-flex is-justify-content-center is-align-items-center title is-4">
            {{ status.name }}
            <button class="button is-small is-link is-light is-rounded ml-2">
              <b>{{ countTasksByStatusId(status.id) }}</b>
            </button>
          </div>
          <hr />

          <task-card
            v-for="task in tasks.filter((t) => t.statusId === status.id)"
            :key="task.id"
            :name="task.title"
            :date="task.date"
            :color="task.color"
            @dragstart="onDragStart($event, task)"
            draggable="true"
          >
          </task-card>

          <button
            @click.stop="
              () => {
                openModal('addTask');
                newTask.statusId = status.id;
              }
            "
            class="button"
          >
            <span class="icon">
              <i class="fi fi-rr-add mr-1"></i>
            </span>
            <span>Добавить карточку</span>
          </button>
        </div>
      </div>
      <div :class="$style.column">
        <div class="box mt-4">
          <div class="is-flex is-justify-content-center is-align-items-center title is-4">
            <button class="button is-light">
              <span class="icon">
                <i class="fi fi-rr-add mr-1"></i>
              </span>
              <span>Добавить коллону</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style module lang="scss">
// Flow
.flow {
  width: 100%;
  height: 100vh;
}

// Main
.main {
  display: flex;
  padding: 0 0 0 30px;
  overflow-x: auto;
  height: 100%;
}

// Column
.column {
  width: 400px;
  margin-right: 30px;
  margin-bottom: 20px;
}

// Add
.add {
  font-size: 30px;
}
</style>
