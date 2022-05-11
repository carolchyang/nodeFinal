<template>
  <NavbarComponent></NavbarComponent>
  <main class="container py-11">
    <div class="row">
      <div class="col-12 col-lg-8">
        <router-view></router-view>
      </div>

      <div class="col-lg-4">
        <AsideComponent></AsideComponent>
      </div>
    </div>
  </main>
</template>

<script>
import NavbarComponent from "@/components/NavbarComponent";
import AsideComponent from "@/components/AsideComponent";

export default {
  name: "LayoutView",
  components: {
    NavbarComponent,
    AsideComponent,
  },
};
</script>
