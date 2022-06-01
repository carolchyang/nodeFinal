import { defineStore } from "pinia";

export default defineStore("statusStore", {
  state: () => ({
    messages: [],
    isLoading: false,
  }),
  actions: {
    showToast() {
      setTimeout(() => {
        this.messages.shift();
      }, 3000);
    },
    clearToast(index) {
      this.messages.splice(index, 1);
    },
    pushMessage(data) {
      const { style = "dark", content } = data;
      this.messages.push({ style, content });
      this.showToast();
    },
    toggleLoading(status) {
      this.isLoading = status;
    },
  },
});
