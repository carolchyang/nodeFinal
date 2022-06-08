<template>
  <h1 class="header">我按讚的貼文</h1>
  <ul class="mb-6">
    <li
      class="card customList py-4"
      v-for="(item, key) in likes"
      :key="key"
      :class="{ disabled: partLoading.id == item.post?._id }"
    >
      <div class="d-flex align-items-center">
        <a
          href="#"
          class="me-6 me-md-4 link-dark text-center fw-bold"
          @click.prevent="
            toPersonalWall({
              _id: item.user?._id,
              name: item.user?.name,
              photo: item.user?.photo,
            })
          "
        >
          <img
            :src="item.user?.photo"
            class="thumbnail thumbnail-xl d-none d-md-block mx-auto mb-1 border-0"
            v-if="item.user?.photo"
          />
          <img
            src="../../assets/images/user_default.png"
            class="thumbnail thumbnail-xl d-none d-md-block mx-auto mb-1 border-0"
            v-else
          />
          {{ item.user?.name }}
        </a>

        <div class="me-auto textTruncate">
          <p class="mb-md-3">
            {{ item.post?.content }}
          </p>
          <p class="text-light fs-6">
            <span class="d-none d-mb-inline-block"> 發文時間： </span>
            <span>
              {{ $getTime(item.post?.createAt) }}
            </span>
          </p>
        </div>
        <a
          href="#"
          class="d-none d-md-block link-dark me-3 me-sm-9 text-center fw-bold text-decoration-none"
          @click.prevent="delLikePost(item.post?._id)"
        >
          <div
            class="spinner-border"
            style="width: 1.2rem; height: 1.2rem"
            role="status"
            v-if="partLoading.id == item.post?._id"
          >
            <span class="visually-hidden">Loading...</span>
          </div>
          <i class="bi bi-hand-thumbs-up text-primary fs-4 lh-sm" v-else></i>
          <span class="d-block">取消</span>
        </a>
        <router-link
          :to="{ path: `/singlepost/${item.post?._id}` }"
          class="link-dark me-md-9 text-center fw-bold text-decoration-none"
        >
          <i class="bi bi-arrow-right-circle fs-4 lh-sm"></i>
          <span class="d-block">查看</span>
        </router-link>
      </div>
    </li>
  </ul>

  <EmptyCardComponent v-if="!likes.length">
    <template #default>目前還未有按讚貼文</template>
  </EmptyCardComponent>
</template>

<script>
import EmptyCardComponent from "@/components/EmptyCardComponent.vue";
import { mapState, mapActions } from "pinia";
import statusStore from "@/stores/statusStore";
import userStore from "@/stores/userStore";
import likeStore from "@/stores/likeStore";

export default {
  name: "PersonalWallView",
  methods: {
    // 取得按讚貼文
    async getLikeAll(page = 1) {
      const data = { page };
      await this.getLikes(data);
    },
    // 取消按讚
    async delLikePost(id) {
      this.togglePartLoading(id, "like");
      await this.delLike(id);
      await this.getLikeAll();
      this.togglePartLoading("", "");
    },
    // 轉至 PersonalWall 頁面
    toPersonalWall(data) {
      const { _id } = data;
      this.togglePersonalInfo(data);
      this.$router.push({ path: `/personalwall/${_id}` });
    },
    ...mapActions(statusStore, ["toggleLoading", "togglePartLoading"]),
    ...mapActions(userStore, ["togglePersonalInfo"]),
    ...mapActions(likeStore, ["getLikes", "delLike"]),
    ...mapActions(statusStore, ["toggleLoading"]),
  },
  computed: {
    ...mapState(likeStore, ["likes"]),
    ...mapState(statusStore, ["partLoading"]),
  },
  components: {
    EmptyCardComponent,
  },
  async created() {
    this.toggleLoading(true);
    await this.getLikeAll();
    this.toggleLoading(false);
  },
};
</script>
