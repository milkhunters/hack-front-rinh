import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { useApi } from "@/common/hooks/use-api";
import { COLUMN_KEYS, columnListQuery, PROJECT_KEYS, projectListQuery } from "../queries";

export function useProjectList(meta) {
  const api = useApi();
  const query = projectListQuery(api, meta);
  return useQuery(query);
}

export function useProjectColumnsList(projectId) {
  const api = useApi();
  const query = columnListQuery(api, projectId);
  return useQuery(query);
}

export function useCreateProjectMutation() {
  const api = useApi();
  const client = useQueryClient();
  return useMutation({
    mutationFn: api.projects.create,
    onSuccess() {
      client.invalidateQueries({ queryKey: PROJECT_KEYS.all });
    },
  });
}

export function useCreateJoinLinkMutation() {
  const api = useApi();
  return useMutation({
    mutationFn: api.projects.createJoinLink,
  });
}

export function useProjectJoinMutation() {
  const api = useApi();
  return useMutation({
    mutationFn: api.projects.join,
  });
}

export function useCreateProjectColumnMutation(projectId) {
  const api = useApi();
  const client = useQueryClient();
  return useMutation({
    mutationFn: (title) => api.projects.createColumn({ projectId: projectId.value, title }),
    onSuccess() {
      client.invalidateQueries({ queryKey: COLUMN_KEYS.list(projectId.value) });
    },
  });
}

export function useCreateTaskMutation(projectId, columnId) {
  const api = useApi();
  const client = useQueryClient();
  return useMutation({
    mutationFn: (data) => api.projects.createTask({ columnId, ...data }),
    onSuccess() {
      client.invalidateQueries({ queryKey: PROJECT_KEYS.all });
    },
  });
}

export function useUpdateTaskMutation() {
  const api = useApi();
  return useMutation({
    mutationFn: api.projects.updateTask,
  });
}

export function useUpdateColumnMutation() {
  const api = useApi();
  return useMutation({
    mutationFn: api.projects.updateColumn,
  });
}
