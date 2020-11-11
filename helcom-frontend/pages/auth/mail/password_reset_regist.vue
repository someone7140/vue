<template>
  <div>
    <HeaderComponent />
    <PasswordResetRegistComponent />
    <FooterComponent />
  </div>
</template>

<script>
import FooterComponent from "~/components/common/FooterComponent.vue";
import HeaderComponent from "~/components/common/HeaderComponent.vue";
import PasswordResetRegistComponent from "~/components/auth/mail/PasswordResetRegistComponent.vue";

export default {
  components: {
    FooterComponent,
    HeaderComponent,
    PasswordResetRegistComponent,
  },
};
</script>
