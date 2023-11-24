import ProjectView from "./project-view.vue";
import { projectListLoader } from "./loader";

export default {
  path: "/projects",
  name: "projects",
  component: ProjectView,
  meta: { requiresAuth: true, load: projectListLoader },
};
