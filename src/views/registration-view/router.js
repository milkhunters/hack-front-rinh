import RegisterView from "./registration-view.vue";

export default {
  path: "/register",
  name: "register",
  component: RegisterView,
  meta: { requiresAuth: true, load: null },
};
