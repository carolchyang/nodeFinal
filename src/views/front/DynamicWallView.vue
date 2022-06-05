<template>
  <div class="row g-3 mb-4">
    <div class="col-12 col-md-4">
      <select
        class="form-select form-select-sm"
        v-model="reverse"
        @change="getAll()"
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
          @click.prevent="getAll()"
        >
          <i class="bi bi-search h3"></i>
        </button>
      </div>
    </div>
  </div>

  <ArticleComponent
    :data="posts"
    :profile="profile"
    :likePostArray="likePostArray"
    @toggle-like="toggleLike"
    @update-comments="updateComments"
    @to-personalwall="toPersonalWall"
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
      確定要刪除此則
      <b class="text-danger">{{ modal.title }}</b>
      ？（刪除後無法回復）
    </template>
  </DelModalComponent>
</template>

<script>
import ArticleComponent from "@/components/ArticleComponent.vue";
import EmptyCardComponent from "@/components/EmptyCardComponent.vue";
import PaginationComponent from "@/components/PaginationComponent";
import DelModalComponent from "@/components/DelModalComponent.vue";
import { mapState, mapActions } from "pinia";
import modalStore from "@/stores/modalStore";
import userStore from "@/stores/userStore";
import postStore from "@/stores/postStore";
import likeStore from "@/stores/likeStore";
import commentStore from "@/stores/commentStore";

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
    getAll(page = 1) {
      const data = {};
      data.page = page;
      data.reverse = this.reverse;
      data.content = this.keyword;

      this.getPosts(data);
    },
    // 刪除回覆/貼文
    async delData() {
      let modalType = "delComment";
      if (this.modal.type == "post") {
        modalType = "delPost";
      }
      await this[modalType](this.modal.id);
      await this.getAll();
    },
    // 切換按讚狀態
    async toggleLike({ id, type }) {
      let toggleType = "clickLike";
      if (type == "cancel") {
        toggleType = "delLike";
      }
      await this[toggleType](id);
      await this.getAll();
    },
    // 建立回覆
    async updateComments(data) {
      await this.createComment(data);
      await this.getAll();
    },
    // 取得全部動態牆所需資料
    async init() {
      await this.getProfile();
      await this.getAll();
      await this.getLikes();
    },
    // 轉至 PersonalWall 頁面
    toPersonalWall(data) {
      const { _id } = data;
      this.togglePersonalInfo(data);
      this.$router.push({ path: `/personalwall/${_id}` });
    },
    ...mapActions(userStore, ["getProfile", "togglePersonalInfo"]),
    ...mapActions(postStore, ["getPosts", "delPost"]),
    ...mapActions(likeStore, ["getLikes", "clickLike", "delLike"]),
    ...mapActions(commentStore, ["createComment", "delComment"]),
  },
  computed: {
    ...mapState(modalStore, ["modal", "modalItem"]),
    ...mapState(userStore, ["profile"]),
    ...mapState(postStore, ["posts", "pagination"]),
    ...mapState(likeStore, ["likes", "likePostArray"]),
  },
  components: {
    ArticleComponent,
    EmptyCardComponent,
    PaginationComponent,
    DelModalComponent,
  },
  created() {
    this.init();
  },
};
</script>
