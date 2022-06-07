<template>
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <li
        class="page-item"
        :class="{ disabled: !(pagination.current_pages > 1) }"
      >
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="changePage(pagination.current_pages - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        class="page-item"
        v-for="n in pagination.total_pages"
        :key="n"
        :class="{ active: pagination.current_pages == n }"
      >
        <a class="page-link" href="#" @click.prevent="changePage(n)">{{ n }}</a>
      </li>
      <li
        class="page-item"
        :class="{
          disabled: !(pagination.current_pages < pagination.total_pages),
        }"
      >
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="changePage(pagination.current_pages + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "PaginationComponent",
  props: ["pagination"],
  emits: ["get-all"],
  methods: {
    // 換頁功能
    changePage(page = 1) {
      this.$emit("get-all", page, "loading");
    },
  },
};
</script>
