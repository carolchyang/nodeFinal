<template>
  <ul v-if="newComment.length">
    <li
      class="position-relative mb-4 p-4 bg-secondary rounded-2"
      v-for="commentItem in newComment"
      :key="commentItem._id"
    >
      <div class="d-flex align-items-center mb-3">
        <a
          href="#"
          class="cardImgLink"
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
        </a>
        <div class="fw-bold ms-3">
          {{ commentItem.user?.name }}
          <span class="d-block mt-1 text-light fs-7 fw-normal">
            {{ $getTime(commentItem.createAt) }}
          </span>
        </div>
        <a
          href="#"
          class="cardCloseBtn"
          @click.prevent="$emit('del-data', commentItem._id, 'comment')"
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
</template>

<script>
import { mapState } from "pinia";
import userStore from "@/stores/userStore";

export default {
  name: "CommentComponent",
  props: ["comments"],
  emits: ["del-data", "to-personalwall"],
  computed: {
    newComment() {
      let newComment = this.comments;
      newComment.sort((a, b) => {
        return new Date(b.createAt).getTime() - new Date(a.createAt).getTime();
      });
      return newComment;
    },
    ...mapState(userStore, ["profile"]),
  },
};
</script>
