<template>
  <div>
    <div class="container text-center">
      <h1 class="m-5 pt-5">パスワードリセット送信</h1>
      <section class="text-left">
        <div v-if="displaySentFlg">メールアドレス宛にパスワードリセット用のリンクを送信しました</div>
        <div v-if="!displaySentFlg">
          <validation-observer v-slot="{ invalid }">
            <div class="form-group">
              <label for="email">メールアドレス</label>
              <validation-provider v-slot="{ errors }" rules="required|email" name="email">
                <input type="text" class="form-control" v-model="email" />
                <ErrorMessageComponent :errors="errors" />
              </validation-provider>
            </div>
            <div class="form-group text-right">
              <button class="btn btn-primary" :disabled="invalid" @click="sendEmail">送信する</button>
            </div>
          </validation-observer>
        </div>
      </section>
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
      email: undefined,
      displaySentFlg: false,
    };
  },
  methods: {
    ...mapActions("flashMessageStore", ["updateFlashMessageDisp"]),
    async sendEmail() {
      const response = await this.postApi(
        this.$axios,
        "auth/password_reset_send",
        {
          password_reset_send: {
            email: this.email,
          },
        }
      );
      if (response.status == 200) {
        this.displaySentFlg = true;
      } else {
        this.updateFlashMessageDisp({
          flashMessageDisp: {
            title: "エラー",
            message:
              "登録されていないメールアドレスの可能性があります。再度エラーとなる場合はお問い合わせください。",
            result: "error",
            watchFlg: true,
          },
        });
      }
    },
  },
};
</script>
