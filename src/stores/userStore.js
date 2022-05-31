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
      // 個人資料頁面暫存表格
      tempProfile: {
        name: "",
        photo: "",
        gender: "",
      },
    };
  },
  actions: {
    // 取得用戶資料
    getProfile() {
      apiGetProfile()
        .then((res) => {
          const data = res.data.data;
          this.updateProfileData(data);
        })
        .catch((err) => {
          status.pushMessage({
            style: "danger",
            content:
              err.response.data.message || "取得個人資料失敗，請重新登入",
          });
        });
    },
    // 更新用戶 data 資料
    updateProfileData(data) {
      this.profile = data;
      this.tempProfile = {
        name: data.name,
        photo: data.photo,
        gender: data.gender,
      };
    },
  },
});
