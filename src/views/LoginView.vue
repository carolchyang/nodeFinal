<template>
  <section class="d-flex justify-content-center align-items-center vh-100">
    <div class="login">
      <img src="../assets/images/login.png" class="d-none d-xl-block me-10" />
      <form class="loginForm">
        <img src="../assets/images/MetaWall.png" class="mx-auto" />
        <h3 class="mb-9 text-center">到元宇宙展開全新社交圈</h3>
        <div class="mb-4">
          <input type="email" class="form-control" placeholder="Email" />
          <small class="text-danger"></small>
        </div>
        <div class="mb-8">
          <input type="password" class="form-control" placeholder="Password" />
          <small class="text-danger"></small>
        </div>
        <router-link
          to="/"
          class="hoverBtn btn btn-primary w-100 mb-4 border-dark rounded-2 shadow"
          >登入</router-link
        >
        <router-link to="/register" class="text-center hoverLink"
          >註冊帳號</router-link
        >
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: "LoginView",
};
</script>
