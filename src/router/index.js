import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "login",
      path: "/",
      component: () => import("../components/login-vue.vue"),
    },
  ],
});

export default router;
