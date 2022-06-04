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
        id="profileForm"
        enctype="multipart/form-data"
        @submit="submitProfile"
        ref="profileForm"
      >
        <div
          class="bgCoverRounded mx-auto mb-4"
          :style="{ backgroundImage: 'url(' + tempImg.photo + ')' }"
          v-if="tempImg.photo"
        ></div>
        <div
          class="bgCoverRounded mx-auto mb-4"
          :style="{ backgroundImage: 'url(' + profile.photo + ')' }"
          v-else-if="profile.photo"
        ></div>
        <div
          class="bgCoverRounded mx-auto mb-4"
          :class="{ profileUserPhoto: !tempImg.photo }"
          v-else
        ></div>
        <div class="fileBtn text-center mb-4">
          <label for="photo">上傳大頭照</label>
          <input
            type="file"
            accept="image/*"
            id="photo"
            name="photo"
            @change="uploadFile"
          />
          <small class="d-block mt-2 text-danger">{{ tempImg.msg }}</small>
        </div>
        <div class="mb-4">
          <label for="nickname" class="form-label">暱稱</label>
          <VField
            type="text"
            id="name"
            placeholder="請輸入暱稱"
            name="name"
            class="form-control"
            :class="{ 'is-invalid': errors['name'] }"
            rules="nickanem:8"
            v-model="tempProfile.name"
            required
          ></VField>
          <error-message
            name="name"
            class="invalid-feedback text-danger"
          ></error-message>
        </div>
        <div class="mb-8">
          <h3 class="mb-2 h5 fw-normal">性別</h3>
          <div class="form-check form-check-inline me-6">
            <VField
              type="radio"
              id="male"
              name="gender"
              class="form-check-input"
              value="male"
              v-model="tempProfile.gender"
            ></VField>

            <label class="form-check-label" for="male">男生</label>
          </div>
          <div class="form-check form-check-inline">
            <VField
              type="radio"
              id="female"
              name="gender"
              class="form-check-input"
              value="female"
              v-model="tempProfile.gender"
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
        @submit="submitPassword"
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
import statusStore from "@/stores/statusStore";
import userStore from "@/stores/userStore";
import modalStore from "@/stores/modalStore";

export default {
  name: "ProfileView",
  data() {
    return {
      tempImg: {
        photo: this.profile?.photo || "",
        msg: "",
      },
    };
  },
  methods: {
    // 更新密碼
    submitPassword() {
      // 取得 password 的 form 表單
      const form = this.$refs.passwordForm;
      this.updatePassword(form);
    },
    // 瀏覽圖片
    uploadFile(e) {
      // 先清空圖片資料

      this.tempImg = {
        photo: this.profile?.photo || "",
        msg: "",
      };
      // 取得上傳的檔案
      const file = e.target.files[0];
      // 篩選圖片格式及大小
      if (file) {
        const { size, type } = file;
        if (!type.startsWith("image/")) {
          this.tempImg.msg = "請確認圖片格式";
        } else if (size > 1048576) {
          this.tempImg.msg = "圖片檔案不能超過 1 MB";
        } else {
          // 放入瀏覽圖
          this.tempImg.photo = URL.createObjectURL(file);
        }
      }
    },
    // 切換表單
    toggleForm(name) {
      if (name == "profile") {
        this.$refs.profileForm.resetForm();
        this.tempImg = {
          photo: this.profile?.photo || "",
          msg: "",
        };
        this.getProfile();
      } else {
        this.$refs.passwordForm.resetForm();
      }
    },
    // 建立貼文
    submitProfile() {
      const formData = new FormData(document.getElementById("profileForm"));
      this.updateProfile(formData);
    },
    ...mapActions(statusStore, ["pushMessage", "toggleLoading"]),
    ...mapActions(userStore, ["getProfile", "updateProfile", "updatePassword"]),
    ...mapActions(modalStore, ["toggleMsgModal"]),
  },
  computed: {
    ...mapState(userStore, ["profile", "tempProfile", "tempPassword"]),
    ...mapState(modalStore, ["modal"]),
  },
  components: {
    MsgModalComponent,
  },
};
</script>

<style lang="scss">
.profileUserPhoto {
  background-image: url("@/assets/images/user_default.png");
}
</style>
