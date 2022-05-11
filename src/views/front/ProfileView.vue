<template>
  <div
    class="customShadow customShadow-start mb-4 p-5 bg-white text-center h4 border border-2 fw-bold"
  >
    修改個人資料
  </div>

  <nav class="customTabNav">
    <div class="nav nav-tabs" id="nav-tab" role="tablist">
      <button
        class="nav-link active"
        id="nav-profile-tab"
        data-bs-toggle="tab"
        data-bs-target="#nav-profile"
        type="button"
        role="tab"
        aria-controls="nav-profile"
        aria-selected="true"
      >
        暱稱修改
      </button>
      <button
        class="nav-link"
        id="nav-password-tab"
        data-bs-toggle="tab"
        data-bs-target="#nav-password"
        type="button"
        role="tab"
        aria-controls="nav-password"
        aria-selected="false"
      >
        重設密碼
      </button>
    </div>
  </nav>
  <div class="tab-content customTabContent" id="nav-tabContent">
    <div
      class="tab-pane fade show active"
      id="nav-profile"
      role="tabpanel"
      aria-labelledby="nav-profile-tab"
    >
      <img
        src="../../assets/images/user_default.png"
        class="thumbnail thumbnail-xxl mx-auto mb-4"
      />
      <div class="customFileBtn text-center mb-4">
        <label for="file" class="">上傳大頭照</label>
        <input class="" type="file" id="file" />
      </div>
      <div class="mb-4">
        <label for="nickname" class="form-label">暱稱</label>
        <input
          type="text"
          id="nickname"
          class="form-control"
          placeholder="請輸入暱稱"
        />
        <small class="text-danger"></small>
      </div>
      <div class="mb-8">
        <h3 class="mb-2 h5 fw-normal">性別</h3>
        <div class="form-check form-check-inline me-6">
          <input
            class="form-check-input"
            type="radio"
            name="sex"
            id="male"
            value="male"
            checked="checked"
          />
          <label class="form-check-label" for="male">男生</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="sex"
            id="female"
            value="female"
          />
          <label class="form-check-label" for="female">女生</label>
        </div>
      </div>
      <small class="d-block mb-4 text-center text-danger">
        1.圖片寬高比必需為 1:1，請重新輸入
        <br />
        2. 解析度寬度至少 300像素以上，請重新輸入
      </small>
      <button
        type="button"
        class="hoverBtn btn btn-primary w-100 border-dark rounded-2 shadow"
      >
        送出更新
      </button>
    </div>
    <div
      class="tab-pane fade"
      id="nav-password"
      role="tabpanel"
      aria-labelledby="nav-password-tab"
    >
      <div class="mb-4">
        <label for="password" class="form-label">輸入新密碼</label>
        <input
          type="password"
          id="password"
          class="form-control"
          placeholder="請輸入新密碼"
        />
        <small class="text-danger"></small>
      </div>
      <div class="mb-8">
        <label for="checkPassword" class="form-label">再次輸入</label>
        <input
          type="password"
          id="checkPassword"
          class="form-control"
          placeholder="再次輸入新密碼"
        />
        <small class="text-danger">密碼不符合</small>
      </div>
      <button
        type="button"
        class="hoverBtn btn btn-primary w-100 border-dark rounded-2 shadow"
      >
        重設密碼
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileView",
};
</script>
