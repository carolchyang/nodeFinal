import { defineStore } from "pinia";
import { apiGetFollow, apiCreateFollow, apiDelFollow } from "@/scripts/api";
import statusStore from "./statusStore";

const status = statusStore();

export default defineStore("followStore", {
  state: () => {
    return {
      follows: [],
      followArray: [],
    };
  },
  actions: {
    // 取得追蹤名單
    async getFollows(data) {
      // 使用 tempData 處理傳入的參數，避免傳進空值造成錯誤
      let tempData = data || {};
      tempData = {
        // 每頁筆數(預設值 10)
        pageCount: 100,
        // 第幾頁
        page: data?.page || 1,
        // 排序順序 1 新到舊 0 舊到新
        reverse: data?.reverse == 0 ? 0 : 1,
      };

      status.isLoading = true;
      await apiGetFollow(tempData)
        .then((res) => {
          this.follows = res.data.data.data;
          this.getFollowArray();
          status.isLoading = false;
        })
        .catch((err) => {
          status.pushMessage({
            style: "danger",
            content: err.response?.data?.message || "取得追蹤名單失敗",
          });
          status.isLoading = false;
        });
    },
    // 新增追蹤
    async createFollow(id) {
      status.isLoading = true;
      await apiCreateFollow({ targetUserId: id })
        .then(() => {
          this.getFollows();
          status.pushMessage({
            style: "dark",
            content: "已追蹤",
          });
          status.isLoading = false;
        })
        .catch((err) => {
          status.pushMessage({
            style: "danger",
            content: err.response?.data?.message || "新增追蹤失敗",
          });
          status.isLoading = false;
        });
    },
    // 取消追蹤
    async delFollow(id) {
      status.isLoading = true;
      await apiDelFollow(id)
        .then(() => {
          this.getFollows();
          status.pushMessage({
            style: "dark",
            content: "取消追蹤成功",
          });
          status.isLoading = false;
        })
        .catch((err) => {
          status.pushMessage({
            style: "danger",
            content: err.response?.data?.message || "取消追蹤失敗",
          });
          status.isLoading = false;
        });
    },
    // 取得追蹤 id、被追蹤者 id
    getFollowArray() {
      const array = [];
      this.follows.forEach((item) => {
        array.push({
          followId: item._id,
          targetUserId: item.targetUserId._id,
        });
      });
      this.followArray = array;
    },
  },
});
