<template>
  <div>
    <HeaderComponent />
    <div class="container main">
      <MyPageHeaderComponent />
      <div class="form-group text-center pt-5">
        <h1 class="m-5 pt-5">メールアドレス変更</h1>
      </div>
      <MailChangeComponent />
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import FooterComponent from "~/components/common/FooterComponent.vue";
import HeaderComponent from "~/components/common/HeaderComponent.vue";
import MailChangeComponent from "~/components/auth/mail/MailChangeComponent.vue";

export default {
  middleware: "authCheck",
  components: {
    FooterComponent,
    HeaderComponent,
    MailChangeComponent,
  },
};
</script>
