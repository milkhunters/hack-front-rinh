const PROJECT_KEYS = {
  all: [{ scope: "projects" }],
  list: (meta) => [{ ...PROJECT_KEYS.all[0], entity: "list", meta }],
};

export function projectListQuery(api, meta) {
  return {
    queryKey: PROJECT_KEYS.list(meta),
    queryFn: ({ queryKey: [{ meta }] }) => api.projects.getAll(meta),
  };
}
