<template>
  <section class="d-flex justify-content-center align-items-center vh-100">
    <div class="login">
      <img src="../assets/images/login.png" class="d-none d-xl-block me-10" />
      <VForm
        class="loginForm"
        v-slot="{ errors, meta }"
        @submit="signIn"
        ref="form"
      >
        <img src="../assets/images/MetaWall.png" class="mx-auto" />
        <h1 class="mb-9 text-center h3">註冊</h1>
        <div class="mb-4">
          <VField
            type="nickname"
            id="nickname"
            name="暱稱"
            placeholder="暱稱"
            class="form-control"
            :class="{ 'is-invalid': errors['暱稱'] }"
            rules="required|min:2"
            v-model="user.nickname"
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
            placeholder="Email"
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
            placeholder="Password"
            name="密碼"
            class="form-control"
            :class="{ 'is-invalid': errors['密碼'] }"
            rules="required|min:8"
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
        <router-link to="/login" class="link-dark text-center"
          >登入</router-link
        >
      </VForm>
    </div>
  </section>
</template>

<script>
export default {
  name: "RegisterView",
  data() {
    return {
      user: {
        nickname: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    signIn() {
      this.$refs.form.resetForm();
      this.$router.push("/");
    },
  },
};
</script>
