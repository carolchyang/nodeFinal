<template>
  <div class="row g-3 mb-4">
    <div class="col-12 col-md-4">
      <select
        class="form-select form-select-sm"
        v-model="reverse"
        @change="getAll(1, 'loading')"
      >
        <option value="1">由新到舊</option>
        <option value="0">由舊到新</option>
      </select>
    </div>
    <div class="col-12 col-md-8">
      <div class="input-group input-group-sm">
        <input
          type="text"
          class="form-control"
          placeholder="搜尋貼文"
          aria-label="search"
          aria-describedby="search"
          v-model.trim="keyword"
        />
        <button
          class="effectBtn btn btn-primary py-0 px-3"
          type="button"
          id="search"
          @click.prevent="getAll(1, 'loading')"
        >
          <i class="bi bi-search h3"></i>
        </button>
      </div>
    </div>
  </div>

  <ArticleComponent
    :data="posts"
    :profile="profile"
    @toggle-like="toggleLike"
    @update-comments="updateComments"
    v-if="posts.length"
  ></ArticleComponent>

  <EmptyCardComponent v-else>
    <template #default>目前尚無動態，新增一則貼文吧！</template>
  </EmptyCardComponent>

  <PaginationComponent
    :pagination="pagination"
    @get-all="getAll"
    v-if="posts.length"
  ></PaginationComponent>

  <DelModalComponent @del-data="delData">
    <template #default>
      <p class="d-md-inline-block mb-3 mb-md-0">
        確定要刪除此則
        <b class="text-danger">{{ modal.title }}</b>
        ？
      </p>
      <span>（刪除後無法回復）</span>
    </template>
  </DelModalComponent>
</template>

<script>
import ArticleComponent from "@/components/ArticleComponent.vue";
import EmptyCardComponent from "@/components/EmptyCardComponent.vue";
import PaginationComponent from "@/components/PaginationComponent";
import DelModalComponent from "@/components/DelModalComponent.vue";
import { mapState, mapActions } from "pinia";
import statusStore from "@/stores/statusStore";
import modalStore from "@/stores/modalStore";
import userStore from "@/stores/userStore";
import postStore from "@/stores/postStore";
import likeStore from "@/stores/likeStore";
import commentStore from "@/stores/commentStore";
import { socket } from "@/scripts/api";

export default {
  name: "DynamicWallView",
  data() {
    return {
      keyword: "",
      reverse: 1,
    };
  },
  methods: {
    // 取得貼文資訊
    async getAll(page = 1, isLoading) {
      if (isLoading) {
        this.toggleLoading(true);
      }
      const data = {};
      data.page = page;
      data.reverse = this.reverse;
      data.content = this.keyword;

      await this.getPosts(data);
      this.toggleLoading(false);
      socket.emit("register", this.postIds);
    },
    // 刪除回覆/貼文
    async delData() {
      this.togglePartLoading(this.modal.id, this.modal.type);
      let modalType = "delComment";
      let page = this.pagination?.current_pages;
      if (this.modal.type == "delpost") {
        modalType = "delPost";
        page = 1;
      }
      await this[modalType](this.modal.id);
      await this.getAll(page);
      this.togglePartLoading("", "");
      socket.emit("register", this.postIds);
    },
    // 切換按讚狀態
    async toggleLike({ id, type }) {
      this.togglePartLoading(id, "like");
      let toggleType = "clickLike";
      if (type == "cancel") {
        toggleType = "delLike";
      }
      await this[toggleType](id);
      await this.getAll(this.pagination?.current_pages);
      this.togglePartLoading("", "");
    },
    // 建立回覆
    async updateComments(data) {
      this.togglePartLoading(data.postId, "comment");
      await this.createComment(data);
      await this.getAll(this.pagination?.current_pages);
      this.togglePartLoading("", "");
    },
    ...mapActions(statusStore, ["toggleLoading", "togglePartLoading"]),
    ...mapActions(postStore, ["getPosts", "delPost"]),
    ...mapActions(likeStore, ["clickLike", "delLike"]),
    ...mapActions(commentStore, ["createComment", "delComment"]),
  },
  computed: {
    ...mapState(modalStore, ["modal"]),
    ...mapState(userStore, ["profile"]),
    ...mapState(postStore, ["posts", "pagination"]),
    postIds() {
      return this.posts.map((post) => post.id);
    },
  },
  components: {
    ArticleComponent,
    EmptyCardComponent,
    PaginationComponent,
    DelModalComponent,
  },
  created() {
    this.getAll(1, "loading");

    socket.on("connect", () => {
      console.log("socket.connected :>> ", socket.connected);
      socket.emit("register", this.postIds);
    });

    socket.on("addComment", (comment) => {
      const post = this.posts.find((post) => post._id === comment.postId);
      post.comments.unshift(comment);
    });

    socket.on("removeComment", ({ postId, commentId }) => {
      console.log("removeComment :>> ", { postId, commentId });
      const post = this.posts.find((post) => post._id === postId);
      const idx = post.comments.findex((comment) => comment._id === commentId);
      post.comments.splice(idx, 1);
    });

    socket.on("updateLikeCount", ({ postId, likeCount }) => {
      console.log("updateLikeCount :>> ", { postId, likeCount });
      const post = this.posts.find((post) => post._id === postId);
      post.likeCount = likeCount;
    });

    socket.on("disconnect", () => {
      console.log("socket.connected :>> ", socket.connected);
    });
  },
  unmounted() {
    socket.disconnect();
  },
};
</script>
