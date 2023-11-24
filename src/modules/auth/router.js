import LoginView from "./views/login-view/login-view.vue";
import RegistrationView from "./views/registration-view/registration-view.vue";

export default [
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "register",
    component: RegistrationView,
  },
];
