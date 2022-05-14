<template>
  <Loading :active="isLoading"></Loading>
</template>

<script>
import Loading from "vue3-loading-overlay";
import "vue3-loading-overlay/dist/vue3-loading-overlay.css";

export default {
  data() {
    return {
      isLoading: false,
    };
  },
  components: {
    Loading,
  },
  mounted() {
    this.$emitter.on("toggle-loading", (boolean) => {
      this.isLoading = boolean;
    });
  },
  unmounted() {
    this.$emitter.off("toggle-loading");
  },
};
</script>
