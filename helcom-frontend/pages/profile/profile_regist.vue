<template>
  <div>
    <HeaderComponent />
    <div class="container text-center">
      <h1 class="m-5 pt-5">プロフィール登録</h1>
      <ProfileRegistComponent />
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import FooterComponent from "~/components/common/FooterComponent.vue";
import HeaderComponent from "~/components/common/HeaderComponent.vue";
import ProfileRegistComponent from "~/components/profile/ProfileRegistComponent.vue";

export default {
  middleware: "authCheck",
  components: {
    FooterComponent,
    HeaderComponent,
    ProfileRegistComponent
  }
};
</script>
