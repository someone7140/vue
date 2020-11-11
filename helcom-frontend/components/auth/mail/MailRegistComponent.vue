<template>
  <div>
    <div class="container text-center">
      <h1 class="m-5 pt-5">新規メールアドレス登録</h1>

      <div class="text-left mx-5">
        <div v-if="displayCreatedFlg">メールアドレス宛に登録用のリンクを送信しました</div>
        <div v-else>
          <validation-observer v-slot="{ invalid }">
            <div class="form-group">
              <label for="userId">ユーザID（※ユーザIDは画面に表示されるので、個人が特定できない文字を入力してください）</label>
              <validation-provider v-slot="{ errors }" rules="required|alpha_dash|min:6" name="userId">
                <input type="text" class="form-control" v-model="userId" />
                <ErrorMessageComponent :errors="errors" :customMessage="'ユーザIDは6文字以上の半角英数字で登録してください'" />
              </validation-provider>
            </div>
            <div class="form-group">
              <label for="email">メールアドレス</label>
              <validation-provider v-slot="{ errors }" rules="required|email" name="email">
                <input type="text" class="form-control" v-model="email" />
                <ErrorMessageComponent :errors="errors" />
              </validation-provider>
            </div>
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
              <button class="btn btn-primary" :disabled="invalid" @click="createEmailuser">新規登録する</button>
            </div>
          </validation-observer>
        </div>
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
      email: undefined,
      password: undefined,
      passwordReInput: undefined,
      displayCreatedFlg: false,
    };
  },
  methods: {
    ...mapActions("flashMessageStore", ["updateFlashMessageDisp"]),
    async createEmailuser() {
      const response = await this.postApi(
        this.$axios,
        "auth/regist_email_user",
        {
          email_register: {
            id: this.userId,
            email: this.email,
            password: this.password,
          },
        }
      );
      if (response.status == 200) {
        // 完了済フラグ更新
        this.displayCreatedFlg = true;
      } else if (response.status == 400) {
        this.updateFlashMessageDisp({
          flashMessageDisp: {
            title: "エラー",
            message: "ユーザIDもしくはメールアドレスがすでに登録済です",
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
