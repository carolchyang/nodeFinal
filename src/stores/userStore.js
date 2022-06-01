import { defineStore } from "pinia";
import {
  apiGetProfile,
  apiUpdateProfile,
  apiUpdatePassword,
} from "@/scripts/api";
import statusStore from "./statusStore";
import modalStore from "./modalStore";

const status = statusStore();
const modal = modalStore();

export default defineStore("userStore", {
  state: () => {
    return {
      profile: {
        name: "",
        photo: "",
        gender: "",
        _id: "",
      },
      // 個人資料頁面 - 個人資料暫存表格
      tempProfile: {
        name: "",
        photo: "",
        gender: "",
      },
      // 個人資料頁面 - 密碼暫存表格
      tempPassword: {
        password: "",
        passwordConfirm: "",
      },
    };
  },
  actions: {
    // 取得用戶資料
    getProfile() {
      status.isLoading = true;
      apiGetProfile()
        .then((res) => {
          const data = res.data.data;
          this.updateProfileData(data);
          status.isLoading = false;
        })
        .catch((err) => {
          status.pushMessage({
            style: "danger",
            content:
              err.response.data.message || "取得個人資料失敗，請重新登入",
          });
          status.isLoading = false;
        });
    },
    // 更新個人資料
    updateProfile() {
      status.toggleLoading(true);
      apiUpdateProfile(this.tempProfile)
        .then((res) => {
          const data = res.data.data.user;

          // 更新用戶 data 資料
          this.updateProfileData(data);

          // 開啟 msgModal 提示訊息
          modal.toggleMsgModal({
            title: "更新個人資料",
            content: "已成功更新您的個人資料~",
          });
          status.toggleLoading(false);
        })
        .catch((err) => {
          status.pushMessage({
            style: "danger",
            content: err.response.data.message || "更新失敗",
          });
          status.toggleLoading(false);
        });
    },
    // 更新密碼
    updatePassword(form) {
      status.toggleLoading(true);
      apiUpdatePassword(this.tempPassword)
        .then(() => {
          // 開啟 msgModal 提示訊息
          modal.toggleMsgModal({
            title: "更新密碼成功",
            content: "下次登入記得使用新密碼喔~",
          });

          // 清空密碼表格
          form.resetForm();
          status.toggleLoading(false);
        })
        .catch((err) => {
          status.pushMessage({
            style: "danger",
            content: err.response.data.message || "更新密碼失敗",
          });
          status.toggleLoading(false);
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
