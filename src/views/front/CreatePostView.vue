<template>
  <h1 class="header">張貼動態</h1>

  <div class="card p-md-8">
    <div class="mb-4">
      <label for="content" class="form-label">貼文內容</label>
      <textarea
        class="form-control"
        id="content"
        rows="5"
        placeholder="輸入您的貼文內容"
      ></textarea>
    </div>
    <div class="fileBtn mb-4">
      <label for="file" class="rounded-1">上傳圖片</label>
      <input class="" type="file" id="file" />
    </div>

    <img src="../../assets/images/image1.png" class="bgCover mb-8" />

    <div class="text-center">
      <button
        type="button"
        class="effectBtn btn btn-primary w-100"
        style="max-width: 323px"
      >
        送出貼文
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreatePostView",
};
</script>
