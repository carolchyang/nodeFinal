<template>
  <section class="d-flex justify-content-center align-items-center vh-100 mx-3">
    <div class="signin">
      <img src="../assets/images/signin.png" class="d-none d-xl-block me-10" />
      <VForm
        class="signinForm"
        v-slot="{ errors, meta }"
        @submit="submitSignup"
        ref="form"
      >
        <img src="../assets/images/MetaWall.png" class="mx-auto" />
        <h1 class="mb-9 text-center h3">註冊</h1>
        <div class="mb-4">
          <VField
            type="name"
            id="name"
            name="暱稱"
            placeholder="請輸入暱稱"
            class="form-control"
            :class="{ 'is-invalid': errors['暱稱'] }"
            rules="required"
            v-model="user.name"
            required
          ></VField>
          <error-message
            name="暱稱"
            class="invalid-feedback text-danger"
          ></error-message>
        </div>
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
          註冊
        </button>
        <router-link to="/signin" class="link-dark text-center">
          登入
        </router-link>
      </VForm>
    </div>
  </section>
</template>

<script>
import { mapActions } from "pinia";
import userStore from "@/stores/userStore";

export default {
  name: "SignUpView",
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    // 註冊
    submitSignup() {
      const form = this.$refs.form;
      this.signUp(form, this.user);
    },
    ...mapActions(userStore, ["signUp"]),
  },
};
</script>
