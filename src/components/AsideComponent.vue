<template>
  <aside class="aside">
    <div class="asideContent">
      <router-link
        to="/createpost"
        class="effectBtn d-none d-lg-block btn btn-primary w-100 mb-6 fw-bold"
      >
        張貼動態
      </router-link>
      <ul class="asideList">
        <li class="mb-lg-8">
          <a href="#" class="asideLink" @click.prevent="toPersonalWall">
            <img
              :src="profile.photo"
              class="thumbnail thumbnail-xl"
              v-if="profile.photo"
            />
            <img
              src="../assets/images/user_default.png"
              class="thumbnail thumbnail-xl"
              v-else
            />
            <h5 class="d-none d-lg-block ms-4 fw-bolder">
              {{ profile.name }} 的貼文牆
            </h5>
          </a>
        </li>
        <li class="mb-lg-8">
          <router-link to="/" class="asideLink">
            <div class="asideLinkIcon">
              <i class="bi bi-house-door"></i>
            </div>
            <h5 class="d-none d-lg-block ms-4 fw-bolder">全體動態牆</h5>
          </router-link>
        </li>
        <li class="mb-lg-8">
          <router-link to="/track" class="asideLink">
            <div class="asideLinkIcon">
              <i class="bi bi-bell"></i>
            </div>
            <h5 class="d-none d-lg-block ms-4 fw-bolder">追蹤名單</h5>
          </router-link>
        </li>
        <li>
          <router-link to="/likeposts" class="asideLink">
            <div class="asideLinkIcon">
              <i class="bi bi-hand-thumbs-up"></i>
            </div>
            <h5 class="d-none d-lg-block ms-4 fw-bolder">我按讚的文章</h5>
          </router-link>
        </li>
        <li class="d-lg-none">
          <router-link to="/createpost" class="asideLink">
            <div class="asideLinkIcon">
              <i class="bi bi-plus-lg"></i>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
import { mapState } from "pinia";
import userStore from "@/stores/userStore";

export default {
  name: "AsideComponent",
  methods: {
    toPersonalWall() {
      const id = this.profile._id;
      this.$router.push({ path: `/personalwall/${id}` });
    },
  },
  computed: {
    ...mapState(userStore, ["profile"]),
  },
};
</script>
