<template>
  <div class="px-6 py-8 bg-white border border-2 d-none d-lg-block">
    <router-link
      to="/createpost"
      class="hoverBtn btn btn-primary w-100 mb-6 border-dark rounded-2 shadow fw-bold"
      >張貼動態</router-link
    >
    <ul class="list-unstyled px-3">
      <li class="d-flex align-items-center mb-9">
        <router-link to="/" class="asideLink">
          <img src="../assets/images/user.png" class="thumbnail thumbnail-xl" />
          <h5 class="ms-4 fw-bolder">邊緣小杰</h5>
        </router-link>
      </li>
      <li class="mb-8">
        <router-link to="/track" class="asideLink">
          <div class="asideLinkIcon">
            <i class="bi bi-bell"></i>
          </div>
          <h5 class="ms-4 fw-bolder">追蹤名單</h5>
        </router-link>
      </li>
      <li>
        <router-link to="/likepost" class="asideLink">
          <div class="asideLinkIcon">
            <i class="bi bi-hand-thumbs-up"></i>
          </div>
          <h5 class="ms-4 fw-bolder">我按讚的文章</h5>
        </router-link>
      </li>
    </ul>
  </div>

  <div class="asideContainer">
    <div class="aside">
      <ul class="list-unstyled d-flex justify-content-center mb-0">
        <li class="me-6">
          <router-link to="/" class="asideLink">
            <div class="asideLinkIcon">
              <i class="bi bi-house-door"></i>
            </div>
          </router-link>
        </li>
        <li class="me-6">
          <router-link to="/track" class="asideLink">
            <div class="asideLinkIcon">
              <i class="bi bi-bell"></i>
            </div>
          </router-link>
        </li>
        <li class="me-6">
          <router-link to="/likepost" class="asideLink">
            <div class="asideLinkIcon">
              <i class="bi bi-hand-thumbs-up"></i>
            </div>
          </router-link>
        </li>
        <li>
          <router-link to="/createpost" class="asideLink">
            <div class="asideLinkIcon">
              <i class="bi bi-plus-lg"></i>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "AsideComponent",
};
</script>
