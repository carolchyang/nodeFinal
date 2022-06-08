import router from "@/router";
import { defineStore } from "pinia";
import { apiGetPosts, apiCreatePost, apiDelPost } from "@/scripts/api";
import statusStore from "./statusStore";
import modalStore from "./modalStore";

const status = statusStore();
const modal = modalStore();

export default defineStore("postStore", {
  state: () => {
    return {
      posts: [],
      pagination: {},
    };
  },
  actions: {
    // 取得貼文
    async getPosts(data) {
      // 使用 tempData 處理傳入的參數，避免傳進空值造成錯誤
      let tempData = data || {};
      tempData = {
        // 每頁筆數(預設值 10)
        pageCount: 5,
        // 第幾頁
        page: data?.page || 1,
        // 排序類型(預設值 1) 1發文時間
        sort: 1,
        // 排序順序 1 新到舊 0 舊到新
        reverse: data?.reverse == 0 ? 0 : 1,
        // 關鍵字篩選 若沒有則返回所有貼文
        content: data?.content,
      };

      // 指定使用者
      if (data?.userId) {
        tempData.userId = data.userId;
        // 指定貼文
      } else if (data?.postId) {
        tempData.postId = data.postId;
      }

      await apiGetPosts(tempData)
        .then((res) => {
          console.log("apiGetPosts :>> ", res.data.data.data);
          this.posts = res.data.data.data;
          this.pagination = res.data.data.pagination;
        })
        .catch((err) => {
          status.pushMessage({
            style: "danger",
            content: err.response?.data?.message || "取得貼文失敗",
          });
        });
    },
    // 建立貼文
    async createPost(data) {
      await apiCreatePost(data)
        .then(() => {
          status.pushMessage({
            style: "dark",
            content: "已建立貼文",
          });
          router.push("/");
        })
        .catch((err) => {
          status.pushMessage({
            style: "danger",
            content: err.response?.data?.message || "建立貼文失敗",
          });
        });
    },
    // 刪除貼文
    async delPost(id) {
      await apiDelPost(id)
        .then(() => {
          /**
           * 在動態牆執行刪除貼文
           * 會執行 this.getPosts() 重新獲取 post 資料
           */
          modal.closeDelModal();
          status.pushMessage({
            style: "dark",
            content: "刪除貼文成功",
          });
        })
        .catch((err) => {
          modal.closeDelModal();
          status.pushMessage({
            style: "danger",
            content: err.response?.data?.message || "刪除貼文失敗",
          });
        });
    },
  },
});
