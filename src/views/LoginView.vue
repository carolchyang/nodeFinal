<template>
  <section class="d-flex justify-content-center align-items-center vh-100">
    <div class="login">
      <img src="../assets/images/login.png" class="d-none d-xl-block me-10" />
      <form class="loginForm">
        <img src="../assets/images/MetaWall.png" class="mx-auto" />
        <h1 class="mb-9 text-center h3">到元宇宙展開全新社交圈</h1>
        <div class="mb-4">
          <input type="email" class="form-control" placeholder="Email" />
          <small class="text-danger"></small>
        </div>
        <div class="mb-8">
          <input type="password" class="form-control" placeholder="Password" />
          <small class="text-danger"></small>
        </div>
        <a
          href="#"
          class="effectBtn btn btn-primary w-100 mb-4"
          @click.prevent="login"
        >
          登入
        </a>
        <router-link to="/register" class="link-dark mb-4 text-center"
          >註冊帳號</router-link
        >

        <hr />
        <a href="" class="link-dark mb-4">
          <i class="bi bi-facebook text-primary me-4"></i>
          使用 Facebook 繼續
        </a>
        <a href="#" class="link-dark mb-4">
          <i class="bi bi-google text-primary me-4"></i>
          使用 Google 繼續
        </a>
        <a href="#" class="link-dark">
          <i class="bi bi-line text-success me-4"></i>
          使用 Line 繼續
        </a>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: "LoginView",
  methods: {
    login() {
      // loading 效果
      this.$emitter.emit("toggle-loading", true);
      this.$emitter.emit("toggle-loading", false);

      // 開啟 toast
      this.$pushMessage({
        style: "dark",
        content: "登入成功",
      });

      this.$router.push("/");
    },
  },
};
</script>
