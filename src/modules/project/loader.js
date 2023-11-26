import { columnListQuery, projectListQuery } from "./queries";

export const PROJECTS_PREFETCH_COUNT = 15;

export function projectListLoader({ api, queryClient }) {
  const query = projectListQuery(api, {
    pagination: { page: 0, perPage: PROJECTS_PREFETCH_COUNT },
  });
  queryClient.ensureQueryData(query);
}

export function columnListLoader({ api, queryClient, route }) {
  const projectId = route.query.id;
  if (!projectId) return;
  const query = columnListQuery(api, route.query.id);
  queryClient.ensureQueryData(query);
}
