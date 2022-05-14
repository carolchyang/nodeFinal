<template>
  <aside class="aside">
    <div class="asideContent">
      <router-link
        to="/createpost"
        class="effectBtn d-none d-lg-block btn btn-primary w-100 mb-6 fw-bold"
        >張貼動態</router-link
      >
      <ul class="asideList">
        <li class="d-none d-lg-flex mb-9">
          <router-link to="/" class="asideLink">
            <img
              src="../assets/images/user1.png"
              class="thumbnail thumbnail-xl"
            />
            <h5 class="ms-4 fw-bolder">邊緣小杰</h5>
          </router-link>
        </li>
        <li class="d-lg-none">
          <router-link to="/" class="asideLink">
            <div class="asideLinkIcon">
              <i class="bi bi-house-door"></i>
            </div>
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
          <router-link to="/likepost" class="asideLink">
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
export default {
  name: "AsideComponent",
};
</script>
