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
      name: "text-summary",
      path: "/text-summary",
      component: () => import("../components/text-summary.vue"),
    },
  ],
});

export default router;
