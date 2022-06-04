<template>
  <ArticleComponent
    :postId="postId"
    :data="posts"
    :profile="profile"
    :likePostArray="likePostArray"
    @toggle-like="toggleLike"
    @update-comments="updateComments"
    @to-personalwall="toPersonalWall"
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
    // 取得全部動態牆所需資料
    async init() {
      await this.getProfile();
      await this.getPosts({ postId: this.postId });
      await this.getLikes();
    },
    // 轉至 PersonalWall 頁面
    toPersonalWall(data) {
      const { _id } = data;
      this.togglePersonalInfo(data);
      this.$router.push({ path: `/personalwall/${_id}` });
    },
    ...mapActions(userStore, ["getProfile", "togglePersonalInfo"]),
    ...mapActions(postStore, ["getPosts"]),
    ...mapActions(likeStore, ["getLikes", "clickLike", "delLike"]),
    ...mapActions(commentStore, ["createComment", "delComment"]),
  },
  computed: {
    ...mapState(modalStore, ["modal", "modalItem"]),
    ...mapState(userStore, ["profile"]),
    ...mapState(postStore, ["posts"]),
    ...mapState(likeStore, ["likes", "likePostArray"]),
  },
  components: {
    ArticleComponent,
  },
  created() {
    this.postId = this.$route.params.id;
    this.init();
  },
};
</script>
