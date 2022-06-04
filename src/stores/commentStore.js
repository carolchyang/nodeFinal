import { defineStore } from "pinia";
import { apiGetComments, apiCreateComment, apiDelComment } from "@/scripts/api";
import statusStore from "./statusStore";
import modalStore from "./modalStore";

const status = statusStore();
const modal = modalStore();

export default defineStore("commentStore", {
  state: () => {
    return {
      comments: [],
    };
  },
  actions: {
    // 取得回覆
    async getComments() {
      status.isLoading = true;
      await apiGetComments()
        .then((res) => {
          this.comments = res.data.data;
          status.isLoading = false;
        })
        .catch((err) => {
          status.pushMessage({
            style: "danger",
            content: err.response.data.message || "取得回覆失敗",
          });
          status.isLoading = false;
        });
    },
    // 建立回覆
    async createComment(data) {
      status.isLoading = true;
      await apiCreateComment(data)
        .then(() => {
          this.getComments();
          status.pushMessage({
            style: "dark",
            content: "已建立貼文",
          });
          status.isLoading = false;
        })
        .catch((err) => {
          status.pushMessage({
            style: "danger",
            content: err.response.data.message || "建立回覆失敗",
          });
          status.isLoading = false;
        });
    },
    // 刪除回覆
    async delComment(id) {
      status.isLoading = true;
      await apiDelComment(id)
        .then(() => {
          this.getComments();
          modal.closeDelModal();
          status.pushMessage({
            style: "dark",
            content: "刪除回覆成功",
          });
          status.isLoading = false;
        })
        .catch((err) => {
          modal.closeDelModal();
          status.pushMessage({
            style: "danger",
            content: err.response.data.message || "刪除回覆失敗",
          });
          status.isLoading = false;
        });
    },
  },
});
