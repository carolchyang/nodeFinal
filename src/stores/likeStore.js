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

      await apiGetLikePosts(id, tempData)
        .then((res) => {
          this.likes = res.data.data.likes;
        })
        .catch((err) => {
          status.pushMessage({
            style: "danger",
            content: err.response?.data?.message || "取得按讚失敗",
          });
        });
    },
    // 按讚
    async clickLike(id) {
      await apiClickLike(id)
        .then(() => {
          status.pushMessage({
            style: "dark",
            content: "已按讚",
          });
        })
        .catch((err) => {
          status.pushMessage({
            style: "danger",
            content: err.response?.data?.message || "按讚失敗",
          });
        });
    },
    // 取消按讚
    async delLike(id) {
      await apiDelLike(id)
        .then(() => {
          status.pushMessage({
            style: "dark",
            content: "取消按讚成功",
          });
        })
        .catch((err) => {
          status.pushMessage({
            style: "danger",
            content: err.response?.data?.message || "取消按讚失敗",
          });
        });
    },
  },
});
