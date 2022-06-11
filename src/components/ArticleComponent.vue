<template>
  <ul class="mb-10">
    <li
      class="card customList"
      v-for="item in data"
      :key="item._id"
      :class="{
        disabled: partLoading.type == 'delpost' && partLoading.id == item._id,
      }"
    >
      <div class="d-flex align-items-center mb-4">
        <a
          href="#"
          class="cardImgLink"
          @click.prevent="
            toPersonalWall({
              _id: item.userId?._id,
              name: item.userId?.name,
              photo: item.userId?.photo,
            })
          "
        >
          <img
            :src="item.userId?.photo"
            class="thumbnail thumbnail-xl"
            v-if="item.userId?.photo"
          />
          <img
            src="../assets/images/user_default.png"
            class="thumbnail thumbnail-xl"
            v-else
          />
        </a>
        <div class="fw-bold ms-4">
          {{ item.userId?.name }}
          <span class="d-block mt-1 text-light fs-7 fw-normal">
            {{ $getTime(item.createAt) }}
          </span>
        </div>

        <!-- 若為此登入者所發的文 && postId 沒有值 - 非單一貼文頁面 -->
        <a
          href="#"
          class="cardCloseBtn"
          @click.prevent="delData(item._id, 'delpost')"
          v-if="profile._id === item.userId?._id && !postId"
        >
          <i class="bi bi-x-lg"></i>
        </a>
      </div>
      <div class="mb-5">
        <p class="mb-4 text-break">
          {{ item.content }}
        </p>
        <div v-if="item.imgId !== ''">
          <img :src="item.imageId" />
        </div>
        <div class="mb-4">
          <a
            href="#"
            class="link-primary thumbsIcon"
            v-if="item.likeCount.includes(profile._id)"
            @click.prevent="
              $emit('toggle-like', { id: item._id, type: 'cancel' })
            "
          >
            <div
              class="spinner-border text-primary me-2"
              style="width: 1.2rem; height: 1.2rem"
              role="status"
              v-if="partLoading.type == 'like' && partLoading.id == item._id"
            >
              <span class="visually-hidden">Loading...</span>
            </div>
            <i class="bi bi-hand-thumbs-up fs-4 me-2" v-else></i>
            <span class="me-2">
              {{ item.likeCount?.length }}
            </span>
            <span> 已按讚</span>
          </a>
          <a
            href="#"
            class="link-light thumbsIcon"
            v-if="!item.likeCount.includes(profile._id)"
            @click.prevent="
              $emit('toggle-like', { id: item._id, type: 'check' })
            "
          >
            <div
              class="spinner-border me-2"
              style="width: 1.2rem; height: 1.2rem"
              role="status"
              v-if="partLoading.type == 'like' && partLoading.id == item._id"
            >
              <span class="visually-hidden">Loading...</span>
            </div>
            <i class="bi bi-hand-thumbs-up fs-4 me-2" v-else></i>
            <span v-if="item.likeCount?.length">
              {{ item.likeCount?.length }}
            </span>
            <span v-else> 成為第一個按讚的人 </span>
          </a>
        </div>
        <div class="d-flex align-items-center">
          <img
            :src="profile?.photo"
            class="thumbnail thumbnail-lg me-2"
            v-if="profile?.photo"
          />
          <img
            src="../assets/images/user_default.png"
            class="thumbnail thumbnail-lg me-2"
            v-else
          />
          <div class="input-group flex-row-reverse">
            <button
              class="effectBtn btn btn-primary py-2 px-5 px-sm-10"
              type="button"
              id="sendmessage"
              :disabled="
                partLoading.type == 'comment' && partLoading.id == item._id
              "
              @click.prevent="addComment($event, item._id)"
            >
              留言
            </button>
            <input
              type="text"
              class="form-control py-2 border-end-0"
              placeholder="留言..."
              aria-label="sendmessage"
              aria-describedby="sendmessage"
              :disabled="
                partLoading.type == 'comment' && partLoading.id == item._id
              "
            />
          </div>
        </div>
      </div>
      <!-- 以組件方式排序 item.comments -->
      <CommentComponent
        :is="item._id"
        :postId="item._id"
        :comments="item.comments"
        @del-data="delData"
        @to-personalwall="toPersonalWall"
      ></CommentComponent>
    </li>
  </ul>
</template>

<script>
import CommentComponent from "@/components/CommentComponent.vue";
import { mapState, mapActions } from "pinia";
import statusStore from "@/stores/statusStore";
import modalStore from "@/stores/modalStore";
import userStore from "@/stores/userStore";

export default {
  name: "ArticleComponent",
  props: ["data", "profile", "postId"],
  emits: ["toggle-like", "update-comments"],
  methods: {
    // 開啟 DelModal
    delData(id, delItem) {
      const modal = {
        type: delItem,
        id,
        title: delItem == "post" ? "貼文" : "留言",
        content: "",
      };
      this.toggleDelModal(modal);
    },
    // 新增回覆
    addComment(e, id) {
      // 取得回覆內容
      const target = e.target.nextElementSibling;
      let content = target.value.trim();
      if (content) {
        this.$emit("update-comments", { postId: id, content });
      }
      target.value = "";
    },
    // 轉至 PersonalWall 頁面
    toPersonalWall(data) {
      const { _id } = data;
      this.togglePersonalInfo(data);
      this.$router.push({ path: `/personalwall/${_id}` });
    },
    ...mapActions(modalStore, ["toggleDelModal"]),
    ...mapActions(userStore, ["togglePersonalInfo"]),
  },
  computed: {
    ...mapState(statusStore, ["partLoading"]),
  },
  components: {
    CommentComponent,
  },
};
</script>
