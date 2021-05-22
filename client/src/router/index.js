import { createRouter, createWebHistory } from "vue-router";
import Landing from "../views/Landing.vue";
import MyHome from "../views/MyHome.vue";

const routes = [
  {
    path: "/",
    name: "landing",
    component: Landing,
  },
  {
    path: "/myhome/:id",
    name: "myHome",
    component: MyHome,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
