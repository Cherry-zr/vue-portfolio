import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue")
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue")
  },
  {
    path: "/skills",
    name: "skills",
    component: () => import("../views/SkillsView.vue")
  },
  {
    path: "/projects",
    name: "projects",
    component: () => import("../views/ProjectsView.vue")
  },
  {
    path: "/projects/:slug",
    name: "project-detail",
    component: () => import("../views/ProjectDetailView.vue")
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("../views/ContactView.vue")
  },
  {
    path: "/demo/campus-market",
    name: "campus-demo",
    component: () => import("../views/DemoCampusMarketView.vue")
  },
  {
    path: "/demo/campus-market/goods/:id",
    name: "campus-goods-detail",
    component: () => import("../views/DemoCampusGoodsDetailView.vue")
  },
  {
    path: "/demo/campus-market/publish",
    name: "campus-publish",
    component: () => import("../views/DemoCampusPublishView.vue")
  },
  {
    path: "/demo/campus-market/profile",
    name: "campus-profile",
    component: () => import("../views/DemoCampusProfileView.vue")
  },
  {
    path: "/demo/campus-market/auth",
    name: "campus-auth",
    component: () => import("../views/DemoCampusAuthView.vue")
  },
  {
    path: "/demo/hotel",
    name: "hotel-demo",
    component: () => import("../views/DemoHotelView.vue")
  },
  {
    path: "/demo/movie-analysis",
    name: "movie-demo",
    component: () => import("../views/DemoMovieAnalysisView.vue")
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/"
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

export default router;
