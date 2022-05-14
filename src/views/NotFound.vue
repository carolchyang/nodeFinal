<template>
  <div
    class="vh-100 d-flex flex-column justify-content-center align-items-center"
  >
    <p class="display-1">404</p>
    <p class="display-2 mb-8">發生錯誤</p>
    <router-link to="/login" class="btn btn-primary">回到 登入頁</router-link>
  </div>
</template>

<script>
export default {
  name: "NotFrond",
};
</script>
