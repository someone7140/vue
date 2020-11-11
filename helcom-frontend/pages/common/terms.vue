<template>
  <div>
    <HeaderComponent />
    <TermsComponent />
    <FooterComponent />
  </div>
</template>

<script>
import FooterComponent from "~/components/common/FooterComponent.vue";
import HeaderComponent from "~/components/common/HeaderComponent.vue";
import TermsComponent from "~/components/proviso/TermsComponent.vue";

export default {
  components: {
    FooterComponent,
    HeaderComponent,
    TermsComponent
  }
};
</script>
