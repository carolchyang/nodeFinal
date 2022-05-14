<template>
  <section class="d-flex justify-content-center align-items-center vh-100">
    <div class="login">
      <img src="../assets/images/login.png" class="d-none d-xl-block me-10" />
      <form class="loginForm">
        <img src="../assets/images/MetaWall.png" class="mx-auto" />
        <h1 class="mb-9 text-center h3">註冊</h1>
        <div class="mb-4">
          <input type="text" class="form-control" placeholder="暱稱" />
          <small class="text-danger">暱稱至少 2 個字元以上</small>
        </div>
        <div class="mb-4">
          <input type="email" class="form-control" placeholder="Email" />
          <small class="text-danger">帳號已被註冊，請替換新的 Email！</small>
        </div>
        <div class="mb-8">
          <input type="password" class="form-control" placeholder="Password" />
          <small class="text-danger">密碼需至少 8 碼以上，並中英混合</small>
        </div>
        <router-link
          to="/"
          class="effectBtn btn btn-primary w-100 mb-4 disabled"
          >註冊</router-link
        >
        <router-link to="/login" class="link-dark text-center"
          >登入</router-link
        >
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: "RegisterView",
};
</script>
