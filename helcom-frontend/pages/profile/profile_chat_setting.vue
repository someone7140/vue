<template>
  <div>
    <HeaderComponent />
    <div class="container main">
      <MyPageHeaderComponent />
      <div class="form-group text-center pt-5">
        <h1 class="m-5 pt-5">チャット設定</h1>
        <ChatBlockListComponent />
      </div>
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import FooterComponent from "~/components/common/FooterComponent.vue";
import HeaderComponent from "~/components/common/HeaderComponent.vue";
import ChatBlockListComponent from "~/components/chat/ChatBlockListComponent.vue";

export default {
  middleware: "authCheck",
  components: {
    ChatBlockListComponent,
    FooterComponent,
    HeaderComponent,
  },
};
</script>
