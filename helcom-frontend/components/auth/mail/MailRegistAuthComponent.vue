<template>
  <div>
    <div class="container text-center">
      <h1 class="m-5 pt-5">メールアドレス認証</h1>

      <div class="text-left mx-5">
        <validation-observer v-slot="{ invalid }">
          <div class="form-group">
            <label for="password">password</label>
            <validation-provider
              v-slot="{ errors }"
              rules="required"
              name="password"
            >
              <input type="password" class="form-control" v-model="password" />
              <ErrorMessageComponent :errors="errors" />
            </validation-provider>
          </div>
          <div class="form-group text-right">
            <button
              class="btn btn-primary"
              :disabled="invalid"
              @click="emailAuth"
            >
              送信
            </button>
          </div>
        </validation-observer>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import apiMixin from "~/mixins/apiMixin.js";
import ErrorMessageComponent from "~/components/common/ErrorMessageComponent.vue";

export default {
  mixins: [apiMixin],
  components: {
    ErrorMessageComponent,
  },
  data() {
    return {
      userId: undefined,
      password: undefined,
      token: undefined,
      category: undefined,
    };
  },
  mounted() {
    if (
      this.$route.query.user_id &&
      this.$route.query.token &&
      this.$route.query.category
    ) {
      this.userId = this.$route.query.user_id;
      this.token = this.$route.query.token;
      this.category = this.$route.query.category;
    } else {
      // パラメータが取得できない場合はログイン画面へ移動
      this.$router.push({ path: "/auth/login" });
    }
  },
  methods: {
    ...mapActions("flashMessageStore", ["updateFlashMessageDisp"]),
    ...mapActions("userStore", ["updateUserInfo", "updateLoginState"]),
    async emailAuth() {
      const response = await this.postApi(this.$axios, "auth/auth_email_user", {
        auth_email: {
          id: this.userId,
          password: this.password,
          token: this.token,
          category: this.category,
        },
      });
      if (response.status == 200) {
        if (this.category == "regist") {
          // 一般ユーザでログイン済とみなす
          this.updateUserInfo({
            userInfo: {
              user_id: this.userId,
              role: "user",
              afterAuthFlg: true,
            },
          });
          this.updateLoginState({ isSignedIn: true });
          // プロフィール登録画面へ遷移
          this.$router.push({ path: "/profile/profile_regist" });
        } else {
          this.updateFlashMessageDisp({
            flashMessageDisp: {
              title: "メールアドレス変更完了",
              message: "メールアドレスを変更しました。",
              result: "success",
              watchFlg: false,
            },
          });
          // ログイン画面へ移動
          this.$router.push({ path: "/auth/login" });
        }
      } else if (response.status == 401) {
        this.updateFlashMessageDisp({
          flashMessageDisp: {
            title: "エラー",
            message:
              "すでに認証済み、もしくはパスワードに誤りがあります。一度認証された場合はログイン画面よりログインください。",
            result: "error",
            watchFlg: true,
          },
        });
      } else {
        this.updateFlashMessageDisp({
          flashMessageDisp: {
            title: "エラー",
            message: "登録処理中にエラーが発生しました。再度お試しください",
            result: "error",
            watchFlg: true,
          },
        });
      }
    },
  },
};
</script>
