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
export default {
  name: "NavbarComponent",
};
</script>
