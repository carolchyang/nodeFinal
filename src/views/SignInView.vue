<template>
  <section class="d-flex justify-content-center align-items-center vh-100">
    <div class="signin">
      <img src="../assets/images/signin.png" class="d-none d-xl-block me-10" />
      <VForm
        class="signinForm"
        v-slot="{ errors, meta }"
        @submit="submitSignin"
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
        <router-link to="/signup" class="link-dark mb-10 text-center">
          註冊帳號
        </router-link>

        <div class="text-end">
          <router-link to="/forget" class="link-primary d-inline-block">
            忘記密碼
          </router-link>
        </div>

        <hr class="mt-2" />
        <a href="#" class="link-dark">
          <i class="bi bi-line text-success me-4"></i>
          使用 Line 繼續
        </a>
      </VForm>
    </div>
  </section>
</template>

<script>
import { mapActions } from "pinia";
import userStore from "@/stores/userStore";

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
    // 登入
    submitSignin() {
      const form = this.$refs.form;
      this.signIn(form, this.user);
    },
    ...mapActions(userStore, ["signIn"]),
  },
};
</script>
