<template>
  <div>
    <HeaderComponent />
    <div class="container main">
      <MyPageHeaderComponent />
      <UserCancelComponent />
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import FooterComponent from "~/components/common/FooterComponent.vue";
import HeaderComponent from "~/components/common/HeaderComponent.vue";
import MyPageHeaderComponent from "~/components/profile/MyPageHeaderComponent.vue";
import UserCancelComponent from "~/components/user/UserCancelComponent.vue";

export default {
  middleware: "authCheck",
  components: {
    FooterComponent,
    HeaderComponent,
    MyPageHeaderComponent,
    UserCancelComponent,
  },
};
</script>
