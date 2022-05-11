<template>
  <div
    class="customShadow customShadow-start mb-4 p-5 bg-white text-center h4 border border-2 fw-bold"
  >
    追蹤名單
  </div>

  <div
    class="d-flex align-items-center mb-4 p-4 bg-white border border-2 rounded shadow-sm"
  >
    <img
      src="../../assets/images/user51.png"
      class="thumbnail thumbnail-xl border-0"
    />
    <div class="flex-grow-1 ms-4">
      <router-link to="/" class="fw-bold hoverLink">愛爾敏</router-link>
      <div class="d-flex justify-content-between fs-6">
        <p class="text-light">追蹤時間： 2022/1/10 12:00</p>
        <p>您已追蹤 90 天！</p>
      </div>
    </div>
  </div>

  <div
    class="d-flex align-items-center mb-4 p-4 bg-white border border-2 rounded shadow-sm"
  >
    <img
      src="../../assets/images/user52.png"
      class="thumbnail thumbnail-xl border-0"
    />
    <div class="flex-grow-1 ms-4">
      <router-link to="/" class="fw-bold hoverLink">李維</router-link>
      <div class="d-flex justify-content-between fs-6">
        <p class="text-light">追蹤時間： 2022/1/10 12:00</p>
        <p>您已追蹤 90 天！</p>
      </div>
    </div>
  </div>

  <div
    class="d-flex align-items-center mb-4 p-4 bg-white border border-2 rounded shadow-sm"
  >
    <img
      src="../../assets/images/user53.png"
      class="thumbnail thumbnail-xl border-0"
    />
    <div class="flex-grow-1 ms-4">
      <router-link to="/" class="fw-bold hoverLink">米歇爾</router-link>
      <div class="d-flex justify-content-between fs-6">
        <p class="text-light">追蹤時間： 2022/1/10 12:00</p>
        <p>您已追蹤 90 天！</p>
      </div>
    </div>
  </div>
  <div
    class="d-flex align-items-center mb-4 p-4 bg-white border border-2 rounded shadow-sm"
  >
    <img
      src="../../assets/images/user54.png"
      class="thumbnail thumbnail-xl border-0"
    />
    <div class="flex-grow-1 ms-4">
      <router-link to="/" class="fw-bold hoverLink">米卡莎</router-link>
      <div class="d-flex justify-content-between fs-6">
        <p class="text-light">追蹤時間： 2022/1/10 12:00</p>
        <p>您已追蹤 90 天！</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TrackView",
};
</script>
