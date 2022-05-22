<template>
  <h1 class="header">修改個人資料</h1>

  <nav class="navTab">
    <div class="nav nav-tabs" id="nav-tab" role="tablist">
      <button
        class="nav-link active"
        id="nav-profile-tab"
        data-bs-toggle="tab"
        data-bs-target="#nav-profile"
        type="button"
        role="tab"
        aria-controls="nav-profile"
        aria-selected="true"
        @click="resetForm('password')"
      >
        修改資料
      </button>
      <button
        class="nav-link"
        id="nav-password-tab"
        data-bs-toggle="tab"
        data-bs-target="#nav-password"
        type="button"
        role="tab"
        aria-controls="nav-password"
        aria-selected="false"
        @click="resetForm('profile')"
      >
        重設密碼
      </button>
    </div>
  </nav>
  <div class="tab-content navTabContent" id="nav-tabContent">
    <div
      class="tab-pane fade show active px-4 py-8 px-md-8"
      id="nav-profile"
      role="tabpanel"
      aria-labelledby="nav-profile-tab"
    >
      <VForm v-slot="{ errors, meta }" @submit="resetProfile" ref="profileForm">
        <div
          class="bgCoverRounded mx-auto mb-4"
          :style="{ backgroundImage: 'url(' + tempImg.url + ')' }"
          v-if="tempImg.url"
        ></div>
        <div class="fileBtn text-center mb-4">
          <label for="file">上傳大頭照</label>
          <input
            type="file"
            accept="image/*"
            id="file"
            ref="uploadFile"
            @change="uploadFile"
          />
          <small class="d-block mt-2 text-danger">{{ tempImg.msg }}</small>
        </div>
        <div class="mb-4">
          <label for="nickname" class="form-label">暱稱</label>
          <VField
            type="text"
            id="nickname"
            placeholder="請輸入暱稱"
            name="暱稱"
            class="form-control"
            :class="{ 'is-invalid': errors['暱稱'] }"
            rules="required|min:2"
            v-model="newProfile.nickname"
            required
          ></VField>
          <error-message
            name="暱稱"
            class="invalid-feedback text-danger"
          ></error-message>
        </div>
        <div class="mb-8">
          <h3 class="mb-2 h5 fw-normal">性別</h3>
          <div class="form-check form-check-inline me-6">
            <VField
              type="radio"
              id="male"
              name="性別"
              class="form-check-input"
              rules="required"
              value="male"
              v-model="newProfile.gender"
            ></VField>

            <label class="form-check-label" for="male">男生</label>
          </div>
          <div class="form-check form-check-inline">
            <VField
              type="radio"
              id="female"
              name="性別"
              class="form-check-input"
              rules="required"
              value="female"
              v-model="newProfile.gender"
            ></VField>
            <label class="form-check-label" for="female">女生</label>
          </div>
        </div>
        <small class="d-block mb-4 text-center text-danger"></small>

        <button
          type="submit"
          class="effectBtn btn btn-primary w-100"
          :disabled="!meta.valid"
        >
          送出更新
        </button>
      </VForm>
    </div>
    <div
      class="tab-pane fade px-4 py-8 px-md-8"
      id="nav-password"
      role="tabpanel"
      aria-labelledby="nav-password-tab"
    >
      <VForm
        v-slot="{ errors, meta }"
        @submit="resetPassword"
        ref="passwordForm"
      >
        <div class="mb-4">
          <label for="password" class="form-label">密碼</label>
          <VField
            type="password"
            id="password"
            placeholder="請輸入密碼"
            name="密碼"
            class="form-control"
            :class="{ 'is-invalid': errors['密碼'] }"
            rules="required|password:8"
            v-model="newPassword.password"
            required
          ></VField>
          <error-message
            name="密碼"
            class="invalid-feedback text-danger"
          ></error-message>
        </div>
        <div class="mb-8">
          <label for="confirmed" class="form-label">確認密碼</label>
          <VField
            type="password"
            id="confirmed"
            placeholder="請再次輸入密碼"
            name="確認密碼"
            class="form-control"
            :class="{ 'is-invalid': errors['確認密碼'] }"
            rules="required|confirmed:@密碼"
            v-model="newPassword.confirmed"
            required
          ></VField>
          <error-message
            name="確認密碼"
            class="invalid-feedback text-danger"
          ></error-message>
        </div>
        <button
          type="submit"
          class="effectBtn btn btn-primary w-100"
          :disabled="!meta.valid"
        >
          重設密碼
        </button>
      </VForm>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileView",
  data() {
    return {
      newPassword: {
        password: "",
        confirmed: "",
      },
      newProfile: {
        nickname: "",
        gender: "",
      },
      tempImg: {
        url: require("@/assets/images/user_default.png"),
        msg: "",
      },
    };
  },
  methods: {
    uploadFile(e) {
      this.tempImg = {
        url: require("@/assets/images/user_default.png"),
        msg: "",
      };
      const file = e.target.files[0];
      if (file) {
        const { size, type } = file;
        if (!type.startsWith("image/")) {
          this.tempImg.msg = "請確認圖片格式";
        } else if (size > 102400) {
          this.tempImg.msg = "圖片檔案不能超過 100 KB";
        } else {
          this.tempImg.url = URL.createObjectURL(file);
          this.tempImg.msg = "";
        }
      }
    },
    resetProfile() {
      this.resetForm("profile");
    },
    resetPassword() {
      this.resetForm("password");
    },
    resetForm(name) {
      const formName = `${name}Form`;
      this.$refs[formName].resetForm();

      if (name == "profile") {
        this.tempImg = {
          url: require("@/assets/images/user_default.png"),
          msg: "",
        };
      }
    },
  },
};
</script>
