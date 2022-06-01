import { defineStore } from "pinia";
import { bsModal } from "@/scripts/methods";

export default defineStore("modalStore", {
  state: () => {
    return {
      modal: {
        title: "",
        content: "",
      },
    };
  },
  actions: {
    toggleDelModal(item) {
      this.modal.title = item;
      this.bsModal = bsModal("delModal");
      this.bsModal.show();
    },
    toggleMsgModal(item) {
      this.modal = item;
      this.bsModal = bsModal("msgModal");
      this.bsModal.show();
    },
  },
});
