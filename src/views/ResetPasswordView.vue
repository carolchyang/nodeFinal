<template>
  <section class="d-flex justify-content-center align-items-center vh-100">
    <div class="signin">
      <img src="../assets/images/signin.png" class="d-none d-xl-block me-10" />
      <VForm
        class="signinForm"
        v-slot="{ errors, meta }"
        @submit="submit"
        ref="form"
      >
        <img src="../assets/images/MetaWall.png" class="mx-auto" />
        <h1 class="mb-2 text-center h3">重設密碼</h1>
        <p class="mb-8 text-center fs-4">請從新設定你的密碼</p>
        <div class="mb-9">
          <VField
            type="password"
            id="password"
            placeholder="請輸入密碼"
            name="密碼"
            class="form-control"
            :class="{ 'is-invalid': errors['密碼'] }"
            rules="required|password:8"
            v-model="tempPassword.password"
            required
          ></VField>
          <error-message
            name="密碼"
            class="invalid-feedback text-danger"
          ></error-message>
        </div>
        <div class="mb-10">
          <VField
            type="password"
            id="confirmed"
            placeholder="請再次輸入密碼"
            name="確認密碼"
            class="form-control"
            :class="{ 'is-invalid': errors['確認密碼'] }"
            rules="required|confirmed:@密碼"
            v-model="tempPassword.passwordConfirm"
            required
          ></VField>
          <error-message
            name="確認密碼"
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
      </VForm>
    </div>
  </section>

  <MsgModalComponent>
    <template #default>
      <h3 class="mb-5">{{ modal.title }}</h3>
      <p class="text-gray-700">{{ modal.content }}</p>
    </template>
  </MsgModalComponent>
</template>

<script>
import MsgModalComponent from "@/components/MsgModalComponent.vue";
import { mapState, mapActions } from "pinia";
import modalStore from "@/stores/modalStore";
import userStore from "@/stores/userStore";

export default {
  name: "ResetPasswordView",
  data() {
    return {
      tempPassword: {
        password: "",
        passwordConfirm: "",
      },
    };
  },
  methods: {
    // 送出重設密碼表單
    submit() {
      this.modifyPassword(this.token, this.tempPassword);
    },
    ...mapActions(userStore, ["modifyPassword"]),
  },
  computed: {
    ...mapState(modalStore, ["modal"]),
  },
  components: {
    MsgModalComponent,
  },
  created() {
    this.token = this.$route.params.token;
  },
};
</script>
