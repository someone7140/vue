<template>
  <div>
    <HeaderComponent />
    <div class="container main">
      <MyPageHeaderComponent nowPage="password_change" />
      <div class="form-group text-center pt-5">
        <h1 class="m-5 pt-5">パスワード変更</h1>
      </div>
      <PasswordChangeComponent />
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import FooterComponent from "~/components/common/FooterComponent.vue";
import HeaderComponent from "~/components/common/HeaderComponent.vue";
import PasswordChangeComponent from "~/components/auth/mail/PasswordChangeComponent.vue";

export default {
  middleware: "authCheck",
  components: {
    FooterComponent,
    HeaderComponent,
    PasswordChangeComponent,
  },
};
</script>
