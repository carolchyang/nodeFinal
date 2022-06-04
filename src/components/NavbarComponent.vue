<template>
  <div class="navbar">
    <div class="container d-flex justify-content-between align-items-center">
      <router-link to="/" class="navbarBrand">MetaWall</router-link>
      <div class="d-flex align-items-center">
        <img
          :src="profile.photo"
          class="thumbnail thumbnail-sm"
          v-if="profile.photo"
        />
        <img
          src="../assets/images/user_default.png"
          class="thumbnail thumbnail-sm"
          v-else
        />
        <div class="dropdown">
          <a
            class="dropdown-toggle ms-3 px-2 border-bottom border-2 text-dark fw-bolder"
            href="#"
            role="button"
            id="dropdownMenuLink"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {{ profile.name }}
          </a>
          <ul
            class="dropdown-menu dropdown-menu-end customShadow text-center"
            aria-labelledby="dropdownMenuLink"
          >
            <li class="bg-white border border-2 border-bottom-0">
              <a
                href="#"
                @click.prevent="toPersonalWall"
                class="dropdown-item"
                :class="{
                  active:
                    $route.name === 'PersonalWallView' && 'router-link-active',
                }"
              >
                我的貼文牆
              </a>
            </li>
            <li class="bg-white border border-2 border-bottom-0">
              <router-link to="/" class="dropdown-item">全體動態牆</router-link>
            </li>
            <li class="bg-white border border-2 border-bottom-0">
              <router-link to="/profile" class="dropdown-item">
                修改個人資料
              </router-link>
            </li>
            <li class="bg-white border border-2">
              <a
                href="#"
                class="dropdown-item"
                @click.prevent="$emit('sign-out')"
              >
                登出
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import userStore from "@/stores/userStore";

export default {
  name: "NavbarComponent",
  methods: {
    toPersonalWall() {
      const _id = this.profile._id;
      this.togglePersonInfo(this.profile);
      this.$router.push({ path: `/personalwall/${_id}` });
    },
    ...mapActions(userStore, ["togglePersonInfo"]),
  },
  computed: {
    ...mapState(userStore, ["profile"]),
  },
};
</script>
