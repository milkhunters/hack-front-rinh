<script setup>
import { reactive } from "vue";
import ModalComponent from "@/common/components/modal/modal-component.vue";
import { useCreateTaskMutation } from "@/modules/project/hooks/use-projects";
import useProjectStore from "@/modules/project/stores/use-project-store";

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: false,
    default: false,
  },
  columnId: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const colors = ["#D8DCFF", "#ABE9CE", "#FEC6B7", "#FFDFBA", "#F2BAE1"];

const newTask = reactive({
  title: "",
  color: "",
  content: "",
});

const projectStore = useProjectStore();

const createTaskMutation = useCreateTaskMutation(projectStore.currentProjectId, props.columnId);

function addTask() {
  createTaskMutation.mutate(newTask);
  emit("close");
}
</script>

<template>
  <modal-component
    v-if="isOpen"
    :isActive="isOpen"
    @close="$emit('close')"
    title="Новая карточка"
    footer="active"
  >
    <label for="name">Название задачи</label>
    <input
      id="name"
      class="input"
      type="text"
      v-model="newTask.title"
      placeholder="Введите название задачи..."
    />

    <label class="mt-2" for="description">Описание задачи</label>
    <input
      id="description"
      class="input"
      type="text"
      v-model="newTask.content"
      placeholder="Введите описание задачи..."
    />

    <label class="mt-2" for="color">Цвет</label>
    <div class="select">
      <select id="color" v-model="newTask.color">
        <option :style="{ backgroundColor: color }" v-for="color in colors" :key="color">
          {{ color }}
        </option>
      </select>
    </div>

    <button @click="addTask" class="button is-primary mt-2">Добавить</button>
  </modal-component>
</template>
