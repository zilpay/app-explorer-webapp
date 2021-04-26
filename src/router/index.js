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
    path: "/my-apps",
    name: "MyApps",
    component: () => import("@/views/MyApps")
  },
  {
    path: "/submit",
    name: "Submit",
    component: () => import("@/views/Submit")
  },
  {
    path: "/app/:id/:owner",
    name: "App",
    component: () => import("@/views/App")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
