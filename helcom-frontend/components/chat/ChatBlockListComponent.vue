<template>
  <div>
    <label for="blockUserId">ブロックするユーザID</label>
    <br />
    <input type="text" v-model="blockUserId" />
    &nbsp;&nbsp;
    <button
      class="btn btn-dark"
      @click="blockUserAdd"
      :disabled="!checkAddBlockUserId"
    >ブロック追加</button>&nbsp;&nbsp;&nbsp;
    <br />
    <br />
    <div>
      <label for="blockUserId">ブロックしてるユーザのID</label>
      <div v-for="blockUser of blockUserList" v-bind:key="blockUser">
        <nuxt-link :to="'/profile/profile_refer?user_id=' + blockUser" target="_blank">{{blockUser}}</nuxt-link>&nbsp;&nbsp;
        <button class="batsu" @click="blockUseDelete({blockUser})">×</button>
      </div>
    </div>
    <modal
      name="block-user-delete-modal-confirm"
      class="block-user-delete-confirm"
      :width="'300px'"
      :height="'150px'"
      @before-open="beforeModalOpen"
    >
      <p>ブロック解除します。問題なければブロック解除ボタンを押してください。</p>
      <button class="btn btn-dark" @click="blockUserDeleteConfirm">ブロック解除</button>&nbsp;&nbsp;&nbsp;
      <button class="btn btn-dark" @click="blockUserDeleteCancel">キャンセル</button>
    </modal>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import apiMixin from "~/mixins/apiMixin.js";

export default {
  computed: {
    ...mapState("masterStore", ["master"]),
    checkAddBlockUserId() {
      if (this.blockUserId) {
        return !this.blockUserList.some((b) => b == this.blockUserId);
      } else {
        return false;
      }
    },
  },
  mixins: [apiMixin],
  data() {
    return {
      blockUserId: undefined,
      blockUserList: [],
      blockDeleteUser: undefined,
    };
  },
  async created() {
    this.setBlockuUserList();
    // ブロック解除用のモーダルを非表示
    this.$modal.hide("block-user-delete-modal-confirm");
  },
  methods: {
    ...mapActions("flashMessageStore", ["updateFlashMessageDisp"]),
    async blockUserAdd() {
      const response = await this.postApi(this.$axios, "chat/add_block_user", {
        block_user_param: { block_user_id: this.blockUserId },
      });
      if (response.status == 200) {
        this.updateFlashMessageDisp({
          flashMessageDisp: {
            title: "追加完了",
            message: "ブロックユーザを追加しました。",
            result: "success",
            watchFlg: true,
          },
        });
        // ブロックユーザを再読み込み
        this.setBlockuUserList();
        // テキストを空に
        this.blockUserId = undefined;
      } else {
        this.updateFlashMessageDisp({
          flashMessageDisp: {
            title: "エラー",
            message: "存在しないユーザIDが指定されています。",
            result: "error",
            watchFlg: true,
          },
        });
      }
    },
    blockUseDelete(blockUser) {
      // 削除用のモーダルを表示
      this.$modal.show("block-user-delete-modal-confirm", blockUser);
    },
    beforeModalOpen(e) {
      this.blockDeleteUser = e.params.blockUser;
    },
    async setBlockuUserList() {
      const result = await this.getReponseApi(
        this.$axios,
        "chat/get_block_users_own"
      );
      if (result.status == 200) {
        this.blockUserList = result.block_users;
      }
    },
    blockUserDeleteCancel() {
      // ブロック解除用のモーダルを非表示
      this.$modal.hide("block-user-delete-modal-confirm");
      this.blockDeleteUser = undefined;
    },
    async blockUserDeleteConfirm() {
      const response = await this.postApi(
        this.$axios,
        "chat/delete_block_user",
        {
          block_user_param: { block_user_id: this.blockDeleteUser },
        }
      );
      if (response.status == 200) {
        this.updateFlashMessageDisp({
          flashMessageDisp: {
            title: "削除完了",
            message: "ブロックユーザを削除しました。",
            result: "success",
            watchFlg: true,
          },
        });
        // ブロックユーザを再読み込み
        this.setBlockuUserList();
        // ブロック解除用のモーダルを非表示
        this.$modal.hide("block-user-delete-modal-confirm");
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
      this.blockDeleteUser = undefined;
    },
  },
};
</script>

<style>
.block-user-delete-confirm {
  text-align: center;
}
.batsu {
  font-size: 200%;
  font-weight: bold;
  border: none; /* 枠線を消す */
  outline: none; /* クリックしたときに表示される枠線を消す */
  background: transparent;
}
</style>
