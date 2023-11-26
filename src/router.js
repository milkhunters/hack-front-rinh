import { createRouter, createWebHistory } from "vue-router";
import auth from "@/modules/auth/router";
import project from "@/modules/project/router";
import useUserStore from "@/modules/auth/stores/use-user-store";

export default function createRoutes(context) {
  const userStore = useUserStore();

  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [...auth, ...project],
  });

  router.beforeEach((to) => {
    if (to.meta?.load) {
      to.meta.load({ route: to, ...context });
    }

    if (to.meta.requiresAuth && !userStore.user) {
      return { name: "login" };
    }

    if (to.meta.requiresGuest && userStore.user) {
      return { name: "tasks" };
    }
  });

  return router;
}
