<template>
  <div>
    <span v-if="appId != undefined && version != undefined">
      <v-facebook-login
        :app-id="appId"
        :version="version"
        :login-options="scope"
        @sdk-init="setSdk"
        @connect="connected"
        @logout="onLogout"
      >
        <span slot="login">Facebookにログイン</span>
        <span slot="logout">Facebookからログアウト</span>
      </v-facebook-login>
      <div v-if="isFacebookAuth">
        <div v-if="authPurpose  === 'register'">
          <button type="button" @click="moveProfileRegist">プロフィール登録へ進む</button>
        </div>
        <div v-if="authPurpose  === 'login'">
          <button type="button" @click="loginFacebook">ログインを行う</button>
        </div>
      </div>
      <div v-if="errorMessage !== undefined">
        <br />
        {{ errorMessage }}
      </div>
    </span>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import api_mixin from "~/mixins/api_mixin.js";
import VFacebookLogin from "vue-facebook-login-component";

export default {
  mixins: [api_mixin],
  props: ["authPurpose", "userCategory"],
  components: {
    VFacebookLogin
  },
  data() {
    return {
      sdkFB: undefined,
      scope: { scope: "public_profile, email" },
      isFacebookAuth: false,
      facebookInfo: undefined,
      errorMessage: undefined,
      appId: undefined,
      version: undefined
    };
  },
  computed: {
    ...mapState("masterStore", ["masterList"]),
    getMasterFromStore: function() {
      return this.masterList;
    }
  },
  methods: {
    ...mapActions("flashMessageStore", ["updateFlashMessageDisp"]),
    ...mapActions("userStore", [
      "updateUserInfo",
      "updateLoginState",
      "updateUnReadMessageFlg"
    ]),
    // sdkの読み込み完了
    setSdk(sdk) {
      this.sdkFB = sdk.FB;
    },
    // 認証が完了したらconnectedが呼ばれる
    async connected(response) {
      // id、名前、写真、メールアドレスを取得
      this.sdkFB.api(
        "/me?fields=id,name,last_name,first_name,picture,email",
        function(response) {
          // 取得したデータを設定
          this.facebookInfo =
            this.userCategory === "company"
              ? {
                  facebook_id: response.id,
                  company_name: response.name,
                  email: response.email,
                  image_url: response.picture.data.url
                }
              : {
                  facebook_id: response.id,
                  last_name: response.last_name,
                  first_name: response.first_name,
                  email: response.email,
                  image_url: response.picture.data.url
                };
          //アクセストークンの取得
          this.sdkFB.getLoginStatus(
            function(responseStatus) {
              if (responseStatus.status === "connected") {
                this.facebookInfo.token =
                  responseStatus.authResponse.accessToken;
                if (this.authPurpose == "register") {
                  this.facebookInfoRegist();
                } else {
                  this.isFacebookAuth = true;
                }
              } else {
                this.errorMessage =
                  "情報の取得に失敗しました。Facebookの再ログインをお願いします。";
              }
            }.bind(this)
          );
        }.bind(this)
      );
    },
    // ログアウト時は認証フラグをfalse
    onLogout(response) {
      this.isFacebookAuth = false;
    },
    // 会員登録時の遷移
    moveProfileRegist() {
      if (this.userCategory === "company") {
        this.$router.push({
          path: "/company/company_profile",
          params: { operation: "regist" }
        });
      } else {
        this.$router.push({
          path: "/account/student_profile",
          params: { operation: "regist" }
        });
      }
    },
    // ログイン処理
    async loginFacebook() {
      let response = await this.postApi(this.$axios, "loginFacebookUser", {
        facebook_login: {
          facebook_id: this.facebookInfo.facebook_id,
          access_token: this.facebookInfo.token
        }
      });
      if (response.status == 200) {
        // storeのユーザ情報の更新
        this.updateUserInfo({ userInfo: response.data });
        this.updateLoginState({ isSignedIn: true });
        this.updateUnReadMessageFlg({
          unReadMessageFlg: response.data.message_un_read
        });
        this.updateFlashMessageDisp({
          flashMessageDisp: {
            title: "ログイン完了",
            message: "ログインしました",
            position: "right bottom",
            result: "success",
            watchFlg: false
          }
        });
        this.$router.push({ path: "/" });
      } else {
        this.errorMessage =
          "ログインに失敗しました、会員登録済みかご確認お願いします。登録済みの場合は運営までお問い合わせください。";
      }
    },
    async facebookInfoRegist() {
      // postで一時情報を格納
      let response = await this.postApi(this.$axios, "registFacebookUser", {
        facebook_user: {
          facebook_id: this.facebookInfo.facebook_id,
          role: this.userCategory,
          access_token: this.facebookInfo.token
        }
      });
      if (response.status == 200) {
        this.isFacebookAuth = true;
        this.facebookInfo.user_id = response.data.user_id;
        this.updateUserInfo({ userInfo: this.facebookInfo });
      } else if (response.status == 403) {
        this.errorMessage = "すでに会員登録済みです。";
      } else {
        this.errorMessage =
          "情報の取得に失敗しました。Facebookの再ログインをお願いします。";
      }
    },
    facebookApiSet() {
      if (this.masterList != undefined) {
        this.appId = this.masterList.facebook_api.app_id;
        this.version = this.masterList.facebook_api.version;
      }
    }
  },
  created() {
    this.facebookApiSet();
  },
  watch: {
    getMasterFromStore() {
      // storeのmasterが更新された場合は初期値をセット
      this.facebookApiSet();
    }
  }
};
</script>
