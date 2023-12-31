import { createRouter, createWebHistory } from "vue-router";
import auth from "@/modules/auth/router";
import project from "@/modules/project/router";

export default function createRoutes(context) {
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [...auth, ...project],
  });

  router.beforeEach((to) => {
    if (to.meta?.load) {
      to.meta.load({ route: to, ...context });
    }
  });

  return router;
}
