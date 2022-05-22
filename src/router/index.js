import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../views/LayoutView.vue"),
    children: [
      {
        path: "",
        name: "DynamicWallView",
        component: () => import("../views/front/DynamicWallView.vue"),
      },
      {
        path: "personalwall",
        name: "PersonalWallView",
        component: () => import("../views/front/PersonalWallView.vue"),
      },
      {
        path: "likepost",
        name: "LikePostView",
        component: () => import("../views/front/LikePostView.vue"),
      },
      {
        path: "track",
        name: "TrackView",
        component: () => import("../views/front/TrackView.vue"),
      },
      {
        path: "profile",
        name: "ProfileView",
        component: () => import("../views/front/ProfileView.vue"),
      },
      {
        path: "createpost",
        name: "CreatePostView",
        component: () => import("../views/front/CreatePostView.vue"),
      },
    ],
  },
  {
    path: "/signin",
    name: "SignInView",
    component: () => import("../views/SignInView.vue"),
  },
  {
    path: "/signup",
    name: "SignUpView",
    component: () => import("../views/SignUpView.vue"),
  },
  {
    path: "/:pathMath(.*)*",
    component: () => import("../views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
