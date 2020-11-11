<template>
  <div style="display: inline-block; _display: inline;">
    <button class="exit-btn" @click="exitChat">
      <font-awesome-icon icon="door-open" class="fa-5x door-reserve" />
    </button>
    <modal name="exit-chat-modal-content" class="exit-chat" :width="'300px'" :height="'150px'">
      <p>チャットから退出します。よろしいですか。</p>
      <br />
      <button class="btn btn-dark" @click="exitChatConfirm">退出</button>&nbsp;&nbsp;&nbsp;
      <button class="btn btn-dark" @click="exitChatCancel">キャンセル</button>
      <br />
    </modal>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";
import { mapActions, mapState } from "vuex";
import apiMixin from "~/mixins/apiMixin.js";
import chatMixin from "~/mixins/chatMixin.js";

export default {
  computed: {
    ...mapState("masterStore", ["master"]),
    ...mapState("persnalChatStore", ["roomInfo"]),
    ...mapState("userStore", ["userInfo"]),
  },
  mixins: [apiMixin, chatMixin],
  async created() {
    // モーダルを非表示
    this.$modal.hide("exit-chat-modal-content");
    // ページ離脱時のハンドラー設定
    window.addEventListener("beforeunload", this.chatPageMoveHandler);
    window.addEventListener("unload", this.unloadHandler);
    // 部屋情報の監視
    const db = firebase.firestore();
    db.collection("room_personal_chat_" + this.roomInfo.category)
      .doc(this.roomInfo.docId)
      .onSnapshot((doc) => {
        const roomData = doc.data();
        if (roomData && roomData.roomId) {
          // 部屋情報のレコードを削除
          this.postApi(this.$axios, "chat/delete_personal_chat_room", {
            delete_personal_chat_room_param: {
              category: this.roomInfo.category,
              room_doc_id: this.roomInfo.docId,
            },
          });
          this.updateFlashMessageDisp({
            flashMessageDisp: {
              title: "入室完了",
              message:
                "ヘッダーのチャットアイコンをクリックしてチャットを行えます。",
              result: "success",
              watchFlg: true,
            },
          });
          // storeのステータスをactiveに
          this.updateRoomInfo({
            roomInfo: {
              ...this.roomInfo,
              roomId: roomData.roomId,
              status: "active",
            },
          });
        }
      });
  },
  destroyed() {
    window.removeEventListener("beforeunload", this.chatPageMoveHandler);
    window.removeEventListener("unload", this.unloadHandler);
  },
  methods: {
    ...mapActions("persnalChatStore", ["updateRoomInfo"]),
    ...mapActions("flashMessageStore", ["updateFlashMessageDisp"]),
    async unloadHandler() {
      if (this.roomInfo) {
        this.deleteRoom();
      }
    },
    async deleteRoom() {
      // 部屋情報のクリア
      this.postApi(this.$axios, "chat/delete_personal_chat_room", {
        delete_personal_chat_room_param: {
          category: this.roomInfo.category,
          room_doc_id: this.roomInfo.docId,
        },
      });
      this.updateRoomInfo(undefined);
    },
    exitChat() {
      // モーダルを表示
      this.$modal.show("exit-chat-modal-content");
    },
    async exitChatConfirm() {
      this.deleteRoom();
      // モーダルを非表示
      this.$modal.hide("exit-chat-modal-content");
      this.updateFlashMessageDisp({
        flashMessageDisp: {
          title: "退出完了",
          message: "部屋から退出しました。",
          result: "success",
          watchFlg: true,
        },
      });
    },
    exitChatCancel() {
      // モーダルを非表示
      this.$modal.hide("exit-chat-modal-content");
    },
  },
};
</script>

<style>
.door-reserve {
  color: #ffffff;
  height: 40px;
  width: 40px;
}
.exit-btn {
  border: none; /* 枠線を消す */
  outline: none; /* クリックしたときに表示される枠線を消す */
  background: transparent;
}
.exit-chat {
  text-align: center;
}
</style>
