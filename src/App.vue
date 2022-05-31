<template>
  <Loading :active="isLoading"></Loading>
  <ToastMessage />
  <router-view />
</template>

<script>
import Loading from "vue3-loading-overlay";
import "vue3-loading-overlay/dist/vue3-loading-overlay.css";
import ToastMessage from "@/components/ToastMessage.vue";
import { mapState } from "pinia";
import statusStore from "@/stores/statusStore";

export default {
  computed: {
    ...mapState(statusStore, ["isLoading"]),
  },
  components: {
    Loading,
    ToastMessage,
  },
};
</script>

<style lang="scss">
@import "./assets/scss/all";
</style>
