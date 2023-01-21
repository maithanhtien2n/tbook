import { createRouter, createWebHistory } from "vue-router";
import App from "../App.vue";

import RoutesHome from "../views/home/services/routes";
import RoutesMood from "../views/mood/services/routes";
import RoutesPhoto from "../views/photo/services/routes";
import RoutesVideo from "../views/video/services/routes";
import RoutesSearch from "../views/search/services/routes";

const routes = [
  {
    path: "/",
    name: "app",
    component: App,
    meta: {},
    children: [
      ...RoutesHome,
      ...RoutesMood,
      ...RoutesPhoto,
      ...RoutesVideo,
      ...RoutesSearch,
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../pages/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active",
});

export default router;
