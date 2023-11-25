import { projectListLoader, taskListLoader } from "./loader";

export default [
  {
    path: "/projects",
    name: "projects",
    component: () => import("./views/project-view/project-view.vue"),
    meta: { requiresAuth: true, load: projectListLoader },
  },
  {
    path: "/join/:projectId",
    name: "join",
    component: () => import("./views/join-view/join-view.vue"),
  },
  {
    path: "/tasks",
    name: "tasks",
    component: () => import("./views/task-view/task-view.vue"),
    meta: { requiresAuth: true, load: taskListLoader },
  },
  {
    path: "/wiki",
    name: "wiki",
    component: () => import("./views/wiki-view/wiki-view.vue"),
    meta: { requiresAuth: true, load: taskListLoader },
  },
];
