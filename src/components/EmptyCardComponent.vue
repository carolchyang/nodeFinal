<template>
  <div class="bg-white border border-2 rounded shadow-sm">
    <div class="p-4 border-bottom border-2 border-dark">
      <ul class="d-flex">
        <li class="circle me-2"></li>
        <li class="circle circle-1 me-2"></li>
        <li class="circle circle-2"></li>
      </ul>
    </div>
    <div class="py-8 text-center text-light">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "DynamicWallView",
};
</script>
