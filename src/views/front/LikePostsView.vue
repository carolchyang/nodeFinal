<template>
  <h1 class="header">我按讚的貼文</h1>

  <ul class="mb-6">
    <li class="card py-4" v-for="(item, key) in likes" :key="key">
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
              {{ $getTime(item.post?.createdAt) }}
            </span>
          </p>
        </div>
        <a
          href="#"
          class="d-none d-md-block link-dark me-3 me-sm-9 text-center fw-bold text-decoration-none"
          @click.prevent="delLike(item.post?._id)"
        >
          <i class="bi bi-hand-thumbs-up text-primary fs-4 lh-sm"></i>
          <span class="d-block">取消</span>
        </a>
        <a
          href="#"
          class="link-dark me-md-9 text-center fw-bold text-decoration-none"
        >
          <i class="bi bi-arrow-right-circle fs-4 lh-sm"></i>
          <span class="d-block">查看</span>
        </a>
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
import userStore from "@/stores/userStore";
import likeStore from "@/stores/likeStore";

export default {
  name: "PersonalWallView",
  methods: {
    getLikeAll(page = 1) {
      const data = { page };
      this.getLikes(data);
    },
    toPersonalWall(data) {
      const { _id } = data;
      this.togglePersonInfo(data);
      this.$router.push({ path: `/personalwall/${_id}` });
    },
    ...mapActions(userStore, ["getProfile", "togglePersonInfo"]),
    ...mapActions(likeStore, ["getLikes", "delLike"]),
  },
  computed: {
    ...mapState(likeStore, ["likes"]),
  },
  components: {
    EmptyCardComponent,
  },
  async created() {
    await this.getProfile();
    await this.getLikeAll();
  },
};
</script>
