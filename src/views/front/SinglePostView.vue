<template>
  <!-- 單一頁面不給刪除 postId 用來判定是否可以刪除 -->
  <ArticleComponent
    :postId="postId"
    :data="posts"
    :profile="profile"
    @toggle-like="toggleLike"
    @update-comments="updateComments"
    v-if="posts.length"
  ></ArticleComponent>

  <EmptyCardComponent v-else>
    <template #default>此貼文已被刪除！</template>
  </EmptyCardComponent>

  <DelModalComponent @del-data="deleteComment">
    <template #default>
      確定要刪除此則
      <b class="text-danger">{{ modal.title }}</b>
      ？（刪除後無法回復）
    </template>
  </DelModalComponent>
</template>

<script>
import ArticleComponent from "@/components/ArticleComponent.vue";
import EmptyCardComponent from "@/components/EmptyCardComponent.vue";
import DelModalComponent from "@/components/DelModalComponent.vue";
import { mapState, mapActions } from "pinia";
import statusStore from "@/stores/statusStore";
import modalStore from "@/stores/modalStore";
import userStore from "@/stores/userStore";
import postStore from "@/stores/postStore";
import likeStore from "@/stores/likeStore";
import commentStore from "@/stores/commentStore";

export default {
  name: "SinglePostView",
  data() {
    return {
      postId: "",
    };
  },
  methods: {
    // 刪除回覆
    async deleteComment() {
      this.togglePartLoading(this.modal.id, this.modal.type);
      await this.delComment(this.modal.id);
      await this.getPosts({ postId: this.postId });
      this.togglePartLoading("", "");
    },
    // 切換按讚狀態
    async toggleLike({ id, type }) {
      this.togglePartLoading(id, "like");
      let toggleType = "clickLike";
      if (type == "cancel") {
        toggleType = "delLike";
      }
      await this[toggleType](id);
      await this.getPosts({ postId: this.postId });
      this.togglePartLoading("", "");
    },
    // 建立回覆
    async updateComments(data) {
      this.togglePartLoading(data.postId, "comment");
      await this.createComment(data);
      await this.getPosts({ postId: this.postId });
      this.togglePartLoading("", "");
    },
    ...mapActions(statusStore, ["toggleLoading", "togglePartLoading"]),
    ...mapActions(postStore, ["getPosts"]),
    ...mapActions(likeStore, ["clickLike", "delLike"]),
    ...mapActions(commentStore, ["createComment", "delComment"]),
  },
  computed: {
    ...mapState(modalStore, ["modal"]),
    ...mapState(userStore, ["profile"]),
    ...mapState(postStore, ["posts"]),
  },
  components: {
    ArticleComponent,
    EmptyCardComponent,
    DelModalComponent,
  },
  async created() {
    this.toggleLoading(true);
    this.postId = this.$route.params.id;
    await this.getPosts({ postId: this.postId });
    this.toggleLoading(false);
  },
};
</script>
