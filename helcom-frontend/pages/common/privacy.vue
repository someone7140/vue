<template>
  <div>
    <HeaderComponent />
    <PrivacyComponent />
    <FooterComponent />
  </div>
</template>

<script>
import FooterComponent from "~/components/common/FooterComponent.vue";
import HeaderComponent from "~/components/common/HeaderComponent.vue";
import PrivacyComponent from "~/components/proviso/PrivacyComponent.vue";

export default {
  components: {
    FooterComponent,
    HeaderComponent,
    PrivacyComponent
  }
};
</script>
