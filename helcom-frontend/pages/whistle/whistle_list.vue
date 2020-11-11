<template>
  <div>
    <HeaderComponent />
    <WhistleListComponent />
    <FooterComponent />
  </div>
</template>

<script>
import { mapState } from "vuex";
import FooterComponent from "~/components/common/FooterComponent.vue";
import HeaderComponent from "~/components/common/HeaderComponent.vue";
import WhistleListComponent from "~/components/whistle/WhistleListComponent.vue";

export default {
  middleware: "authCheck",
  components: {
    FooterComponent,
    HeaderComponent,
    WhistleListComponent,
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),
  },
  created() {
    // 管理者ユーザ以外はtopへ遷移させる
    if (this.userInfo.role != "admin") {
      this.$router.push({ path: "/top" });
    }
  },
};
</script>
