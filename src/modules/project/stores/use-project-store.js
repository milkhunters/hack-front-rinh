import { defineStore } from "pinia";
import { ref } from "vue";
import {
  useCreateJoinLinkMutation,
  useCreateProjectColumnMutation, useProjectColumnsList,
  useProjectList,
} from "@/modules/project/hooks/use-projects";

const useProjectStore = defineStore("project", () => {
  const currentProjectId = ref(null);

  const userProjects = useProjectList();

  const createJoinLinkMutation = useCreateJoinLinkMutation();

  function generateLink() {
    if (!currentProjectId.value) {
      return;
    }

    createJoinLinkMutation.mutate(currentProjectId.value, {
      onSuccess({ succeed, content }) {
        if (succeed) {
          const link = `${window.location.origin}/join/${content.id}`;
          window.navigator.clipboard.writeText(link);
        }
      },
    });
  }

  const createColumnMutation = useCreateProjectColumnMutation(currentProjectId);

  function createColumn(title) {
    if (currentProjectId.value) {
      createColumnMutation.mutate(title);
    }
  }

  const projectColumns = useProjectColumnsList(currentProjectId);

  return { currentProjectId, userProjects, generateLink, createColumn, projectColumns };
});

export default useProjectStore;
