<template>
  <div
    class="modal fade"
    id="msgModal"
    tabindex="-1"
    aria-labelledby="msgModalLabel"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    aria-hidden="false"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body pb-0 text-center">
          <slot></slot>
        </div>
        <div class="modal-footer justify-content-center">
          <button
            type="button"
            class="btn btn-primary py-2 px-8"
            data-bs-dismiss="modal"
          >
            確定
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MsgModalComponent",
};
</script>
