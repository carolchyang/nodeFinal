<template>
  <div
    class="modal fade"
    id="delModal"
    tabindex="-1"
    aria-labelledby="delModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body pb-5">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-light py-2 px-8"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-outline-danger py-2 px-8"
            v-if="temp === '登出'"
            @click.prevent="$emit('logout')"
          >
            確定
          </button>
          <button type="button" class="btn btn-outline-danger py-2 px-8" v-else>
            確定
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DelModalComponent",
  props: ["temp"],
};
</script>
