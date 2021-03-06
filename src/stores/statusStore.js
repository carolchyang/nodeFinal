import { defineStore } from "pinia";

export default defineStore("statusStore", {
  state: () => ({
    messages: [],
    // 全部 loading
    isLoading: false,
    // 局部 loading
    partLoading: {
      id: "",
      type: "",
    },
  }),
  actions: {
    // 開啟 Toast
    showToast() {
      setTimeout(() => {
        this.messages.shift();
      }, 3000);
    },
    // 關閉 Toast
    clearToast(index) {
      this.messages.splice(index, 1);
    },
    // 新增 Toast
    pushMessage(data) {
      const { style = "dark", content } = data;
      this.messages.push({ style, content });
      this.showToast();
    },
    // 切換 loading
    toggleLoading(status) {
      this.isLoading = status;
    },
    // 切換 partLoading 狀態
    togglePartLoading(id, type) {
      this.partLoading = {
        id,
        type,
      };
    },
  },
});
