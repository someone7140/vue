<template>
  <div>
    <HeaderComponent />
    <MailRegistAuthComponent />
    <FooterComponent />
  </div>
</template>

<script>
import FooterComponent from "~/components/common/FooterComponent.vue";
import HeaderComponent from "~/components/common/HeaderComponent.vue";
import MailRegistAuthComponent from "~/components/auth/mail/MailRegistAuthComponent.vue";

export default {
  components: {
    FooterComponent,
    HeaderComponent,
    MailRegistAuthComponent
  }
};
</script>
