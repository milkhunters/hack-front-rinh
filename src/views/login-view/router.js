import LoginView from "./login-view.vue";

export default {
  path: "/login",
  name: "login",
  component: LoginView,
  meta: { requiresAuth: false, load: null },
};
