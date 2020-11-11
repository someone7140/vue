<template>
  <div>
    <div class="container text-center">
      <h1 class="m-5 pt-5">パスワードリセット登録</h1>

      <div class="text-left mx-5">
        <validation-observer v-slot="{ invalid }">
          <div class="form-group">
            <label for="password">パスワード</label>
            <validation-provider v-slot="{ errors }" rules="required|alpha_dash|min:6" name="password">
              <input type="password" class="form-control" v-model="password" />
              <ErrorMessageComponent :errors="errors" :customMessage="'パスワードは6文字以上の半角英数字で登録してください'" />
            </validation-provider>
          </div>
          <div class="form-group">
            <label for="passwordReInput">パスワード再入力</label>
            <validation-provider
              v-slot="{ errors }"
              rules="passwordReInput:@password"
              name="passwordReInput"
            >
              <input type="password" class="form-control" v-model="passwordReInput" />
              <ErrorMessageComponent :errors="errors" />
            </validation-provider>
          </div>
          <div class="form-group text-right">
            <button class="btn btn-primary" :disabled="invalid" @click="passwordRegist">登録</button>
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
      token: undefined,
      password: undefined,
      passwordReInput: undefined,
    };
  },
  mounted() {
    if (this.$route.query.user_id && this.$route.query.token) {
      this.userId = this.$route.query.user_id;
      this.token = this.$route.query.token;
    } else {
      // パラメータが取得できない場合はログイン画面へ移動
      this.$router.push({ path: "/auth/login" });
    }
  },
  methods: {
    ...mapActions("flashMessageStore", ["updateFlashMessageDisp"]),
    async passwordRegist() {
      const response = await this.postApi(
        this.$axios,
        "auth/password_reset_regist",
        {
          password_reset_regist: {
            user_id: this.userId,
            password: this.password,
            token: this.token,
          },
        }
      );
      if (response.status == 200) {
        this.updateFlashMessageDisp({
          flashMessageDisp: {
            title: "パスワード更新完了",
            message: "パスワードを更新しました。",
            result: "success",
            watchFlg: false,
          },
        });
        // ログイン画面へ遷移
        this.$router.push({ path: "/auth/login" });
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
