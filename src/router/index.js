import { createRouter, createWebHashHistory } from "vue-router";
import { pushMessage, getToken, clearToken } from "@/scripts/methods";

const routes = [
  {
    path: "/",
    component: () => import("../views/LayoutView.vue"),
    children: [
      {
        path: "",
        name: "DynamicWallView",
        component: () => import("../views/front/DynamicWallView.vue"),
        meta: {
          title: "動態牆",
        },
      },
      {
        path: "personalwall",
        name: "PersonalWallView",
        component: () => import("../views/front/PersonalWallView.vue"),
        meta: {
          title: "個人牆",
        },
      },
      {
        path: "likepost",
        name: "LikePostView",
        component: () => import("../views/front/LikePostView.vue"),
        meta: {
          title: "按讚貼文",
        },
      },
      {
        path: "track",
        name: "TrackView",
        component: () => import("../views/front/TrackView.vue"),
        meta: {
          title: "追蹤名單",
        },
      },
      {
        path: "profile",
        name: "ProfileView",
        component: () => import("../views/front/ProfileView.vue"),
        meta: {
          title: "個人資料",
        },
      },
      {
        path: "createpost",
        name: "CreatePostView",
        component: () => import("../views/front/CreatePostView.vue"),
        meta: {
          title: "新增貼文",
        },
      },
    ],
  },
  {
    path: "/signin",
    name: "SignInView",
    component: () => import("../views/SignInView.vue"),
    meta: {
      title: "登入",
    },
  },
  {
    path: "/signup",
    name: "SignUpView",
    component: () => import("../views/SignUpView.vue"),
    meta: {
      title: "註冊",
    },
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

router.beforeEach((to) => {
  document.title = to.meta.title ? to.meta.title : "一加一等於 11";

  const token = getToken();

  if (token == "" && to.name !== "SignInView" && to.name !== "SignUpView") {
    clearToken();
    pushMessage({
      style: "danger",
      content: "請確認登入狀態",
    });
    return { name: "SignInView" };
  }
});

export default router;
