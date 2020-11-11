<template>
  <div>
    <div>
      <section class="text-left">
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
            <button class="btn btn-primary" :disabled="invalid" @click="changePassword">変更する</button>
          </div>
        </validation-observer>
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
      password: undefined,
      passwordReInput: undefined,
    };
  },
  methods: {
    ...mapActions("flashMessageStore", ["updateFlashMessageDisp"]),
    async changePassword() {
      const response = await this.postApi(
        this.$axios,
        "auth/auth_password_change",
        {
          password_change: {
            password: this.password,
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
        this.$router.push({ path: "/profile/profile_mypage" });
      } else {
        this.updateFlashMessageDisp({
          flashMessageDisp: {
            title: "エラー",
            message: "処理中にエラーが発生しました。再度お試しください",
            result: "error",
            watchFlg: true,
          },
        });
      }
    },
  },
};
</script>
