<template>
  <div>
    <div v-if="masterList">
      <header-component />
      <div>メール登録時に設定したパスワードを入力してください</div>
      <mail-auth-password-component
        :authPurpose="authPurposeParam"
        :userId="userIdParam"
        :token="tokenParam"
      />
    </div>
  </div>
</template>

<script>
import api_mixin from "~/mixins/api_mixin.js";
import HeaderComponent from "~/components/common/HeaderComponent.vue";
import MailAuthPasswordComponent from "~/components/auth/MailAuthPasswordComponent.vue";
import { mapState, mapActions } from "vuex";

export default {
  mixins: [api_mixin],
  components: {
    HeaderComponent,
    MailAuthPasswordComponent
  },
  data() {
    return {
      authPurposeParam: undefined,
      userIdParam: undefined,
      tokenParam: undefined
    };
  },
  computed: {
    ...mapState("masterStore", ["masterList"])
  },
  methods: {
    ...mapActions("masterStore", ["updateMasterList"])
  },
  async created() {
    // ログイン状態の場合はログアウト
    if (this.isSignedIn) {
      this.updateUserInfo({ userInfo: undefined });
      this.updateLoginState({ isSignedIn: false });
      await this.postApi(this.$axios, "logout", {});
    }

    // masterがstoreに無い場合はセット
    if (this.masterList == undefined) {
      let response = await this.getReponseApi(this.$axios, "master");
      if (response.status == 200) {
        this.updateMasterList({ masterList: response.data });
      }
    }

    // paramチェック
    let userIdParam = this.$route.query.user_id;
    let tokenParam = this.$route.query.token;
    let authPurposeParam = this.$route.query.auth_purpose;
    if (userIdParam && tokenParam && authPurposeParam) {
      this.userIdParam = userIdParam;
      this.tokenParam = tokenParam;
      this.authPurposeParam = authPurposeParam;
    } else {
      this.$router.push({ path: "/" });
    }
  }
};
</script>
