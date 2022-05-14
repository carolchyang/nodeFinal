<template>
  <h1 class="header">我按讚的貼文</h1>

  <ul>
    <li class="card">
      <div class="d-flex align-items-center">
        <img
          src="../../assets/images/user4.png"
          class="thumbnail thumbnail-xl d-none d-md-block border-0 me-4"
        />
        <div class="me-auto">
          <router-link to="/personalwall" class="link-dark fw-bold"
            >阿爾敏</router-link
          >
          <span class="text-light fs-6">發文時間： 2022/1/10 12:00</span>
        </div>
        <a
          href="#"
          class="link-dark me-3 me-sm-9 text-center fw-bold text-decoration-none"
        >
          <i class="bi bi-hand-thumbs-up text-primary fs-4 lh-sm"></i>
          <span class="d-block">取消</span>
        </a>
        <router-link
          to="/"
          class="link-dark me-md-9 text-center fw-bold text-decoration-none"
        >
          <i class="bi bi-arrow-right-circle fs-4 lh-sm"></i>
          <span class="d-block">查看</span>
        </router-link>
      </div>
    </li>
  </ul>

  <EmptyCardComponent class="d-none">
    <template #default>目前還未有按讚貼文</template>
  </EmptyCardComponent>
</template>

<script>
import EmptyCardComponent from "@/components/EmptyCardComponent.vue";

export default {
  name: "LikePostView",
  components: {
    EmptyCardComponent,
  },
};
</script>
