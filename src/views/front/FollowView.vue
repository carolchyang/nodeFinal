<template>
  <h1 class="header">追蹤名單</h1>

  <ul class="mb-6">
    <li
      class="card"
      v-for="(item, key) in follows"
      :key="key"
      :class="{ disabled: iconLoading.id == item._id }"
    >
      <div class="d-flex flex-column flex-md-row align-items-center">
        <img
          :src="item.targetUserId?.photo"
          class="thumbnail thumbnail-xl d-none d-md-block border-0 me-4"
          v-if="item.targetUserId?.photo"
        />
        <img
          src="../../assets/images/user_default.png"
          class="thumbnail thumbnail-xl d-none d-md-block border-0 me-4"
          v-else
        />
        <div class="me-3 mb-2 mb-md-0">
          <div class="link-dark fw-bold">
            {{ item.targetUserId?.name }}
          </div>
          <span class="text-light fs-6">
            追蹤時間：{{ $getTime(item.createAt) }}
          </span>
        </div>
        <p class="mt-auto me-auto text-light fs-6">
          已追蹤 {{ $getDiffTime(item.createAt) }}！
        </p>
        <a
          href="#"
          class="d-none d-md-block link-dark me-3 me-sm-9 text-center fw-bold text-decoration-none"
          @click.prevent="delFollow(item._id)"
        >
          <div
            class="spinner-border"
            style="width: 1.2rem; height: 1.2rem"
            role="status"
            v-if="iconLoading.id == item._id"
          >
            <span class="visually-hidden">Loading...</span>
          </div>
          <i class="bi bi-trash3 text-primary fs-4 lh-sm" v-else></i>

          <span class="d-block">取消</span>
        </a>
        <a
          href="#"
          class="link-dark me-md-9 text-center fw-bold text-decoration-none"
          @click.prevent="
            toPersonalWall({
              _id: item.targetUserId?._id,
              name: item.targetUserId?.name,
              photo: item.targetUserId?.photo,
            })
          "
        >
          <i class="bi bi-arrow-right-circle fs-4 lh-sm"></i>
          <span class="d-block">查看</span>
        </a>
      </div>
    </li>
  </ul>

  <EmptyCardComponent v-if="!follows.length">
    <template #default>目前還未追蹤任何人</template>
  </EmptyCardComponent>
</template>

<script>
import EmptyCardComponent from "@/components/EmptyCardComponent.vue";
import { mapState, mapActions } from "pinia";
import statusStore from "@/stores/statusStore";
import followStore from "@/stores/followStore";
import userStore from "@/stores/userStore";

export default {
  name: "FollowView",
  methods: {
    // 轉至 PersonalWall 頁面
    toPersonalWall(data) {
      const { _id } = data;
      this.togglePersonalInfo(data);
      this.$router.push({ path: `/personalwall/${_id}` });
    },
    ...mapActions(followStore, ["getFollows", "delFollow"]),
    ...mapActions(userStore, [
      "togglePersonalInfo",
      "toggleLoading",
      "toggleIconLoading",
    ]),
    ...mapActions(statusStore, ["toggleLoading"]),
  },
  computed: {
    ...mapState(statusStore, ["loadingStatus", "iconLoading"]),
    ...mapState(followStore, ["follows"]),
    ...mapState(userStore, ["profile"]),
  },
  components: {
    EmptyCardComponent,
  },
  async created() {
    await this.getFollows({ userId: this.profile._id });
  },
};
</script>
