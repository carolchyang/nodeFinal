<template>
  <h1 class="header">我按讚的貼文</h1>

  <ul>
    <li class="card">
      <div class="d-flex align-items-center">
        <router-link to="/personalwall" class="me-4 link-dark fw-bold">
          <img
            src="../../assets/images/user4.png"
            class="thumbnail thumbnail-xl d-none d-md-block mb-1 border-0"
          />
          阿爾敏
        </router-link>

        <div class="me-auto">
          <p class="textTruncate">
            搶到想要的 NFT 啦！ya~~搶到想要的 NFT 啦！ya~~搶到想要的 NFT
            啦！ya~~搶到想要的 NFT 啦！ya~~搶到想要的 NFT 啦！ya~~搶到想要的 NFT
            啦！ya~~搶到想要的 NFT 啦！ya~~
          </p>
          <span class="text-light fs-6">發文時間： 2022/1/10 12:00</span>
        </div>
        <a
          href="#"
          class="link-dark me-3 me-sm-9 text-center fw-bold text-decoration-none"
          @click.prevent="toggleDelModal('阿爾敏')"
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

  <DelModalComponent>
    <template #default>
      確定要取消按讚
      <b class="text-danger">{{ modalItem }}</b>
      的貼文？（取消後無法回復）
    </template>
  </DelModalComponent>
</template>

<script>
import EmptyCardComponent from "@/components/EmptyCardComponent.vue";
import DelModalComponent from "@/components/DelModalComponent.vue";
import { bsModal } from "@/scripts/methods";

export default {
  name: "PersonalWallView",
  data() {
    return {
      modalItem: "",
    };
  },
  methods: {
    // 開啟 DelModal
    toggleDelModal(item) {
      this.modalItem = item;
      this.bsModal = bsModal("delModal");
      this.bsModal.show();
    },
  },
  components: {
    EmptyCardComponent,
    DelModalComponent,
  },
};
</script>
