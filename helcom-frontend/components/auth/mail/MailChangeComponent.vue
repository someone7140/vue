<template>
  <div>
    <div>
      <section class="text-left">
        <div v-if="displaySentFlg">
          メールアドレス宛に変更用のリンクを送信しました。メールより変更手続きを行なってください。
        </div>
        <div v-else>
          <validation-observer v-slot="{ invalid }">
            <div class="form-group">
              <label for="email">変更後のメールアドレス</label>
              <validation-provider
                v-slot="{ errors }"
                rules="required|email"
                name="email"
              >
                <input type="text" class="form-control" v-model="email" />
                <ErrorMessageComponent :errors="errors" />
              </validation-provider>
            </div>
            <div class="form-group text-right">
              <button
                class="btn btn-primary"
                :disabled="invalid"
                @click="changeEmail"
              >
                変更する
              </button>
            </div>
          </validation-observer>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import apiMixin from "~/mixins/apiMixin.js";
import ErrorMessageComponent from "~/components/common/ErrorMessageComponent.vue";

export default {
  mixins: [apiMixin],
  components: {
    ErrorMessageComponent,
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),
  },
  data() {
    return {
      email: undefined,
      displaySentFlg: false,
    };
  },
  methods: {
    ...mapActions("flashMessageStore", ["updateFlashMessageDisp"]),
    async changeEmail() {
      const response = await this.postApi(this.$axios, "auth/change_email", {
        email_change: {
          id: this.userInfo.user_id,
          email: this.email,
        },
      });
      if (response.status == 200) {
        this.displaySentFlg = true;
      } else if (response.status == 403) {
        this.updateFlashMessageDisp({
          flashMessageDisp: {
            title: "エラー",
            message:
              "すでに登録されているメールアドレスです。別のメールアドレスで登録してください。",
            result: "error",
            watchFlg: true,
          },
        });
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
