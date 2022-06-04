<template>
  <div v-if="checkSuccess">
    <NavbarComponent @sign-out="signOut"></NavbarComponent>
    <main class="container py-11">
      <div class="row">
        <div class="col-12 col-lg-8">
          <router-view :key="$route.fullPath"></router-view>
        </div>

        <div class="col-lg-4 position-relative">
          <AsideComponent></AsideComponent>
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
import userStore from "@/stores/userStore";
import { getToken, clearToken } from "@/scripts/methods";

export default {
  name: "LayoutView",
  data() {
    return {
      checkSuccess: false,
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
    ...mapActions(statusStore, ["pushMessage"]),
    ...mapActions(userStore, ["getProfile"]),
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
