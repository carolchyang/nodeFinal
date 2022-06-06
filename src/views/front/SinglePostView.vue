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
</template>

<script>
import ArticleComponent from "@/components/ArticleComponent.vue";
import { mapState, mapActions } from "pinia";
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
    // 切換按讚狀態
    async toggleLike({ id, type }) {
      let toggleType = "clickLike";
      if (type == "cancel") {
        toggleType = "delLike";
      }
      await this[toggleType](id);
      await this.getPosts({ postId: this.postId });
    },
    // 建立回覆
    async updateComments(data) {
      await this.createComment(data);
      await this.getPosts({ postId: this.postId });
    },
    ...mapActions(postStore, ["getPosts"]),
    ...mapActions(likeStore, ["clickLike", "delLike"]),
    ...mapActions(commentStore, ["createComment", "delComment"]),
  },
  computed: {
    ...mapState(modalStore, ["modal", "modalItem"]),
    ...mapState(userStore, ["profile"]),
    ...mapState(postStore, ["posts"]),
  },
  components: {
    ArticleComponent,
  },
  created() {
    this.postId = this.$route.params.id;
    this.getPosts({ postId: this.postId });
  },
};
</script>
