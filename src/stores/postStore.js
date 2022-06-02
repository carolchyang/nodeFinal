import router from "@/router";
import { defineStore } from "pinia";
import { apiCreatePost } from "@/scripts/api";
import statusStore from "./statusStore";

const status = statusStore();

export default defineStore("postStore", {
  state: () => {
    return {
      posts: [],
      pagination: {},
    };
  },
  actions: {
    // 建立貼文
    createPost(data) {
      status.isLoading = true;
      apiCreatePost(data)
        .then(() => {
          status.pushMessage({
            style: "dark",
            content: "已建立貼文",
          });
          router.push("/");
          status.isLoading = false;
        })
        .catch((err) => {
          status.pushMessage({
            style: "danger",
            content: err.response.data.message || "建立貼文失敗",
          });
          status.isLoading = false;
        });
    },
  },
});
