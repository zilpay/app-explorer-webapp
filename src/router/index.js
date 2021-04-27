import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home")
  },
  {
    path: "/apps/:id",
    name: "Apps",
    component: () => import("@/views/Apps")
  },
  {
    path: "/submit",
    name: "Submit",
    component: () => import("@/views/Submit")
  },
  {
    path: "/submit-app",
    name: "SubmitApp",
    component: () => import("@/views/SubmitApp")
  },
  {
    path: "/app/:id/:owner",
    name: "App",
    component: () => import("@/views/App")
  },
  {
    path: "/add-ad",
    name: "SubmitAd",
    component: () => import("@/views/SubmitAd")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
