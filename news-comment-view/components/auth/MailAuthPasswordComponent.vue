<template>
  <div>
    <div>
      【パスワード】
      <br />
      <input type="password" v-model="password" placeholder="6文字以上で入力" name="password" />
    </div>
    <div>
      <button type="button" @click="authPassword">
        <span v-if="authPurpose  === 'register'">会員登録に進む</span>
        <span v-if="authPurpose  === 'change'">メールアドレスの変更を行う</span>
      </button>
    </div>
    <div v-for="message of messageList" v-bind:key="message.index">
      {{ message }}
      <br />
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import api_mixin from "~/mixins/api_mixin.js";
import input_mixin from "~/mixins/input_mixin.js";

export default {
  mixins: [api_mixin, input_mixin],
  props: ["authPurpose", "userId", "token"],
  data() {
    return {
      password: undefined,
      messageList: []
    };
  },
  methods: {
    ...mapActions("flashMessageStore", ["updateFlashMessageDisp"]),
    ...mapActions("userStore", [
      "updateUserInfo",
      "updateLoginState",
      "updateUnReadMessageFlg"
    ]),
    computed: {
      ...mapState("userStore", ["userInfo"])
    },
    // メール認証
    async authPassword() {
      this.messageList = [];
      if (!this.password || this.password.length < 6) {
        this.messageList.push("パスワードを6文字以上で入力してください");
      }
      // エラーがない場合
      if (this.messageList.length == 0) {
        if (this.authPurpose == "register") {
          let response = await this.postApi(this.$axios, "authEmailUser", {
            email_auth: {
              user_id: this.userId,
              password: this.password,
              token: this.token,
              auth_purpose: "register"
            }
          });
          if (response.status == 200) {
            // storeのユーザ情報の更新
            this.updateUserInfo({ userInfo: response.data });
            let category = response.data.user_category;
            if (category === "company") {
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
          } else {
            this.messageList.push(
              "認証に失敗しました、会員登録済みかご確認お願いします。登録済みの場合は運営までお問い合わせください。"
            );
          }
        } else if (this.authPurpose == "change") {
          let response = await this.postApi(this.$axios, "authEmailUser", {
            email_auth: {
              user_id: this.userId,
              password: this.password,
              token: this.token,
              auth_purpose: "change"
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
                title: "メールアドレス変更完了",
                message: "メールアドレスを変更しました",
                position: "right bottom",
                result: "success",
                watchFlg: false
              }
            });
            this.$router.push({ path: "/" });
          } else {
            this.messageList.push(
              "認証に失敗しました、会員登録済みかご確認お願いします。登録済みの場合は運営までお問い合わせください。"
            );
          }
        }
      }
    }
  }
};
</script>
