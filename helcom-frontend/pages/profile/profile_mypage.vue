<template>
  <div>
    <HeaderComponent />
    <div class="container main">
      <MyPageHeaderComponent nowPage="profile" />
      <UserInfoComponent
        :ownReferFlg="ownReferFlg"
        :userId="userInfo.user_id"
        :tabParam="tabParam"
      />
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import { mapState } from "vuex";
import FooterComponent from "~/components/common/FooterComponent.vue";
import HeaderComponent from "~/components/common/HeaderComponent.vue";
import MyPageHeaderComponent from "~/components/profile/MyPageHeaderComponent.vue";
import UserInfoComponent from "~/components/user/UserInfoComponent.vue";

export default {
  middleware: "authCheck",
  components: {
    FooterComponent,
    HeaderComponent,
    MyPageHeaderComponent,
    UserInfoComponent,
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),
  },
  data() {
    return {
      ownReferFlg: true,
      tabParam: "profile",
    };
  },
  created() {
    if (this.$route.query.tab_param) {
      this.tabParam = this.$route.query.tab_param;
    }
  },
};
</script>
