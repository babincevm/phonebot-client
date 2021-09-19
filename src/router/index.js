import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Profile from "../views/Cabinet/Profile";
import UserOthers from "../views/UserOthers";
import NotFound from "../views/NotFound";
import UIFormComponents from "@/views/UI/UIFormComponents";
import ChildRouterView from "@/views/ChildRouterView";
import Authorization from "@/views/Auth/Authorization";
import Diagnosis from "@/views/Diagnosis/Diagnosis";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      layout: "main",
      useInMenu: true,
      requiresAuth: true,
      menuText: "Главная",
    },
  },
  {
    path: "/cabinet",
    component: ChildRouterView,
    meta: {
      layout: "main",
      useInMenu: true,
      requiresAuth: true,
      menuText: "Личный кабинет",
    },
    children: [
      {
        path: "",
        name: "cabinet.profile",
        component: Profile,
        meta: {
          menuText: "Профиль",
        },
      },
      {
        path: "diagnosis",
        name: "cabinet.quiz",
        component: Diagnosis,
        meta: {
          menuText: "Диагностика",
        },
      },
      {
        path: "other",
        name: "cabinet.other",
        component: UserOthers,
        meta: {
          menuText: "Другое",
        },
      },
    ],
  },
  {
    path: "/auth",
    name: "auth",
    component: Authorization,
    meta: {
      requiresAuth: false,
      layout: "empty",
    },
  },
  {
    path: "/ui",
    name: "components",
    component: ChildRouterView,
    meta: {
      useInMenu: true,
      requiresAuth: false,
      layout: "main",
      menuText: "Компоненты",
    },
    children: [
      {
        path: "",
        name: "components.index",
        component: UIFormComponents,
        meta: {
          menuText: "Формы",
        },
      },
    ],
  },
  {
    path: "/404",
    alias: "*",
    name: "404",
    component: NotFound,
    meta: {
      useInMenu: false,
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// router.beforeEach((to, from, next) => {
//   if (!to.meta.requiresAuth) return next();
//
//   if (to.path !== "/auth/") return next("/auth/");
//   return next();
// });

export default router;
