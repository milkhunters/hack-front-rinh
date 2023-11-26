export const PROJECT_KEYS = {
  all: ["projects"],
  lists: () => [...PROJECT_KEYS.all, "list"],
  list: (meta) => [...PROJECT_KEYS.lists(), meta],
};

export const COLUMN_KEYS = {
  all: [...PROJECT_KEYS.all, "columns"],
  list: (projectId) => [...COLUMN_KEYS.all, projectId],
};

export function projectListQuery(api, meta) {
  return {
    queryKey: PROJECT_KEYS.list(meta),
    queryFn: ({ queryKey }) => api.projects.getAll(queryKey[2]),
  };
}

export function columnListQuery(api, projectId) {
  return {
    queryKey: COLUMN_KEYS.list(projectId),
    queryFn: ({ queryKey }) => api.projects.getColumns(queryKey[2]),
  };
}
