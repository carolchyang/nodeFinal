import { defineStore } from "pinia";
import { apiGetLikePosts, apiClickLike, apiDelLike } from "@/scripts/api";
import statusStore from "./statusStore";
import userStore from "./userStore";

const status = statusStore();
const user = userStore();

export default defineStore("likeStore", {
  state: () => {
    return {
      likes: [],
    };
  },
  actions: {
    // 取得按讚
    async getLikes(data) {
      const id = user.profile._id;

      // 使用 tempData 處理傳入的參數，避免傳進空值造成錯誤
      let tempData = data || {};
      tempData = {
        // 每頁筆數(預設值 10)
        pageCount: 100,
        // 第幾頁
        page: data?.page || 1,
        // 排序順序 0 新到舊 1 舊到新
        reverse: 0,
      };

      status.isLoading = true;
      await apiGetLikePosts(id, tempData)
        .then((res) => {
          this.likes = res.data.data.likes;
          status.isLoading = false;
        })
        .catch((err) => {
          status.pushMessage({
            style: "danger",
            content: err.response?.data?.message || "取得按讚失敗",
          });
          status.isLoading = false;
        });
    },
    // 按讚
    async clickLike(id) {
      status.isLoading = true;
      await apiClickLike(id)
        .then(() => {
          status.pushMessage({
            style: "dark",
            content: "已按讚",
          });
          status.isLoading = false;
        })
        .catch((err) => {
          status.pushMessage({
            style: "danger",
            content: err.response?.data?.message || "按讚失敗",
          });
          status.isLoading = false;
        });
    },
    // 取消按讚
    async delLike(id, nowPage) {
      status.isLoading = true;
      await apiDelLike(id)
        .then(() => {
          // 若為 likePost 頁面
          if (nowPage == "likePage") {
            this.getLikes();
          }
          status.pushMessage({
            style: "dark",
            content: "取消按讚成功",
          });
          status.isLoading = false;
        })
        .catch((err) => {
          status.pushMessage({
            style: "danger",
            content: err.response?.data?.message || "取消按讚失敗",
          });
          status.isLoading = false;
        });
    },
  },
});
