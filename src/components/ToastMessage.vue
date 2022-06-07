<template>
  <div class="toast-container" v-if="messages.length">
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
import { mapState, mapActions } from "pinia";
import statusStore from "@/stores/statusStore";

export default {
  name: "ToastMessage",
  methods: {
    ...mapActions(statusStore, ["showToast", "clearToast", "pushMessage"]),
  },
  computed: {
    ...mapState(statusStore, ["messages"]),
  },
};
</script>
