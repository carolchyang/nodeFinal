import { defineStore } from "pinia";
import { bsModal } from "@/scripts/methods";

export default defineStore("modalStore", {
  state: () => {
    return {
      modal: {
        type: "",
        id: "",
        title: "",
        content: "",
      },
    };
  },
  actions: {
    // 開啟 DelModal
    toggleDelModal(item) {
      this.modal = item;
      this.bsModal = bsModal("delModal");
      this.bsModal.show();
    },
    // 開啟 MsgModal
    toggleMsgModal(item) {
      this.modal = item;
      this.bsModal = bsModal("msgModal");
      this.bsModal.show();
    },
    // 重置 DelModal
    closeDelModal() {
      this.modal = {
        type: "",
        id: "",
        title: "",
        content: "",
      };
      this.bsModal.hide();
    },
  },
});
