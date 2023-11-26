import TaskView from "./views/task-view/task-view.vue";
import { columnListLoader, projectListLoader } from "@/modules/project/loader";

function load(context) {
  projectListLoader(context);
  columnListLoader(context);
}

export default [
  {
    path: "/join/:projectId",
    name: "join",
    component: () => import("./views/join-view/join-view.vue"),
  },
  {
    path: "/",
    name: "tasks",
    component: TaskView,
    meta: { requiresAuth: true, load },
  },
  {
    path: "/wiki",
    name: "wiki",
    component: () => import("./views/wiki-view/wiki-view.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/graph",
    name: "graph",
    component: () => import("./views/graphs-view/graph-view.vue"),
    meta: { requiresAuth: true },
  }
];
