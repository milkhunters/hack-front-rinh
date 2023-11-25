import { createRouter, createWebHistory } from "vue-router";
import project from "@/views/project-view/router";
import task from "@/views/task-view/router";
import login from "@/views/login-view/router.js";
import register from "@/views/registration-view/router.js";

const auth = true;

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: auth ? [project, task] : [login, register],
});

export default router;
