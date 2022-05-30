import { defineStore } from "pinia";
import { apiGetProfile } from "@/scripts/api";
import statusStore from "./statusStore";

const status = statusStore();

export default defineStore("userStore", {
  state: () => {
    return {
      profile: {
        name: "",
        photo: "",
        gender: "",
        _id: "",
      },
    };
  },
  actions: {
    // 取得用戶資料
    getProfile() {
      apiGetProfile()
        .then((res) => {
          this.profile = res.data.data;
        })
        .catch((err) => {
          status.pushMessage({
            style: "danger",
            content:
              err.response.data.message || "取得個人資料失敗，請重新登入",
          });
        });
    },
  },
});
