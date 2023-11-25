export default [
  {
    path: "/login",
    name: "login",
    component: () => import("./views/login-view/login-view.vue"),
    meta: { requiresGuest: true },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./views/registration-view/registration-view.vue"),
    meta: { requiresGuest: true },
  },
  {
    path: "/confirm",
    name: "confirm",
    component: () => import("./views/confirmation-view/confirmation-view.vue"),
    meta: { requiresGuest: true },
  },
];
