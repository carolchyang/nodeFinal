<template>
  <div v-if="checkSuccess">
    <NavbarComponent
      @sign-out="signOut"
      :user-info="userInfo"
    ></NavbarComponent>
    <main class="container py-11">
      <div class="row">
        <div class="col-12 col-lg-8">
          <router-view :user-info="userInfo"></router-view>
        </div>

        <div class="col-lg-4">
          <AsideComponent :user-info="userInfo"></AsideComponent>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import NavbarComponent from "@/components/NavbarComponent";
import AsideComponent from "@/components/AsideComponent";
import { mapActions } from "pinia";
import statusStore from "@/stores/statusStore";
import { getToken, clearToken } from "@/scripts/methods";
import { apiGetProfile } from "@/scripts/api";

export default {
  name: "LayoutView",
  data() {
    return {
      checkSuccess: false,
      userInfo: {},
    };
  },
  methods: {
    // 確認登入狀態
    checkSignIn() {
      // 取得 cookie 中的 token
      const token = getToken();

      // 若有 token 則登入，反之轉為登入頁面
      if (token) {
        this.checkSuccess = true;
        this.$http.defaults.headers.common.Authorization = `Bearer ${token}`;

        // 取得用戶資料
        this.getProfile();
      } else {
        this.checkSuccess = false;
        this.pushMessage({
          style: "danger",
          content: "請先登入",
        });
        this.$router.push("/signin");
      }
    },
    // 登出
    signOut() {
      clearToken();
      this.checkSuccess = false;
      this.$router.push("/signin");
    },
    // 取得用戶資料
    getProfile() {
      this.$emitter.emit("toggle-loading", true);
      apiGetProfile()
        .then((res) => {
          this.userInfo = res.data.data;
          this.$emitter.emit("toggle-loading", false);
        })
        .catch((err) => {
          this.pushMessage({
            style: "danger",
            content:
              err.response.data.message || "取得個人資料失敗，請重新登入",
          });
          this.$emitter.emit("toggle-loading", false);
        });
    },
    ...mapActions(statusStore, ["pushMessage"]),
  },
  created() {
    this.checkSignIn();
  },
  components: {
    NavbarComponent,
    AsideComponent,
  },
};
</script>
