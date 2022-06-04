import router from "@/router";
import { defineStore } from "pinia";
import {
  apiGetProfile,
  apiUpdateProfile,
  apiUpdatePassword,
  apiForgetPassword,
  apiModifyPassword,
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
      //個人牆頁面設置
      personInfo: {
        name: "",
        photo: "",
        _id: "",
      },
    };
  },
  actions: {
    // 取得用戶資料
    async getProfile() {
      status.isLoading = true;
      await apiGetProfile()
        .then((res) => {
          this.profile = res.data.data;
          this.updateProfileData(this.profile);
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
    async updateProfile(data) {
      status.toggleLoading(true);
      await apiUpdateProfile(data)
        .then((res) => {
          this.profile = res.data.data.user;

          // 更新用戶 data 資料
          this.updateProfileData(this.profile);

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
    async updatePassword(form) {
      status.toggleLoading(true);
      await apiUpdatePassword(this.tempPassword)
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
    // 寄信重設 Email
    async sendForgetEmail(data) {
      status.toggleLoading(true);
      await apiForgetPassword(data)
        .then(() => {
          // 開啟 msgModal 提示訊息
          modal.toggleMsgModal({
            title: "信件已寄出，請收取郵件",
            content: "請至信箱收取重設密碼信，若 1 天內沒收到信再請嘗試一次~",
          });

          status.toggleLoading(false);
        })
        .catch((err) => {
          modal.toggleMsgModal({
            title: "驗證信箱失敗",
            content: err.response.data.message || "驗證信箱失敗，再請確認信箱",
          });
          status.toggleLoading(false);
        });
    },
    // 重設密碼 - 收取郵件
    async modifyPassword(token, data) {
      status.toggleLoading(true);
      await apiModifyPassword(token, data)
        .then(() => {
          // 開啟 msgModal 提示訊息
          modal.toggleMsgModal({
            title: "重設密碼成功",
            content: "請使用新密碼登入喔~",
          });

          router.push("/sigin");
          status.toggleLoading(false);
        })
        .catch((err) => {
          modal.toggleMsgModal({
            title: "重設密碼失敗",
            content: err.response.data.message || "重設密碼失敗",
          });
          status.toggleLoading(false);
        });
    },
    // 更新用戶 data 資料
    updateProfileData(data) {
      this.tempProfile = {
        name: data.name,
        photo: data.photo,
        gender: data.gender,
      };
    },
    togglePersonInfo(data) {
      this.personInfo = data;
    },
  },
});
