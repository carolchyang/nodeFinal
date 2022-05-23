<template>
  <div v-if="checkSuccess">
    <NavbarComponent @sign-out="signOut"></NavbarComponent>
    <main class="container py-11">
      <div class="row">
        <div class="col-12 col-lg-8">
          <router-view></router-view>
        </div>

        <div class="col-lg-4">
          <AsideComponent></AsideComponent>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import NavbarComponent from "@/components/NavbarComponent";
import AsideComponent from "@/components/AsideComponent";

export default {
  name: "LayoutView",
  data() {
    return {
      checkSuccess: false,
    };
  },
  methods: {
    checkSignIn() {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)nodeFinal\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );

      if (token) {
        this.checkSuccess = true;
        this.$http.defaults.headers.common.Authorization = token;
      } else {
        this.checkSuccess = false;
        this.$pushMessage({
          style: "danger",
          content: "請先登入",
        });
        this.$router.push("/signin");
      }
    },
    signOut() {
      document.cookie = "nodeFinal=;expires=;path=/";
      this.checkSuccess = false;
      this.$router.push("/signin");
    },
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
