import { createRouter, createWebHistory } from "vue-router";
import Landing from "../views/Landing.vue";
import MyHome from "../views/MyHome.vue";

const routes = [
  {
    path: "/",
    name: "Landing",
    component: Landing,
  },
  {
    path: "/myhome/:id",
    name: "MyHome",
    component: MyHome,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
