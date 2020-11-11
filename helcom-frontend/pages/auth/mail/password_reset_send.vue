<template>
  <div>
    <HeaderComponent />
    <PasswordResetSendComponent />
    <FooterComponent />
  </div>
</template>

<script>
import FooterComponent from "~/components/common/FooterComponent.vue";
import HeaderComponent from "~/components/common/HeaderComponent.vue";
import PasswordResetSendComponent from "~/components/auth/mail/PasswordResetSendComponent.vue";

export default {
  components: {
    FooterComponent,
    HeaderComponent,
    PasswordResetSendComponent,
  },
};
</script>
