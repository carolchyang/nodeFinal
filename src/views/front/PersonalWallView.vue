<template>
  <div class="header header-rounded d-flex mb-5">
    <img
      :src="personalInfo.photo"
      class="headerThumbnail"
      v-if="personalInfo.photo"
    />
    <img
      src="../../assets/images/user_default.png"
      class="headerThumbnail"
      v-else
    />
    <div class="headerContent">
      <h2 class="text-start h5 fw-bold mx-auto ms-md-0">
        <span class="d-block">{{ personalInfo.name }} 的貼文牆</span>
      </h2>
      <div v-if="personalInfo._id !== profile._id">
        <button
          type="button"
          class="btn btn-warning py-2 px-8 border-dark fw-bold shadow"
          :disabled="loadingStatus"
          @click.prevent="toggleFollow(personalInfo._id, 'create')"
          v-if="!isFollow"
        >
          <span
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
            v-if="loadingStatus"
          ></span>
          追蹤
        </button>
        <button
          type="button"
          class="btn btn-secondary py-2 px-8 border-dark fw-bold shadow"
          :disabled="loadingStatus"
          @click.prevent="toggleFollow(personalInfo._id, 'del')"
          v-else
        >
          <span
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
            v-if="loadingStatus"
          ></span>
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
    @toggle-like="toggleLike"
    @update-comments="updateComments"
    v-if="posts.length"
  ></ArticleComponent>

  <EmptyCardComponent v-else>
    <template #default>目前尚無動態，趕快叫他新增貼文吧！</template>
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
      keyword: "",
      reverse: 1,
      loadingStatus: false,
    };
  },
  methods: {
    // 取得貼文資料
    getAll(page = 1) {
      const data = {};
      data.page = page;
      data.reverse = this.reverse;
      data.userId = this.personalId;
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
      // this.loadingStatus = true;
      let toggleType = "clickLike";
      if (type == "cancel") {
        toggleType = "delLike";
      }
      await this[toggleType](id);
      await this.getAll();
      // this.loadingStatus = false;
    },
    // 切換追蹤狀態
    async toggleFollow(_id, type) {
      this.loadingStatus = true;
      let toggleType = "";
      let id = "";
      // 若為取消追蹤則取得 followId
      if (type == "del") {
        toggleType = "delFollow";
        this.followArray.forEach((item) => {
          if (item.targetUserId == _id) {
            id = item.followId;
          }
        });
        // 追蹤
      } else {
        toggleType = "createFollow";
        id = _id;
      }
      await this[toggleType](id);
      this.loadingStatus = false;
    },
    // 建立回覆
    async updateComments(data) {
      await this.createComment(data);
      await this.getAll();
    },
    ...mapActions(postStore, ["getPosts", "delPost"]),
    ...mapActions(likeStore, ["clickLike", "delLike"]),
    ...mapActions(commentStore, ["createComment", "delComment"]),
    ...mapActions(followStore, ["getFollows", "createFollow", "delFollow"]),
  },
  computed: {
    // 判斷是否追蹤
    isFollow() {
      let val = false;
      this.followArray.forEach((item) => {
        if (item.targetUserId == this.personalInfo?._id) {
          val = true;
        }
      });
      return val;
    },
    ...mapState(modalStore, ["modal", "modalItem"]),
    ...mapState(userStore, ["profile", "personalInfo"]),
    ...mapState(postStore, ["posts", "pagination"]),
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
    this.getAll();
    this.getFollows();
  },
};
</script>
