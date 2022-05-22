<template>
  <section class="d-flex justify-content-center align-items-center vh-100">
    <div class="signin">
      <img src="../assets/images/signin.png" class="d-none d-xl-block me-10" />
      <VForm
        class="signinForm"
        v-slot="{ errors, meta }"
        @submit="signIn"
        ref="form"
      >
        <img src="../assets/images/MetaWall.png" class="mx-auto" />
        <h1 class="mb-9 text-center h3">到元宇宙展開全新社交圈</h1>
        <div class="mb-4">
          <VField
            type="email"
            id="email"
            name="電子信箱"
            placeholder="請輸入電子信箱"
            class="form-control"
            :class="{ 'is-invalid': errors['電子信箱'] }"
            rules="email|required"
            v-model="user.email"
            required
          ></VField>
          <error-message
            name="電子信箱"
            class="invalid-feedback text-danger"
          ></error-message>
        </div>
        <div class="mb-8">
          <VField
            type="password"
            id="password"
            placeholder="請輸入密碼"
            name="密碼"
            class="form-control"
            :class="{ 'is-invalid': errors['密碼'] }"
            rules="required|password:8"
            v-model="user.password"
            required
          ></VField>
          <error-message
            name="密碼"
            class="invalid-feedback text-danger"
          ></error-message>
        </div>
        <button
          type="submit"
          class="effectBtn btn btn-primary w-100 mb-4"
          :disabled="!meta.valid"
        >
          登入
        </button>
        <router-link to="/signup" class="link-dark mb-4 text-center"
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
      </VForm>
    </div>
  </section>
</template>

<script>
export default {
  name: "SignInView",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    signIn() {
      // loading 效果 - 啟用
      // this.$emitter.emit("toggle-loading", true);
      // loading 效果 - 關閉
      // this.$emitter.emit("toggle-loading", false);

      // 傳送 toast 訊息
      // this.$pushMessage({
      //   style: "dark",
      //   content: "登入成功",
      // });
      this.$refs.form.resetForm();
      this.$router.push("/");
    },
  },
};
</script>
