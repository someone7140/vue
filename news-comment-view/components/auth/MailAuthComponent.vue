<template>
  <div>
    <div>
      【メールアドレス】
      <br />
      <input type="email" v-model="email" placeholder="メールアドレス" name="email" />
    </div>
    <div>
      【パスワード】
      <br />
      <input type="password" v-model="password" placeholder="6文字以上で入力" name="password" />
      <div v-if="authPurpose  === 'register'">
        <input
          type="password"
          v-model="passwordReInput"
          placeholder="パスワードを再入力"
          name="passwordReInput"
        />
      </div>
    </div>
    <br />
    <div>
      <div v-if="authPurpose  === 'login'">
        <button type="button" @click="authEmail">ログインを行う</button>
      </div>
      <div v-if="authPurpose  === 'register'">
        <button type="button" @click="authEmail">メールアドレスで登録を行う</button>
      </div>
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
  props: ["authPurpose", "userCategory"],
  data() {
    return {
      email: undefined,
      password: undefined,
      passwordReInput: undefined,
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
    // メール認証
    async authEmail() {
      this.messageList = [];
      if (!this.emailCheck(this.email)) {
        // 入力チェック
        this.messageList.push("メールアドレスを正しく入力してください");
      }
      if (!this.password || this.password.length < 6) {
        this.messageList.push("パスワードを6文字以上で入力してください");
      }
      if (
        this.authPurpose == "register " &&
        this.password != this.passwordReInput
      ) {
        this.messageList.push("再入力されたパスワードが異なります");
      }
      // エラーがない場合
      if (this.messageList.length == 0) {
        if (this.authPurpose == "login") {
          let response = await this.postApi(this.$axios, "emailLogin", {
            email_login: {
              email: this.email,
              password: this.password
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
            this.messageList.push(
              "ログインに失敗しました、会員登録済みかご確認お願いします。登録済みの場合は運営までお問い合わせください。"
            );
          }
        } else if (this.authPurpose == "register") {
          let response = await this.postApi(this.$axios, "registEmailUser", {
            email_register: {
              email: this.email,
              password: this.password,
              role: this.userCategory
            }
          });
          if (response.status == 200) {
            this.updateFlashMessageDisp({
              flashMessageDisp: {
                title: "メール送信完了",
                message: "認証用のメールを送信しました",
                position: "right bottom",
                result: "success",
                watchFlg: false
              }
            });
            this.$router.push({ path: "/" });
          } else if (response.status == 403) {
            this.messageList.push(
              "メール送信に失敗しました、メールアドレスの再確認をお願いします。"
            );
          } else {
            this.messageList.push(
              "メール送信に失敗しました、すでに使われているメールアドレスの可能性があります。"
            );
          }
        }
      }
    }
  }
};
</script>
