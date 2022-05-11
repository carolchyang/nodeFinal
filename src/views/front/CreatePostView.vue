<template>
  <div
    class="customShadow customShadow-start mb-4 p-5 bg-white text-center h4 border border-2 fw-bold"
  >
    張貼動態
  </div>

  <div class="mb-4 p-8 bg-white border border-2 rounded shadow-sm">
    <div class="mb-4">
      <label for="content" class="form-label">貼文內容</label>
      <textarea
        class="form-control"
        id="content"
        rows="5"
        placeholder="輸入您的貼文內容"
      ></textarea>
    </div>
    <div class="customFileBtn mb-4">
      <label for="file" class="rounded-1">上傳圖片</label>
      <input class="" type="file" id="file" />
    </div>

    <img
      src="../../assets/images/image.png"
      class="bgCover bgCover-lg border border-2 rounded mb-8"
    />

    <div class="text-center">
      <button
        type="button"
        class="hoverBtn btn btn-primary w-100 border-dark rounded-2 shadow"
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
