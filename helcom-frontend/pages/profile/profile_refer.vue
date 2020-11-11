<template>
  <div>
    <HeaderComponent />
    <div class="container main">
      <div class="my-3">&nbsp;</div>
      <div class="main-header text-center bg-dark">
        <div class="main-header-text row p-3">
          <div class="col-2 p-0">
            <img :src="'/frontend/icon_helcom.png'" class="top-icon" />
          </div>
          <div class="col-10 p-0 text-left">
            <h4>病気で繋がるSNS</h4>
          </div>
        </div>
      </div>
      <UserInfoComponent :ownReferFlg="ownReferFlg" :userId="userId" />
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import { mapState } from "vuex";
import FooterComponent from "~/components/common/FooterComponent.vue";
import HeaderComponent from "~/components/common/HeaderComponent.vue";
import UserInfoComponent from "~/components/user/UserInfoComponent.vue";

export default {
  middleware: "authCheck",
  components: {
    FooterComponent,
    HeaderComponent,
    UserInfoComponent
  },
  data() {
    return {
      ownReferFlg: false,
      userId: undefined
    };
  },
  computed: {
    ...mapState("userStore", ["userInfo"])
  },
  created() {
    this.userId = this.$route.query.user_id;
    // 自ユーザの場合はマイページへ遷移させる
    if (this.userId == this.userInfo.user_id) {
      this.$router.push({ path: "/profile/profile_mypage" });
    }
  }
};
</script>
