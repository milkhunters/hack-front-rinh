<script setup>
import { ref, watch } from "vue";
import draggable from "vuedraggable";
import TaskColumn from "@/modules/project/views/task-view/components/task-column/task-column.vue";
import TaskColumnCreationModal from "@/modules/project/views/task-view/components/task-column-creation-modal/task-column-creation-modal.vue";
import useLayout from "@/common/hooks/use-layout";
import useModal from "@/common/hooks/use-modal";
import useProjectStore from "@/modules/project/stores/use-project-store";
import { useUpdateColumnMutation } from "@/modules/project/hooks/use-projects";

useLayout("default");

const newColumnModal = useModal();

const projectStore = useProjectStore();

const newColumns = ref([]);

watch(
  () => projectStore.projectColumns.data,
  (data) => {
    newColumns.value = data;
  },
);

const updateColumnMutation = useUpdateColumnMutation();

function sendSequence(event) {
  if (event.removed) {
    return;
  }

  const target = event.added ?? event.moved;
  const column = target.element;
  const nextColumn = newColumns.value[target.newIndex + 1];

  updateColumnMutation.mutate({
    columnId: column.id,
    title: column.title,
    childId: nextColumn?.id ?? null,
  });
}
</script>

<template>
  <div :class="$style.flow">
    <main :class="$style.main">
      <task-column-creation-modal
        :is-open="newColumnModal.isOpen.value"
        @close="newColumnModal.close"
      />
      <template v-if="projectStore.projectColumns.isSuccess">
        <draggable :class="$style.dragged" v-model="newColumns" group="columns" item-key="id" @change="sendSequence">
          <template #item="{ element: column }">
            <task-column :id="column.id" :title="column.title" :tasks="column.tasks" />
          </template>
        </draggable>
      </template>
      <div v-if="projectStore.currentProjectId" :class="$style.column">
        <div class="box mt-4">
          <div class="is-flex is-justify-content-center is-align-items-center title is-4">
            <button class="button is-light">
              <span class="icon">
                <i class="fi fi-rr-add mr-1"></i>
              </span>
              <span @click="newColumnModal.open">Добавить коллону</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style module lang="scss">
.dragged {
  display: flex;
}

.flow {
  height: 100vh;
}

.main {
  display: flex;
  padding: 0 0 0 30px;
  overflow-x: auto;
  width: 100%;
  height: 100%;
}

.column {
  width: 400px;
  margin-right: 30px;
  margin-bottom: 20px;
}

.add {
  font-size: 30px;
}
</style>
