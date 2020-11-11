<template>
  <div>
    <HeaderComponent />
    <LoginComponent />
    <FooterComponent />
  </div>
</template>

<script>
import FooterComponent from "~/components/common/FooterComponent.vue";
import HeaderComponent from "~/components/common/HeaderComponent.vue";
import LoginComponent from "~/components/auth/LoginComponent.vue";

export default {
  components: {
    FooterComponent,
    HeaderComponent,
    LoginComponent
  }
};
</script>
