<template>
  <div>
    <HeaderComponent />
    <InquirySendComponent />
    <FooterComponent />
  </div>
</template>

<script>
import FooterComponent from "~/components/common/FooterComponent.vue";
import HeaderComponent from "~/components/common/HeaderComponent.vue";
import InquirySendComponent from "~/components/inquiry/InquirySendComponent.vue";

export default {
  middleware: "authCheck",
  components: {
    FooterComponent,
    HeaderComponent,
    InquirySendComponent,
  },
};
</script>
