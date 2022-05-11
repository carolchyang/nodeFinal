<template>
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

  <div class="">
    <div class="mb-4 p-6 bg-white border border-2 rounded shadow-sm">
      <div class="d-flex align-items-center mb-4">
        <img
          src="../../assets/images/user.png"
          class="thumbnail thumbnail-xl"
        />
        <div class="fw-bold ms-4">
          <router-link to="/personalwall" class="hoverLink"
            >邊緣小杰</router-link
          >
          <span class="d-block text-light fs-7 fw-normal">2022/1/10 12:00</span>
        </div>
      </div>
      <p class="mb-4">
        外面看起來就超冷....
        <br />
        我決定回被窩繼續睡....&gt;.&lt;
      </p>
      <img
        src="../../assets/images/image.png"
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
            placeholder="留言..."
            aria-label="sendmessage"
            aria-describedby="sendmessage"
          />
          <button
            class="btn btn-primary py-2 px-6 px-sm-10 border-dark rounded-0 hoverBtn"
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
              src="../../assets/images/user5.png"
              class="thumbnail thumbnail-lg"
            />
            <div class="ms-3">
              <router-link to="/personalwall" class="hoverLink"
                >希琳</router-link
              >
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
              src="../../assets/images/user54.png"
              class="thumbnail thumbnail-lg"
            />
            <div class="ms-3">
              <router-link to="/personalwall" class="hoverLink"
                >波吉</router-link
              >
              <span class="d-block text-light fs-7 fw-normal"
                >2022/1/10 12:00</span
              >
            </div>
          </div>
          <p class="ms-12">會嗎？我沒穿衣服都不覺得冷</p>
        </li>
      </ul>
    </div>

    <div class="mb-4 p-6 bg-white border border-2 rounded shadow-sm">
      <div class="d-flex align-items-center mb-4">
        <img
          src="../../assets/images/user5.png"
          class="thumbnail thumbnail-xl"
        />
        <div class="fw-bold ms-4">
          <router-link to="/personalwall" class="hoverLink">米卡莎</router-link>
          <span class="d-block text-light fs-7 fw-normal">2022/1/10 12:00</span>
        </div>
      </div>
      <p class="mb-4">搶到想要的 NFT 啦！ya~~</p>
      <img
        src="../../assets/images/image2.png"
        class="bgCover bgCover-lg border border-2 rounded mb-4"
      />
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
            value="好羨慕ㄛ！！"
          />
          <button
            class="hoverBtn btn btn-primary py-2 px-6 px-sm-10 border-dark rounded-0"
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

  <div class="d-none bg-white border border-2 rounded shadow-sm">
    <div class="p-4 border-bottom border-2 border-dark">
      <ul class="list-unstyled m-0 d-flex">
        <li class="circle me-2"></li>
        <li class="circle circle-1 me-2"></li>
        <li class="circle circle-2"></li>
      </ul>
    </div>
    <div class="py-8 text-center text-light">
      目前尚無動態，新增一則貼文吧！
    </div>
  </div>
</template>

<script>
export default {
  name: "DynamicWallView",
};
</script>
