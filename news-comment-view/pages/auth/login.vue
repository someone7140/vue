<template>
  <div>
    <div v-if="masterList">
      <header-component />
      <div>Facebookでログイン</div>
      <facebook-auth-component :authPurpose="authPurpose" />
      <flash-message-display-component />
    </div>
  </div>
</template>

<script>
import api_mixin from "~/mixins/api_mixin.js";
import FacebookAuthComponent from "~/components/auth/FacebookAuthComponent.vue";
import FlashMessageDisplayComponent from "~/components/common/FlashMessageDisplayComponent.vue";
import HeaderComponent from "~/components/common/HeaderComponent.vue";
import { mapState, mapActions } from "vuex";

export default {
  mixins: [api_mixin],
  components: {
    FacebookAuthComponent,
    FlashMessageDisplayComponent,
    HeaderComponent
  },
  data() {
    return {
      authPurpose: "login"
    };
  },
  computed: {
    ...mapState("userStore", ["userInfo", "isSignedIn"]),
    ...mapState("masterStore", ["masterList"])
  },
  methods: {
    ...mapActions("flashMessageStore", ["updateFlashMessageDisp"]),
    ...mapActions("masterStore", ["updateMasterList"]),
    ...mapActions("userStore", ["updateLoginState", "updateUserInfo"])
  },
  async created() {
    // ログイン状態の場合はログアウト
    if (this.isSignedIn) {
      this.updateUserInfo({ userInfo: undefined });
      this.updateLoginState({ isSignedIn: false });
      this.updateFlashMessageDisp({
        flashMessageDisp: {
          title: "ログアウト",
          message: "ログアウトしました",
          position: "right bottom",
          result: "success",
          watchFlg: false
        }
      });
      await this.postApi(this.$axios, "logout", {});
    }

    // masterがstoreに無い場合はセット
    if (this.masterList == undefined) {
      let response = await this.getReponseApi(this.$axios, "master");
      if (response.status == 200) {
        this.updateMasterList({ masterList: response.data });
      }
    }
  }
};
</script>
