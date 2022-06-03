import { defineStore } from "pinia";
import { apiGetFollow, apiAddFollow, apiDelFollow } from "@/scripts/api";
import statusStore from "./statusStore";
import userStore from "./userStore";

const status = statusStore();
const user = userStore();

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
        // 排序類型(預設值 1) 1發文時間
        sort: 1,
        // 指定使用者
        userId: data?.userId,
      };

      status.isLoading = true;
      await apiGetFollow(tempData)
        .then((res) => {
          console.log(res);
          this.follows = res.data.data;
          this.getFollowArray();
          status.isLoading = false;
        })
        .catch((err) => {
          status.pushMessage({
            style: "danger",
            content: err.response.data.message || "取得追蹤名單失敗",
          });
          status.isLoading = false;
        });
    },
    getFollowArray() {
      const array = [];
      this.follows.forEach((item) => {
        if (item.userId._id == user.profile?._id) {
          array.push(item);
        }
      });
      this.follows = array;
    },
    // 新增追蹤
    async addFollow(id) {
      status.isLoading = true;
      await apiAddFollow(id)
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
            content: err.response.data.message || "新增追蹤失敗",
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
            content: err.response.data.message || "取消追蹤失敗",
          });
          status.isLoading = false;
        });
    },
  },
});
