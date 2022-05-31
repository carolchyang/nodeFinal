<template>
  <h1 class="header">張貼動態</h1>

  <VForm
    v-slot="{ errors, meta }"
    class="card p-md-8"
    @submit="submitPost"
    ref="postForm"
  >
    <div class="mb-4">
      <label for="content" class="form-label">貼文內容</label>
      <VField
        type="text"
        id="content"
        placeholder="輸入您的貼文內容"
        name="貼文內容"
        class="form-control"
        :class="{ 'is-invalid': errors['貼文內容'] }"
        rows="5"
        rules="required|max:200"
        v-model="tempPost.content"
        as="textarea"
      ></VField>
      <error-message
        name="貼文內容"
        class="invalid-feedback text-danger"
      ></error-message>
    </div>
    <div class="fileBtn mb-4" :class="{ 'mb-8': tempImg == '' }">
      <label for="file" class="rounded-1">上傳圖片</label>
      <input
        type="file"
        accept="image/*"
        id="file"
        ref="uploadFile"
        @change="uploadFile"
      />
      <small class="ms-4 text-danger">{{ tempImg.msg }}</small>
    </div>
    <div
      class="bgCover mb-8"
      :style="{ backgroundImage: 'url(' + tempImg.url + ')' }"
      v-if="tempImg.url"
    ></div>

    <div class="text-center">
      <button
        type="submit"
        class="effectBtn btn btn-primary w-100"
        :disabled="!meta.valid"
      >
        送出貼文
      </button>
    </div>
  </VForm>
</template>

<script>
import { mapActions } from "pinia";
import postStore from "@/stores/postStore";

export default {
  name: "CreatePostView",
  data() {
    return {
      tempPost: {
        content: "",
        imageId: "",
      },
      tempImg: {
        url: "",
        msg: "",
      },
    };
  },
  methods: {
    // 建立貼文
    submitPost() {
      this.createPost(this.tempPost);
    },
    // 上傳檔案
    uploadFile(e) {
      this.tempImg = {
        url: "",
        msg: "",
      };
      const file = e.target.files[0];
      if (file) {
        const { size, type } = file;
        if (!type.startsWith("image/")) {
          this.tempImg.msg = "請確認圖片格式";
          this.tempImg.url = "";
        } else if (size > 102400) {
          this.tempImg.msg = "圖片檔案不能超過 100 KB";
          this.tempImg.url = "";
        } else {
          this.tempImg.url = URL.createObjectURL(file);
          this.tempImg.msg = "";
        }
      }
    },
    ...mapActions(postStore, ["createPost"]),
  },
};
</script>
