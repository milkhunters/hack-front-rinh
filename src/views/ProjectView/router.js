import ProjectView from "./project-view.vue";

async function getProjects() {}

export default {
  path: "/projects",
  name: "projects",
  component: ProjectView,
  meta: { requiresAuth: true, load: getProjects },
};
