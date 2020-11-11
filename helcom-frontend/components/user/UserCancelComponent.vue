<template>
  <div>
    退会を行うと登録したデータは削除されます。復旧は行えませんので予めご了承ください。
    <br />
    <button class="btn btn-dark" @click="userCancel">退会する</button>
    <modal
      name="user-cancel-modal-content"
      class="user-cancel-confirm"
      :width="'300px'"
      :height="'150px'"
    >
      <p>退会します。問題なければ「退会」ボタンを押してください。</p>
      <button class="btn btn-dark" @click="userCancelConfirm">退会</button>&nbsp;&nbsp;&nbsp;
      <button class="btn btn-dark" @click="userCancelCancel">キャンセル</button>
    </modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import apiMixin from "~/mixins/apiMixin.js";

export default {
  mixins: [apiMixin],
  created() {
    // 退会用のモーダルを非表示
    this.$modal.hide("user-cancel-modal-content");
  },
  methods: {
    ...mapActions("flashMessageStore", ["updateFlashMessageDisp"]),
    ...mapActions("userStore", ["updateUserInfo", "updateLoginState"]),
    userCancel() {
      // 退会用のモーダルを表示
      this.$modal.show("user-cancel-modal-content");
    },
    async userCancelConfirm() {
      const response = await this.postApi(this.$axios, "auth/user_cancel");
      // 退会用のモーダルを非表示
      this.$modal.hide("user-cancel-modal-content");
      if (response.status == 200) {
        this.updateUserInfo(undefined);
        this.updateLoginState({ isSignedIn: false });
        this.updateFlashMessageDisp({
          flashMessageDisp: {
            title: "完了",
            message: "退会しました。",
            result: "success",
            watchFlg: false,
          },
        });
        this.$router.push({ path: "/auth/login" });
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
    userCancelCancel() {
      // 退会用のモーダルを非表示
      this.$modal.hide("user-cancel-modal-content");
    },
  },
};
</script>

<style>
.user-cancel-confirm {
  text-align: center;
}
</style>
