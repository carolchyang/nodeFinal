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
          class="effectBtn btn btn-primary py-0 px-3"
          type="button"
          id="search"
        >
          <i class="bi bi-search h3"></i>
        </button>
      </div>
    </div>
  </div>

  <ul>
    <li class="card">
      <div class="d-flex align-items-center mb-4">
        <img
          src="../../assets/images/user1.png"
          class="thumbnail thumbnail-xl"
        />
        <div class="fw-bold ms-4">
          <router-link to="/personalwall" class="link-dark"
            >邊緣小杰</router-link
          >
          <span class="d-block text-light fs-7 fw-normal">2022/1/10 12:00</span>
        </div>
        <a
          href="#"
          class="cardCloseBtn d-block"
          @click.prevent="toggleDelModal('貼文')"
        >
          <i class="bi bi-x-lg"></i>
        </a>
      </div>
      <div class="mb-5">
        <p class="mb-4">
          外面看起來就超冷....
          <br />
          我決定回被窩繼續睡....&gt;.&lt;
        </p>
        <img src="../../assets/images/image1.png" class="bgCover mb-4" />
        <!-- 按讚 -->
        <div class="mb-4">
          <a href="#" class="link-primary">
            <i class="bi bi-hand-thumbs-up fs-4 me-2"></i>
            <span class="text-dark">12</span>
          </a>
          <a href="#" class="d-none link-light">
            <i class="bi bi-hand-thumbs-up fs-4 me-2"></i>
            <span>成為第一個按讚的朋友</span>
          </a>
        </div>
        <!-- 留言 -->
        <div class="d-flex align-items-center">
          <img
            src="../../assets/images/user1.png"
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
              class="effectBtn btn btn-primary py-2 px-6 px-sm-10"
              type="button"
              id="sendmessage"
            >
              留言
            </button>
          </div>
        </div>
      </div>
      <ul>
        <li class="position-relative mb-4 p-4 bg-secondary rounded-2">
          <div class="d-flex align-items-center mb-1">
            <img
              src="../../assets/images/user2.png"
              class="thumbnail thumbnail-lg"
            />
            <div class="ms-3">
              <router-link to="/personalwall" class="link-dark"
                >希琳</router-link
              >
              <span class="d-block text-light fs-7 fw-normal"
                >2022/1/10 12:00</span
              >
              <a
                href="#"
                class="cardCloseBtn"
                @click.prevent="toggleDelModal()"
              >
                <i class="bi bi-x-lg"></i>
              </a>
            </div>
          </div>
          <p class="ms-12">真的～我已經準備冬眠了</p>
        </li>
        <li class="position-relative mb-4 p-4 bg-secondary rounded-2">
          <div class="d-flex align-items-center mb-1">
            <img
              src="../../assets/images/user3.png"
              class="thumbnail thumbnail-lg"
            />
            <div class="ms-3">
              <router-link to="/personalwall" class="link-dark"
                >波吉</router-link
              >
              <span class="d-block text-light fs-7 fw-normal"
                >2022/1/10 12:00</span
              >
              <a
                href="#"
                class="cardCloseBtn"
                @click.prevent="toggleDelModal()"
              >
                <i class="bi bi-x-lg"></i>
              </a>
            </div>
          </div>
          <p class="ms-12">會嗎？我沒穿衣服都不覺得冷</p>
        </li>
        <li class="position-relative p-4 bg-secondary rounded-2">
          <div class="d-flex align-items-center mb-1">
            <img
              src="../../assets/images/user1.png"
              class="thumbnail thumbnail-lg"
            />
            <div class="ms-3">
              <router-link to="/personalwall" class="link-dark">
                邊緣小杰
              </router-link>
              <span class="d-block text-light fs-7 fw-normal"
                >2022/1/10 12:00</span
              >
              <a
                href="#"
                class="cardCloseBtn d-block"
                @click.prevent="toggleDelModal('留言')"
              >
                <i class="bi bi-x-lg"></i>
              </a>
            </div>
          </div>
          <p class="ms-12">我來捧自己的場</p>
        </li>
      </ul>
    </li>
    <li class="card">
      <div class="d-flex align-items-center mb-4">
        <img
          src="../../assets/images/user2.png"
          class="thumbnail thumbnail-xl"
        />
        <div class="fw-bold ms-4">
          <router-link to="/personalwall" class="link-dark"
            >邊緣小杰</router-link
          >
          <span class="d-block text-light fs-7 fw-normal">2022/1/10 12:00</span>
        </div>
        <a
          href="#"
          class="cardCloseBtn"
          @click.prevent="toggleDelModal('貼文')"
        >
          <i class="bi bi-x-lg"></i>
        </a>
      </div>
      <div class="">
        <p class="mb-4">搶到想要的 NFT 啦！ya~~</p>
        <img
          src="../../assets/images/image2.png"
          class="bgCover rounded mb-4"
        />
        <!-- 按讚 -->
        <div class="mb-4">
          <a href="#" class="d-none link-primary">
            <i class="bi bi-hand-thumbs-up fs-4 me-2"></i>
            <span class="text-dark">12</span>
          </a>
          <a href="#" class="link-light">
            <i class="bi bi-hand-thumbs-up fs-4 me-2"></i>
            <span>成為第一個按讚的朋友</span>
          </a>
        </div>
        <!-- 留言 -->
        <div class="d-flex align-items-center">
          <img
            src="../../assets/images/user1.png"
            class="thumbnail thumbnail-lg me-2"
          />
          <div class="input-group">
            <input
              type="text"
              class="form-control py-2"
              placeholder="留言..."
              aria-label="sendmessage"
              aria-describedby="sendmessage"
              value="好羨慕ㄛ!!"
            />
            <button
              class="effectBtn btn btn-primary py-2 px-6 px-sm-10"
              type="button"
              id="sendmessage"
            >
              留言
            </button>
          </div>
        </div>
      </div>
      <ul></ul>
    </li>
  </ul>

  <EmptyCardComponent class="d-none">
    <template #default>目前尚無動態，新增一則貼文吧！</template>
  </EmptyCardComponent>

  <DelModalComponent>
    <template #default>
      確定要刪除此則
      <b class="text-danger">{{ modal.title }}</b>
      ？（刪除後無法回復）
    </template>
  </DelModalComponent>
</template>

<script>
import EmptyCardComponent from "@/components/EmptyCardComponent.vue";
import DelModalComponent from "@/components/DelModalComponent.vue";
import { mapState, mapActions } from "pinia";
import modalStore from "@/stores/modalStore";

export default {
  name: "PersonalWallView",
  methods: {
    ...mapActions(modalStore, ["toggleDelModal"]),
  },
  computed: {
    ...mapState(modalStore, ["modal"]),
  },
  components: {
    EmptyCardComponent,
    DelModalComponent,
  },
};
</script>
