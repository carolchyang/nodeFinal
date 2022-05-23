<template>
  <section class="d-flex justify-content-center align-items-center vh-100">
    <div class="signin">
      <img src="../assets/images/signin.png" class="d-none d-xl-block me-10" />
      <VForm
        class="signinForm"
        v-slot="{ errors, meta }"
        @submit="signUp"
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
            rules="required|min:2"
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
import { apiUserSignUp } from "@/scripts/api";

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
    signUp() {
      this.$emitter.emit("toggle-loading", true);
      apiUserSignUp(this.user)
        .then((res) => {
          this.$refs.form.resetForm();

          this.$emitter.emit("toggle-loading", false);
          this.$pushMessage({
            style: "dark",
            content: "註冊成功",
          });

          const { token } = res.data.data;
          this.$setToken(token);

          this.$router.push("/");
        })
        .catch((err) => {
          this.$emitter.emit("toggle-loading", false);
          this.$pushMessage({
            style: "danger",
            content: err.response.data.message || "註冊失敗",
          });
        });
    },
  },
};
</script>
