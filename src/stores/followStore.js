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

      await apiGetFollow(tempData)
        .then((res) => {
          this.follows = res.data.data.data;
          this.getFollowArray();
        })
        .catch((err) => {
          status.pushMessage({
            style: "danger",
            content: err.response?.data?.message || "取得追蹤名單失敗",
          });
        });
    },
    // 新增追蹤
    // 此 ID 為 被追蹤者 ID
    async createFollow(id) {
      await apiCreateFollow({ targetUserId: id })
        .then(() => {
          status.pushMessage({
            style: "dark",
            content: "已追蹤",
          });
        })
        .catch((err) => {
          status.pushMessage({
            style: "danger",
            content: err.response?.data?.message || "新增追蹤失敗",
          });
        });
    },
    // 取消追蹤
    // 此 ID 為 追蹤 ID
    async delFollow(id) {
      await apiDelFollow(id)
        .then(() => {
          status.pushMessage({
            style: "dark",
            content: "取消追蹤成功",
          });
        })
        .catch((err) => {
          status.pushMessage({
            style: "danger",
            content: err.response?.data?.message || "取消追蹤失敗",
          });
        });
    },
    // 取得追蹤 ID、被追蹤者 ID
    getFollowArray() {
      const array = [];
      this.follows.forEach((item) => {
        array.push({
          // 此追蹤 ID
          followId: item._id,
          // 被追蹤者 ID
          targetUserId: item.targetUserId._id,
        });
      });
      this.followArray = array;
    },
  },
});
