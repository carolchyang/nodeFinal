<template>
  <ul class="mb-10">
    <li class="card" v-for="(item, key) in data" :key="key">
      <div class="mb-4">
        <a
          href="#"
          class="cardImgLink d-flex align-items-center"
          @click.prevent="
            $emit('to-personalwall', {
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
          <div class="fw-bold ms-4">
            {{ item.userId?.name }}
            <span class="d-block mt-1 text-light fs-7 fw-normal">
              {{ $getTime(item.createAt) }}
            </span>
          </div>
        </a>
        <a
          href="#"
          class="cardCloseBtn"
          @click.prevent="delData(item._id, 'post')"
          v-if="profile._id === item.userId?._id"
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
            v-if="likePostArray.includes(item._id)"
            @click.prevent="
              $emit('toggle-like', { id: item._id, type: 'cancel' })
            "
          >
            <i class="bi bi-hand-thumbs-up fs-4 me-2"></i>
            <span class="me-2">
              {{ item.likeCount }}
            </span>
            <span> 已按讚</span>
          </a>
          <a
            href="#"
            class="link-light thumbsIcon"
            v-else
            @click.prevent="
              $emit('toggle-like', { id: item._id, type: 'check' })
            "
          >
            <i class="bi bi-hand-thumbs-up fs-4 me-2"></i>
            <span v-if="item.likeCount > 0">
              {{ item.likeCount }}
            </span>
            <span v-else> 成為第一個按讚的人 </span>
          </a>
        </div>
        <div class="d-flex align-items-center">
          <img
            :src="item.userId?.photo"
            class="thumbnail thumbnail-lg me-2"
            v-if="item.userId?.photo"
          />
          <img
            src="../assets/images/user_default.png"
            class="thumbnail thumbnail-lg me-2"
            v-else
          />
          <div class="input-group flex-row-reverse">
            <button
              class="effectBtn btn btn-primary py-2 px-6 px-sm-10"
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
      <ul v-if="item.comment !== []">
        <li
          class="position-relative mb-4 p-4 bg-secondary rounded-2"
          v-for="commentItem in item.comments"
          :key="commentItem._id"
        >
          <div class="mb-3">
            <a
              href="#"
              class="cardImgLink d-flex align-items-center"
              @click.prevent="
                $emit('to-personalwall', {
                  _id: commentItem._id,
                  name: commentItem.user?.name,
                  photo: commentItem.user?.photo,
                })
              "
            >
              <img
                :src="commentItem.user?.photo"
                class="thumbnail thumbnail-lg"
                v-if="commentItem.user?.photo"
              />
              <img
                src="../assets/images/user_default.png"
                class="thumbnail thumbnail-lg"
                v-else
              />
              <div class="fw-bold ms-3">
                {{ commentItem.user?.name }}
                <span class="d-block mt-1 text-light fs-7 fw-normal">
                  {{ $getTime(commentItem.createdAt) }}
                </span>
              </div>
            </a>
            <a
              href="#"
              class="cardCloseBtn"
              @click.prevent="delData(commentItem._id, 'comment')"
              v-if="profile._id === commentItem.user?._id"
            >
              <i class="bi bi-x-lg"></i>
            </a>
          </div>

          <p class="ms-12">
            {{ commentItem.content }}
          </p>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
import { mapActions } from "pinia";
import modalStore from "@/stores/modalStore";
export default {
  name: "ArticleComponent",
  props: ["data", "profile", "likePostArray", "comments"],
  emits: ["get-all", "toggle-like", "update-comments", "to-personalwall"],
  data() {
    return {
      content: "",
    };
  },
  methods: {
    delData(id, delItem) {
      const modal = {
        type: delItem,
        id,
        title: delItem == "post" ? "貼文" : "留言",
        content: "",
      };
      this.toggleDelModal(modal);
    },
    addComment(e, id) {
      const content = e.target.nextElementSibling.value.trim();
      if (content) {
        this.$emit("update-comments", { postId: id, content });
      }
    },
    ...mapActions(modalStore, ["toggleDelModal"]),
  },
};
</script>
