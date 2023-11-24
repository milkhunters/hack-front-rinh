import { createRouter, createWebHistory } from "vue-router";
import project from "@/views/project-view/router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    project
  ],
});

export default router;
