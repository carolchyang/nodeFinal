import { defineStore } from "pinia";
import {
  apiGetComments,
  apiCreateComment,
  apiDelComment,
  socket,
} from "@/scripts/api";
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
      await apiGetComments()
        .then((res) => {
          this.comments = res.data.data;
        })
        .catch((err) => {
          status.pushMessage({
            style: "danger",
            content: err.response?.data?.message || "取得回覆失敗",
          });
        });
    },
    // 建立回覆
    async createComment(data) {
      await apiCreateComment(data)
        .then((res) => {
          status.pushMessage({
            style: "dark",
            content: "已建立回覆",
          });
          socket.emit("createComment", res.data.data);
        })
        .catch((err) => {
          status.pushMessage({
            style: "danger",
            content: err.response?.data?.message || "建立回覆失敗",
          });
        });
    },
    // 刪除回覆
    async delComment(id) {
      await apiDelComment(id)
        .then(() => {
          modal.closeDelModal();
          status.pushMessage({
            style: "dark",
            content: "刪除回覆成功",
          });
          // TODO 等 api 修改回傳值 postId, commentId
          // socket.emit("deleteComment", { postId, commentId: id });
        })
        .catch((err) => {
          modal.closeDelModal();
          status.pushMessage({
            style: "danger",
            content: err.response?.data?.message || "刪除回覆失敗",
          });
        });
    },
  },
});
