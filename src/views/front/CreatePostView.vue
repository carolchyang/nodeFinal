<template>
  <h1 class="header">張貼動態</h1>

  <VForm
    v-slot="{ errors, meta }"
    class="card p-md-8"
    @submit="post"
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
        rules="required|min:5|max:200"
        v-model="tempPost.content"
        as="textarea"
      ></VField>
      <error-message
        name="貼文內容"
        class="invalid-feedback text-danger"
      ></error-message>
    </div>
    <div class="fileBtn mb-4">
      <label for="file" class="rounded-1">上傳圖片</label>
      <input class="" type="file" id="file" />
    </div>

    <img src="../../assets/images/image1.png" class="bgCover mb-8" />

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
export default {
  name: "CreatePostView",
  data() {
    return {
      tempPost: {
        content: "",
      },
    };
  },
  methods: {
    post() {
      this.$refs.postForm.resetForm();
    },
  },
};
</script>
