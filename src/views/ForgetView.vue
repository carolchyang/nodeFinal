<template>
  <section class="d-flex justify-content-center align-items-center vh-100">
    <div class="signin">
      <img src="../assets/images/signin.png" class="d-none d-xl-block me-10" />
      <VForm
        class="signinForm"
        v-slot="{ errors, meta }"
        @submit="checkAccount"
        ref="form"
      >
        <img src="../assets/images/MetaWall.png" class="mx-auto" />
        <h1 class="mb-4 text-center h3">忘記密碼</h1>
        <p class="mb-10 text-center fs-4">請輸入你的電子信箱</p>
        <div class="mb-9">
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
        <button
          type="submit"
          class="effectBtn btn btn-primary w-100 mb-10"
          :disabled="!meta.valid"
        >
          送出
        </button>

        <div class="text-end">
          <router-link to="/signin" class="link-primary d-inline-block">
            返回登入頁
          </router-link>
        </div>
      </VForm>
    </div>
  </section>
</template>

<script>
export default {
  name: "SignUpView",
  data() {
    return {
      user: {
        email: "",
      },
    };
  },
  methods: {
    // 驗證帳號
    checkAccount() {
      this.$refs.form.resetForm();
    },
  },
};
</script>
