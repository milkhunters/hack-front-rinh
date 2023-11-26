<script setup>
import { reactive } from "vue";
import ModalComponent from "@/common/components/modal/modal-component.vue";
import useProjectStore from "@/modules/project/stores/use-project-store";

defineProps({
  isOpen: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits(["close"]);

const newColumn = reactive({
  title: "",
});

const projectStore = useProjectStore();

function addColumn() {
  projectStore.createColumn(newColumn.title, {
    onSuccess({ succeed }) {
      if (succeed) {
        emit("close");
      }
    },
  });
}
</script>

<template>
  <modal-component
    v-if="isOpen"
    :isActive="isOpen"
    @close="$emit('close')"
    title="Новая колонна"
    footer="active"
  >
    <label for="name">Название задачи</label>
    <input
      class="input"
      type="text"
      v-model="newColumn.title"
      placeholder="Введите название задачи..."
    />

    <button @click="addColumn" class="button is-primary mt-2">Добавить</button>
  </modal-component>
</template>
