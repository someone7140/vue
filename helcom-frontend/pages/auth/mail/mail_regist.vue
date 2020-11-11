<template>
  <div>
    <HeaderComponent />
    <MailRegistComponent />
    <FooterComponent />
  </div>
</template>

<script>
import FooterComponent from "~/components/common/FooterComponent.vue";
import HeaderComponent from "~/components/common/HeaderComponent.vue";
import MailRegistComponent from "~/components/auth/mail/MailRegistComponent.vue";

export default {
  components: {
    FooterComponent,
    HeaderComponent,
    MailRegistComponent
  }
};
</script>
