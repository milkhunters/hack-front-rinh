export async function getAll() {
  return [{ id: "1", title: "Some Title" }];
}

export async function join(projectId) {
  const succeed = projectId === "1";
  return { succeed };
}
