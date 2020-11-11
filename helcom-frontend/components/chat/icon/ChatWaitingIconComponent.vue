<template>
  <div style="display: inline-block; _display: inline">
    <nuxt-link :to="chatLink">
      <font-awesome-icon icon="door-open" class="fa-5x door-waiting" />
    </nuxt-link>
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
  data() {
    return {
      chatLink: undefined,
      roomData: undefined,
    };
  },
  async created() {
    this.chatLink =
      "/chat/chat_message?type=personal&category=" +
      this.roomInfo.category +
      "&room_id=" +
      this.roomInfo.roomId;
    // ページ離脱時のハンドラー設定
    window.addEventListener("beforeunload", this.chatPageMoveHandler);
    window.addEventListener("unload", this.unloadHandler);

    this.watchRoomInfo();
  },
  destroyed() {
    window.removeEventListener("beforeunload", this.chatPageMoveHandler);
    window.removeEventListener("unload", this.unloadHandler);
  },
  methods: {
    ...mapActions("persnalChatStore", ["updateRoomInfo"]),
    ...mapActions("flashMessageStore", ["updateFlashMessageDisp"]),
    async watchRoomInfo() {
      // 部屋情報のスナップショットの監視
      const db = firebase.firestore();
      db.collection("room_personal_chat_" + this.roomInfo.category)
        .doc(this.roomInfo.docId)
        .onSnapshot((change) => {
          const data = change.data();
          if (data && change.type !== "removed") {
            this.roomData = data;
            // 相手が入室した
            if (this.roomData.counterUserId && !this.roomData.roomId) {
              // チャットの設定に相手のユーザIDを書き込む
              const db2 = firebase.firestore();
              const chatSettingDoc = db
                .collection("personal_chat_" + this.roomInfo.roomId)
                .doc(this.roomInfo.chatSettingInfoDocId);
              chatSettingDoc
                .update({
                  user_list: [this.userInfo.user_id, data.counterUserId],
                  setting_info: true,
                  created_at: new Date(),
                })
                .then((ref) => {
                  // 相手に部屋情報を渡す
                  const db3 = firebase.firestore();
                  this.roomData = {
                    ...this.roomData,
                    roomId: this.roomInfo.roomId,
                  };
                  const roomDoc = db3
                    .collection("room_personal_chat_" + this.roomInfo.category)
                    .doc(this.roomInfo.docId);
                  roomDoc
                    .update(this.roomData)
                    .then((ref) => {
                      // メッセージ表示
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
                          status: "active",
                        },
                      });
                    })
                    .catch((error) => {
                      this.updateFlashMessageDisp({
                        flashMessageDisp: {
                          title: "エラー",
                          message:
                            "エラーが発生しました。恐れ入りますが部屋を再作成してください。",
                          result: "error",
                          watchFlg: true,
                        },
                      });
                      this.deleteChatAndRoom();
                    });
                })
                .catch((error) => {
                  this.updateFlashMessageDisp({
                    flashMessageDisp: {
                      title: "エラー",
                      message:
                        "エラーが発生しました。恐れ入りますが部屋を再作成してください。",
                      result: "error",
                      watchFlg: true,
                    },
                  });
                  this.deleteChatAndRoom();
                });
            }
          }
        });
    },
    async unloadHandler() {
      if (this.roomInfo) {
        this.deleteChatAndRoom();
      }
    },
    async deleteChatAndRoom() {
      // チャットと部屋情報のクリア
      this.postApi(this.$axios, "chat/delete_personal_chat_log_and_room", {
        delete_personal_chat_log_and_room_param: {
          room_id: this.roomInfo.roomId,
          category: this.roomInfo.category,
          room_doc_id: this.roomInfo.docId,
        },
      });
      this.updateRoomInfo(undefined);
    },
  },
};
</script>

<style>
.door-waiting {
  color: #ffffff;
  height: 40px;
  width: 40px;
}
</style>
