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
        @click="toggleForm('profile')"
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
        @click="toggleForm('password')"
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
      <VForm
        v-slot="{ errors, meta }"
        @submit="updateProfile"
        ref="profileForm"
      >
        <div
          class="bgCoverRounded mx-auto mb-4"
          :style="{ backgroundImage: 'url(' + tempImg.photo + ')' }"
          v-if="tempImg.photo"
        ></div>
        <div
          class="bgCoverRounded mx-auto mb-4"
          :class="{ profileUserPhoto: !tempImg.photo }"
          v-else
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
            rules=""
            v-model="profile.name"
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
              value="male"
              v-model="profile.gender"
            ></VField>

            <label class="form-check-label" for="male">男生</label>
          </div>
          <div class="form-check form-check-inline">
            <VField
              type="radio"
              id="female"
              name="性別"
              class="form-check-input"
              value="female"
              v-model="profile.gender"
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
        @submit="updatePassword"
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
            v-model="tempPassword.password"
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
import {
  apiUserProfile,
  apiUserUpdateProfile,
  apiUserUpdatePassword,
} from "@/scripts/api";

export default {
  name: "ProfileView",
  data() {
    return {
      profile: {
        name: "",
        photo: "",
        gender: "",
      },
      tempPassword: {
        password: "",
        passwordConfirm: "",
      },
      tempImg: {
        photo: "",
        msg: "",
      },
    };
  },
  methods: {
    // 取得個人資料
    getProfile() {
      this.$emitter.emit("toggle-loading", true);
      apiUserProfile()
        .then((res) => {
          const data = res.data.data;
          this.profile = {
            name: data.name,
            photo: data.photo,
            gender: data.gender,
          };
          this.$emitter.emit("toggle-loading", false);
        })
        .catch((err) => {
          this.$pushMessage({
            style: "danger",
            content: err.response.data.message || "取得個人資料失敗",
          });
          this.$emitter.emit("toggle-loading", false);
        });
    },
    // 更新個人資料
    updateProfile() {
      this.$emitter.emit("toggle-loading", true);
      apiUserUpdateProfile(this.profile)
        .then((res) => {
          const data = res.data.data.user;
          this.profile = {
            name: data.name,
            photo: data.photo,
            gender: data.gender,
          };
          this.$pushMessage({
            style: "dark",
            content: "更新成功",
          });
          this.$emitter.emit("toggle-loading", false);
        })
        .catch((err) => {
          this.$pushMessage({
            style: "danger",
            content: err.response.data.message || "更新失敗",
          });
          this.$emitter.emit("toggle-loading", false);
        });
    },
    // 更新密碼
    updatePassword() {
      apiUserUpdatePassword(this.tempPassword)
        .then(() => {
          this.$pushMessage({
            style: "dark",
            content: "更新密碼成功",
          });
          this.resetForm("password");
          this.$emitter.emit("toggle-loading", false);
        })
        .catch((err) => {
          this.$emitter.emit("toggle-loading", false);
          this.$pushMessage({
            style: "danger",
            content: err.response.data.message || "更新密碼失敗",
          });
        });
    },
    // 上傳圖片
    uploadFile(e) {
      this.tempImg = {
        photo: "",
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
          this.tempImg.photo = URL.createObjectURL(file);
          this.tempImg.msg = "";
        }
      }
    },
    // 切換表單
    toggleForm(name) {
      if (name == "profile") {
        this.tempImg = {
          photo: "",
          msg: "",
        };
        this.getProfile();
      } else {
        this.$refs.passwordForm.resetForm();
      }
    },
  },
  mounted() {
    this.getProfile();
  },
};
</script>

<style lang="scss">
.profileUserPhoto {
  background-image: url("@/assets/images/user_default.png");
}
</style>
