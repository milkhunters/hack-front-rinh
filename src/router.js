import { createRouter, createWebHistory } from "vue-router";
import project from "@/modules/project/router";

export default function createRoutes(context) {
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      project
    ],
  });

  router.beforeEach((to) => {
    if (to.meta.load) to.meta.load(context);
  });

  return router;
}
