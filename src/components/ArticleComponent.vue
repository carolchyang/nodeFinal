<template>
  <ul class="mb-10">
    <li class="card" v-for="(item, key) in data" :key="key">
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
          @click.prevent="delData(item._id, 'post')"
          v-if="profile._id === item.userId?._id && !postId"
        >
          <i class="bi bi-x-lg"></i>
        </a>
      </div>
      <div class="mb-5">
        <p class="mb-4">
          {{ item.content }}
        </p>
        <div
          class="bgCover mb-4"
          :style="{ backgroundImage: 'url(' + item.imageId + ')' }"
          v-if="item.imageId"
        ></div>
        <div class="mb-4">
          <a
            href="#"
            class="link-primary thumbsIcon"
            v-if="item.likeCount?.length"
            @click.prevent="
              $emit('toggle-like', { id: item._id, type: 'cancel' })
            "
          >
            <i class="bi bi-hand-thumbs-up fs-4 me-2"></i>
            <span class="me-2">
              {{ item.likeCount?.length }}
            </span>
            <span> 已按讚</span>
          </a>
          <a
            href="#"
            class="link-light thumbsIcon"
            v-if="!item.likeCount?.length"
            @click.prevent="
              $emit('toggle-like', { id: item._id, type: 'check' })
            "
          >
            <i class="bi bi-hand-thumbs-up fs-4 me-2"></i>
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
            />
          </div>
        </div>
      </div>
      <!-- 以組件方式排序 item.comments -->
      <CommentComponent
        :is="item._id"
        :comments="item.comments"
        @del-data="delData"
        @to-personalwall="toPersonalWall"
      ></CommentComponent>
    </li>
  </ul>
</template>

<script>
import CommentComponent from "@/components/CommentComponent.vue";
import { mapActions } from "pinia";
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
  components: {
    CommentComponent,
  },
};
</script>
