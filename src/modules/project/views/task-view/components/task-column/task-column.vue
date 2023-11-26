<script setup>
import { ref, watch } from "vue";
import draggable from "vuedraggable";
import TaskCard from "@/modules/project/views/task-view/components/task-column/components/task-card/task-card.vue";
import TaskCreationModal from "@/modules/project/views/task-view/components/task-column/components/task-creation-modal/task-creation-modal.vue";
import useModal from "@/common/hooks/use-modal";
import { useUpdateTaskMutation } from "@/modules/project/hooks/use-projects";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  tasks: {
    type: Array,
    required: true,
  },
});

const newTaskModal = useModal();

const newTasks = ref(props.tasks);

watch(
  () => props.tasks,
  () => {
    newTasks.value = props.tasks;
  },
);

const updateTaskMutation = useUpdateTaskMutation();

function sendSequence(event) {
  if (event.removed) {
    return;
  }

  const target = event.added ?? event.moved;
  const task = target.element;
  const nextTask = newTasks.value[target.newIndex + 1];

  updateTaskMutation.mutate({
    taskId: task.id,
    title: task.title,
    color: task.color,
    content: task.content,
    columnId: props.id,
    childId: nextTask?.id ?? null,
  });
}
</script>

<template>
  <div :class="$style.column">
    <task-creation-modal
      :is-open="newTaskModal.isOpen.value"
      :column-id="id"
      @close="newTaskModal.close"
    />
    <div class="box mt-4">
      <div class="is-flex is-justify-content-center is-align-items-center title is-4">
        {{ title }}
      </div>
      <hr />

      <div class="card-wrapper">
        <draggable v-model="newTasks" group="tasks" item-key="id" @change="sendSequence">
          <template #item="{ element: task }">
            <task-card
              :key="task.id"
              :title="task.title"
              :content="task.content"
              :color="task.color"
            />
          </template>
        </draggable>
      </div>

      <button @click="newTaskModal.open" class="button">
        <span class="icon">
          <i class="fi fi-rr-add mr-1"></i>
        </span>
        <span>Добавить карточку</span>
      </button>
    </div>
  </div>
</template>

<style module lang="scss">
.column {
  width: 400px;
  margin-right: 30px;
  margin-bottom: 20px;
}
</style>
