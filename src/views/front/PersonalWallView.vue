<template>
  <div class="header header-rounded d-flex mb-5">
    <img
      :src="personInfo.photo"
      class="headerThumbnail"
      v-if="personInfo.photo"
    />
    <img
      src="../../assets/images/user_default.png"
      class="headerThumbnail"
      v-else
    />
    <div class="headerContent">
      <h2 class="text-start h5 fw-bold mx-auto ms-md-0">
        <span class="d-block">{{ personInfo.name }} 的貼文牆</span>
      </h2>
      <div class="d-none">
        <button
          type="button"
          class="btn btn-warning py-2 px-8 border-dark fw-bold shadow"
          @click.prevent="toggleFollow(personInfo._id, 'create')"
          v-if="!isFollow"
        >
          追蹤
        </button>
        <button
          type="button"
          class="btn btn-secondary py-2 px-8 border-dark fw-bold shadow"
          @click.prevent="toggleFollow(followId, 'del')"
          v-else
        >
          取消追蹤
        </button>
      </div>
    </div>
  </div>

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
    :comments="comments"
    @get-all="getAll"
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
import followStore from "@/stores/followStore";

export default {
  name: "DynamicWallView",
  data() {
    return {
      personalId: "",
      personaInfo: {},
      keyword: "",
      reverse: 1,
      isFollow: false,
      followId: "",
    };
  },
  methods: {
    // 取得貼文資料
    async getAll(page = 1) {
      const data = {};
      data.page = page;
      data.reverse = this.reverse;
      data.userId = this.personalId;

      if (this.keyword) {
        data.content = this.keyword;
      }
      await this.getPosts(data);
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
    // 取得個人動態牆所需資料
    async init() {
      await this.getProfile();
      await this.getAll();
      await this.getLikes();
      await this.getComments();
      await this.getFollows();
    },
    // 轉至 PersonalWall 頁面
    toPersonalWall(data) {
      const { _id } = data;
      this.togglePersonInfo(data);
      this.$router.push({ path: `/personalwall/${_id}` });
    },
    ...mapActions(userStore, ["getProfile", "togglePersonInfo"]),
    ...mapActions(postStore, ["getPosts", "delPost"]),
    ...mapActions(likeStore, ["getLikes", "clickLike", "delLike"]),
    ...mapActions(commentStore, ["getComments", "createComment", "delComment"]),
    ...mapActions(followStore, ["getFollows", "createFollow", "delFollow"]),
  },
  computed: {
    ...mapState(modalStore, ["modal", "modalItem"]),
    ...mapState(userStore, ["profile", "personInfo"]),
    ...mapState(postStore, ["posts", "pagination"]),
    ...mapState(likeStore, ["likes", "likePostArray"]),
    ...mapState(commentStore, ["comments"]),
    ...mapState(followStore, ["follows", "followArray"]),
  },
  components: {
    ArticleComponent,
    EmptyCardComponent,
    PaginationComponent,
    DelModalComponent,
  },
  created() {
    // 取得 personalWall 用戶資料
    this.personalId = this.$route.params.id;
    if (!this.personInfo._id) {
      this.$router.push("/");
    } else {
      this.init();
    }
  },
};
</script>
