<template>
  <div class="navbar">
    <div class="container d-flex justify-content-between align-items-center">
      <router-link to="/" class="navbarBrand">MetaWall</router-link>
      <div class="d-flex align-items-center">
        <img src="../assets/images/user1.png" class="thumbnail thumbnail-sm" />
        <div class="dropdown">
          <a
            class="dropdown-toggle ms-3 border-bottom border-2 text-dark fw-bolder"
            href="#"
            role="button"
            id="dropdownMenuLink"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Member
          </a>
          <ul
            class="dropdown-menu dropdown-menu-end customShadow text-center"
            aria-labelledby="dropdownMenuLink"
          >
            <li class="bg-white border border-2 border-bottom-0">
              <router-link to="/" class="dropdown-item">我的貼文牆</router-link>
            </li>
            <li class="bg-white border border-2 border-bottom-0">
              <router-link to="/profile" class="dropdown-item"
                >修改個人資料</router-link
              >
            </li>
            <li class="bg-white border border-2">
              <a
                href="#"
                class="dropdown-item"
                @click.prevent="toggleDelModal('登出')"
              >
                登出
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <DelModalComponent :temp="modalItem" @logout="logout">
    <template #default>
      確定要登出
      <b class="text-danger">{{ modalItem }}</b>
      ？（登出後請重新登入）
    </template>
  </DelModalComponent>
</template>

<script>
import DelModalComponent from "@/components/DelModalComponent.vue";
import { bsModal } from "@/scripts/methods";

export default {
  name: "NavbarComponent",
  data() {
    return {
      modalItem: "",
    };
  },
  methods: {
    toggleDelModal(item) {
      this.modalItem = item;
      this.bsModal = bsModal("delModal");
      this.bsModal.show();
    },
    logout() {
      this.$router.push("/login");
      this.bsModal.hide();
    },
  },
  components: {
    DelModalComponent,
  },
};
</script>
