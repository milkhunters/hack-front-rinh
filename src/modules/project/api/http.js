import makeApiRequest from "@/common/api/http/make-api-request";

export async function getAll() {
  const result = await makeApiRequest("/project/project/list", "GET");
  return result.succeed ? result.content : [];
}

export async function create(data) {
  return await makeApiRequest("/project/project/new", "POST", { data });
}

export async function createJoinLink(projectId) {
  return await makeApiRequest(`/project/project/${projectId}/invite`, "POST");
}

export async function join(inviteId) {
  return await makeApiRequest(`/project/project/invite/${inviteId}/accept`, "POST");
}

export async function createColumn({ projectId, title }) {
  return await makeApiRequest(`/kanban/column/new?project_id=${projectId}`, "POST", {
    data: { title },
  });
}

export async function getColumns(projectId) {
  const result = await makeApiRequest(`/kanban/column/list?project_id=${projectId}`, "GET");
  return result.succeed ? result.content : [];
}

export async function createTask({ columnId, ...data }) {
  return await makeApiRequest(`/kanban/task/new?column_id=${columnId}`, "POST", { data });
}
