<template>
  <div
    class="toast-container position-fixed mt-27 me-12 end-0"
    v-if="messages.length"
  >
    <div
      class="toast show align-items-center bg-white"
      v-for="(msg, key) in messages"
      :key="key"
      :class="`border-${msg.style} text-${msg.style}`"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      ref="toast"
    >
      <div class="d-flex">
        <div class="toast-body">
          {{ msg.content }}
        </div>
        <button
          type="button"
          class="btn-close me-6 m-auto"
          data-bs-dismiss="toast"
          aria-label="Close"
          @click="clearToast(key)"
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ToastMessage",
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    showToast() {
      setTimeout(() => {
        this.messages.shift();
      }, 3000);
    },
    clearToast(index) {
      this.messages.splice(index, 1);
    },
  },
  mounted() {
    this.$emitter.on("push-message", (message) => {
      const { style = "dark", content } = message;
      this.messages.push({ style, content });
      this.showToast();
    });
  },
  unmounted() {
    this.$emitter.off("push-message");
  },
};
</script>
