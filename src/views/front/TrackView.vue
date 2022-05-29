<template>
  <h1 class="header">追蹤名單</h1>

  <ul>
    <li class="card">
      <div class="d-flex flex-column flex-md-row align-items-center">
        <img
          src="../../assets/images/user4.png"
          class="thumbnail thumbnail-xl d-none d-md-block border-0 me-4"
        />
        <div class="me-auto mb-2 mb-md-0">
          <router-link to="/personalwall" class="link-dark fw-bold"
            >阿爾敏</router-link
          >
          <span class="text-light fs-6">追蹤時間： 2022/1/10 12:00</span>
        </div>
        <p class="align-self-end fs-6">您已追蹤 90 天！</p>
      </div>
    </li>
  </ul>

  <EmptyCardComponent class="d-none">
    <template #default>目前還未追蹤任何人</template>
  </EmptyCardComponent>
</template>

<script>
import EmptyCardComponent from "@/components/EmptyCardComponent.vue";

export default {
  name: "TrackView",
  props: ["userInfo"],
  components: {
    EmptyCardComponent,
  },
};
</script>
