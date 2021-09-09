import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
// import Cabinet from "../views/Cabinet";
// import UserOthers from "../views/UserOthers";
// import NotFound from "../views/NotFound";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Главная",
    component: () => import(/* webpackChunkName: "Home" */ "../views/Home.vue"),
    meta: {
      layout: "main",
      useInMenu: true,
      requiresAuth: true,
    },
  },
  {
    path: "/cabinet/",
    name: "Личный кабинет",
    component: () =>
      import(/* webpackChunkName: "Cabinet" */ "../views/Cabinet"),
    meta: {
      layout: "main",
      useInMenu: true,
      requiresAuth: true,
    },
    children: [
      {
        path: "other",
        name: "Другое",
        component: () =>
          import(/* webpackChunkName: "UserOthers" */ "../views/UserOthers"),
      },
    ],
  },
  {
    path: "/auth/",
    name: "авторизация",
    component: () =>
      import(/* webpackChunkName: "Auth" */ "../views/Auth/Auth"),
    meta: {
      // layout: "empty",
      useInMenu: false,
      requiresAuth: false,
      layout: "empty",
    },
  },
  {
    path: "/404",
    alias: "*",
    name: "404",
    component: () =>
      import(/* webpackChunkName: "NotFound" */ "../views/NotFound"),
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
