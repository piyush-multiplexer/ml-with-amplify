import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "auth",
      path: "/",
      component: () => import("../components/amplify-auth.vue"),
    },
    {
      name: "process-data",
      path: "/process-data",
      component: () => import("../components/process-data.vue"),
    },
  ],
});

export default router;
