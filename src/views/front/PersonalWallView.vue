<template>
  <div
    class="customShadow customShadow-start customShadow-rounded d-flex align-items-center mb-5 mb-md-4 pe-5 bg-white border border-2"
  >
    <div
      class="bgCover bgCover-sm border-end border-2 rounded-start"
      :style="{
        'background-image': `url(${require('@/assets/images/user52.png')})`,
      }"
    ></div>
    <div class="flex-grow-1 ms-4 fw-bold">
      阿爾敏
      <span class="d-block mr-auto fw-normal">987,987 人追蹤</span>
    </div>
    <!-- <button
      type="button"
      class="btn btn-secondary py-2 px-8 border-dark fw-bold shadow"
    >
      取消追蹤
    </button> -->
    <button
      type="button"
      class="btn btn-warning py-2 px-8 border-dark fw-bold shadow"
    >
      追蹤
    </button>
  </div>

  <div class="row g-3 mb-4">
    <div class="col-12 col-md-4">
      <select class="form-select form-select-sm">
        <option value="最新貼文" selected>最新貼文</option>
        <option value="熱門貼文">熱門貼文</option>
      </select>
    </div>
    <div class="col-12 col-md-8">
      <div class="input-group input-group-sm">
        <input
          type="text"
          class="form-control"
          placeholder="搜尋貼文"
          aria-label="search"
          aria-describedby="search"
        />
        <button
          class="btn btn-primary py-0 px-3 border-dark"
          type="button"
          id="search"
        >
          <i class="bi bi-search h3"></i>
        </button>
      </div>
    </div>
  </div>

  <div>
    <div class="mb-4 p-6 bg-white border border-2 rounded shadow-sm">
      <div class="d-flex align-items-center mb-4">
        <img
          src="../../assets/images/user52.png"
          class="thumbnail thumbnail-xl"
        />
        <div class="fw-bold ms-4">
          <router-link to="/" class="hoverLink">阿爾敏</router-link>
          <span class="d-block text-light fs-7 fw-normal">2022/1/10 12:00</span>
        </div>
      </div>
      <p class="mb-4">
        今天找到一張大海的照片
        <br />
        太美拉～～～
      </p>
      <img
        src="../../assets/images/image3.png"
        class="bgCover bgCover-lg border border-2 rounded mb-4"
      />
      <div class="mb-4">
        <a href="#">
          <i class="bi bi-hand-thumbs-up fs-4 me-2"></i>
          <span class="text-dark">12</span>
        </a>
        <a href="#" class="d-none text-light">
          <i class="bi bi-hand-thumbs-up fs-4 me-2"></i>
          <span>成為第一個按讚的朋友</span>
        </a>
      </div>
      <div class="d-flex align-items-center mb-5">
        <img
          src="../../assets/images/user.png"
          class="thumbnail thumbnail-lg me-2"
        />
        <div class="input-group">
          <input
            type="text"
            class="form-control py-2"
            placeholder="搜尋貼文"
            aria-label="sendmessage"
            aria-describedby="sendmessage"
          />
          <button
            class="btn btn-primary py-2 px-6 px-sm-10 border-dark rounded-0"
            type="button"
            id="sendmessage"
          >
            留言
          </button>
        </div>
      </div>
      <ul class="list-unstyled mb-0">
        <li class="mb-4 p-4 bg-secondary rounded-2">
          <div class="d-flex align-items-center mb-1">
            <img
              src="../../assets/images/user.png"
              class="thumbnail thumbnail-lg"
            />
            <div class="ms-3">
              <router-link to="/" class="hoverLink">邊緣小杰</router-link>
              <span class="d-block text-light fs-7 fw-normal"
                >2022/1/10 12:00</span
              >
            </div>
          </div>
          <p class="ms-12">真的～我已經準備冬眠了</p>
        </li>
        <li class="mb-4 p-4 bg-secondary rounded-2">
          <div class="d-flex align-items-center mb-1">
            <img
              src="../../assets/images/user.png"
              class="thumbnail thumbnail-lg"
            />
            <div class="ms-3">
              <router-link to="/" class="hoverLink">邊緣小杰</router-link>
              <span class="d-block text-light fs-7 fw-normal"
                >2022/1/10 12:00</span
              >
            </div>
          </div>
          <p class="ms-12">真的～我已經準備冬眠了</p>
        </li>
        <li class="p-4 bg-secondary rounded-2">
          <div class="d-flex align-items-center mb-1">
            <img
              src="../../assets/images/user.png"
              class="thumbnail thumbnail-lg"
            />
            <div class="ms-3">
              <router-link to="/" class="hoverLink">邊緣小杰</router-link>
              <span class="d-block text-light fs-7 fw-normal"
                >2022/1/10 12:00</span
              >
            </div>
          </div>
          <p class="ms-12">真的～我已經準備冬眠了</p>
        </li>
      </ul>
    </div>

    <div class="mb-4 p-6 bg-white border border-2 rounded shadow-sm">
      <div class="d-flex align-items-center mb-4">
        <img
          src="../../assets/images/user52.png"
          class="thumbnail thumbnail-xl"
        />
        <div class="fw-bold ms-4">
          <router-link to="/" class="hoverLink">阿爾敏</router-link>
          <span class="d-block text-light fs-7 fw-normal">2022/1/10 12:00</span>
        </div>
      </div>
      <p class="mb-4">各位我有一個作戰計畫</p>
      <div class="mb-4">
        <a href="#" class="d-none">
          <i class="bi bi-hand-thumbs-up fs-4 me-2"></i>
          <span class="text-dark">12</span>
        </a>
        <a href="#" class="text-light">
          <i class="bi bi-hand-thumbs-up fs-4 me-2"></i>
          <span>成為第一個按讚的朋友</span>
        </a>
      </div>
      <div class="d-flex align-items-center">
        <img
          src="../../assets/images/user.png"
          class="thumbnail thumbnail-lg me-2"
        />
        <div class="input-group">
          <input
            type="text"
            class="form-control py-2"
            placeholder="搜尋貼文"
            aria-label="sendmessage"
            aria-describedby="sendmessage"
            value="好羨慕ㄛ！！"
          />
          <button
            class="btn btn-primary py-2 px-6 px-sm-10 border-dark rounded-0"
            type="button"
            id="sendmessage"
          >
            留言
          </button>
        </div>
      </div>
      <ul class="list-unstyled mb-0"></ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "PersonalWallView",
};
</script>
