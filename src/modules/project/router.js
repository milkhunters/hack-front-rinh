import ProjectView from "./views/project-view/project-view.vue";
import JoinView from "./views/join-view/join-view.vue";
import { projectListLoader } from "./loader";

export default [
  {
    path: "/projects",
    name: "projects",
    component: ProjectView,
    meta: { requiresAuth: true, load: projectListLoader },
  },
  {
    path: "/join/:projectId",
    name: "join",
    component: JoinView,
  },
];
