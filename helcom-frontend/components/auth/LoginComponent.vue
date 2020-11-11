<template>
  <div>
    <div class="container text-center">
      <h1 class="m-5 pt-5">ログイン</h1>
      <div class="text-left mx-5">
        <validation-observer v-slot="{ invalid }">
          <div class="form-group">
            <label for="email">email</label>
            <validation-provider v-slot="{ errors }" rules="required|email" name="email">
              <input type="text" class="form-control" v-model="email" />
              <ErrorMessageComponent :errors="errors" />
            </validation-provider>
          </div>
          <div class="form-group">
            <label for="password">password</label>
            <validation-provider v-slot="{ errors }" rules="required" name="password">
              <input type="password" class="form-control" v-model="password" />
              <ErrorMessageComponent :errors="errors" />
            </validation-provider>
          </div>
          <div class="form-group text-right">
            <button class="btn btn-primary" :disabled="invalid" @click="emailLogin">送信</button>
          </div>
        </validation-observer>
        <br />
        <nuxt-link to="/auth/mail/mail_regist">メールアドレスで新規登録する</nuxt-link>
        <br />
        <br />
        <nuxt-link to="/auth/mail/password_reset_send">パスワードを忘れた方はこちら</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import apiMixin from "~/mixins/apiMixin.js";
import { mapActions } from "vuex";
import ErrorMessageComponent from "~/components/common/ErrorMessageComponent.vue";

export default {
  mixins: [apiMixin],
  components: {
    ErrorMessageComponent,
  },
  data() {
    return {
      email: undefined,
      password: undefined,
    };
  },
  async mounted() {
    // ログイン状態で入ってきたときのために念の為ログアウト
    await this.postApi(this.$axios, "auth/logout");
    this.updateUserInfo(undefined);
    this.updateLoginState({ isSignedIn: false });
  },
  methods: {
    ...mapActions("flashMessageStore", ["updateFlashMessageDisp"]),
    ...mapActions("userStore", ["updateUserInfo", "updateLoginState"]),
    async emailLogin() {
      const response = await this.postApi(this.$axios, "auth/email_login", {
        email_login: {
          email: this.email,
          password: this.password,
        },
      });
      if (response.status == 200) {
        this.updateUserInfo({ userInfo: response.user });
        this.updateLoginState({ isSignedIn: true });
        this.updateFlashMessageDisp({
          flashMessageDisp: {
            title: "ログイン完了",
            message: "ログインしました",
            result: "success",
            watchFlg: false,
          },
        });
        // トップ画面へ移動
        this.$router.push({ path: "/top" });
      } else if (response.status == 400) {
        this.updateFlashMessageDisp({
          flashMessageDisp: {
            title: "エラー",
            message: "入力されたメールアドレスは登録されていません",
            result: "error",
            watchFlg: true,
          },
        });
      } else if (response.status == 401) {
        this.updateFlashMessageDisp({
          flashMessageDisp: {
            title: "エラー",
            message: "パスワードに誤りがあります",
            result: "error",
            watchFlg: true,
          },
        });
      } else if (response.status == 403) {
        this.updateFlashMessageDisp({
          flashMessageDisp: {
            title: "エラー",
            message: "利用ができないユーザです",
            result: "error",
            watchFlg: true,
          },
        });
      } else {
        this.updateFlashMessageDisp({
          flashMessageDisp: {
            title: "エラー",
            message: "ログイン処理中にエラーが発生しました。再度お試しください",
            result: "error",
            watchFlg: true,
          },
        });
      }
    },
  },
};
</script>
