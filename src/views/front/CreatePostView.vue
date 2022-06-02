<template>
  <h1 class="header">張貼動態</h1>

  <form
    id="form"
    class="card p-md-8"
    enctype="multipart/form-data"
    @submit.prevent="submitPost"
  >
    <div class="mb-4">
      <label for="content" class="form-label">貼文內容</label>
      <textarea
        name="content"
        id="content"
        class="form-control"
        rows="5"
        placeholder="輸入您的貼文內容"
      ></textarea>
    </div>
    <div class="fileBtn mb-4" :class="{ 'mb-8': tempImg.url == '' }">
      <label for="img" class="rounded-1">上傳圖片</label>
      <input
        type="file"
        accept="image/*"
        id="img"
        name="img"
        @change="uploadFile"
      />
      <small class="ms-4 text-danger">{{ tempImg.msg }}</small>
    </div>
    <div
      class="bgCover position-relative mb-8"
      :style="{ backgroundImage: 'url(' + tempImg.url + ')' }"
      v-if="tempImg.url"
    >
      <a href="#" class="cardCloseBtn" @click.prevent="resetImg">
        <i class="bi bi-x-lg"></i>
      </a>
    </div>

    <div class="text-center">
      <button type="submit" class="effectBtn btn btn-primary w-100">
        送出貼文
      </button>
    </div>
  </form>
</template>

<script>
import { mapActions } from "pinia";
import postStore from "@/stores/postStore";

export default {
  name: "CreatePostView",
  data() {
    return {
      tempImg: {
        url: "",
        msg: "",
      },
    };
  },
  methods: {
    // 建立貼文
    submitPost() {
      const formData = new FormData(document.getElementById("form"));
      this.createPost(formData);
    },
    // 瀏覽圖片
    uploadFile(e) {
      // 先清空圖片資料

      this.resetImg();
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
          this.tempImg.url = URL.createObjectURL(file);
        }
      }
    },
    resetImg() {
      this.tempImg = {
        url: "",
        msg: "",
      };
    },
    ...mapActions(postStore, ["createPost"]),
  },
};
</script>

<style lang="scss" scoped>
.cardCloseBtn {
  color: red;
  font-size: 1.5rem;
  &:hover {
    transform: scale(1.25);
  }
}
</style>
