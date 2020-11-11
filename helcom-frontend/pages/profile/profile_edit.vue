<template>
  <div>
    <HeaderComponent />
    <div class="container main">
      <MyPageHeaderComponent />
      <div class="form-group text-center pt-5">
        <h1 class="m-5 pt-5">プロフィール編集</h1>
        <ProfileRegistComponent :editFlg="editFlg" />
      </div>
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
    ProfileRegistComponent,
  },
  data() {
    return {
      editFlg: true,
    };
  },
};
</script>
