<template>
  <PageLoading />
  <ToastMessage />
  <router-view />
</template>

<script>
import PageLoading from "@/components/PageLoading.vue";
import ToastMessage from "@/components/ToastMessage.vue";

export default {
  components: {
    PageLoading,
    ToastMessage,
  },
};
</script>

<style lang="scss">
@import "./assets/scss/all";
</style>
