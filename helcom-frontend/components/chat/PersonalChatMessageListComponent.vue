<template>
  <div>
    <div class="message-area">
      <div v-for="messageObj of messageList" v-bind:key="messageObj.message_id">
        <ChatMessageComponent :messageObj="messageObj" />
      </div>
    </div>
    <div class="fixed-bottom bg-white text-center title-footer">
      {{ title }}
      <br />
      <br />
    </div>
    <div class="fixed-bottom bg-white text-center chat-footer">
      <div style="display:table-cell; width:80%;">
        <textarea class="msg-input-area" rows="2" v-model="contents" />
      </div>
      <div style="display:table-cell; width:20%;">
        <button class="btn btn-dark send-btn" @click="sendMessage" :disabled="!this.contents">送信</button>
      </div>
    </div>
    <div class="fixed-bottom bg-white text-center end-footer">
      <button class="btn btn-dark send-btn" @click="endChat">退出する</button>
    </div>
    <br />
    <div id="scrollEnd"></div>
    <modal name="end-chat-modal-content" class="end-chat" :width="'300px'" :height="'150px'">
      <p>チャットから退出します。よろしいですか。</p>
      <br />
      <button class="btn btn-dark" @click="endChatConfirm">退出</button>&nbsp;&nbsp;&nbsp;
      <button class="btn btn-dark" @click="endChatCancel">キャンセル</button>
      <br />
    </modal>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";
import { mapActions, mapState } from "vuex";
import apiMixin from "~/mixins/apiMixin.js";
import commonMixin from "~/mixins/commonMixin.js";
import ChatMessageComponent from "~/components/chat/ChatMessageComponent.vue";

export default {
  mixins: [apiMixin, commonMixin],
  props: ["type", "category", "roomId", "title"],
  components: {
    ChatMessageComponent,
  },
  data() {
    return {
      contents: undefined,
      messageList: [],
      collectionName: undefined,
      settingDocId: undefined,
      deletePostFlg: true,
    };
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),
    ...mapState("persnalChatStore", ["roomInfo"]),
  },
  async created() {
    // 退出時のモーダルを非表示に
    this.$modal.hide("end-chat-modal-content");
    // コレクション名の設定
    this.collectionName = "personal_chat_" + this.roomId;
    // チャットの同期処理
    const db = firebase.firestore();
    // コレクションの設定
    const chatCollection = db.collection(this.collectionName);
    // 設定チェック
    chatCollection
      .where("setting_info", "==", true)
      .get()
      .then((docs) => {
        var settingCheck = false;
        docs.forEach((doc) => {
          const settingData = doc.data();
          this.settingDocId = doc.id;
          if (settingData.user_list.some((u) => u == this.userInfo.user_id)) {
            settingCheck = true;
          }
        });
        if (settingCheck) {
          // メッセージの監視を開始
          const db2 = firebase.firestore();
          // コレクションの設定
          const chatCollection2 = db.collection(this.collectionName);
          chatCollection2
            .orderBy("created_at", "asc")
            .limit(100)
            .onSnapshot((snapshot) => {
              snapshot.docChanges().forEach((change) => {
                const message = change.doc.data();
                // 追加の時だけ更新
                if (change.type === "added" && !message.setting_info) {
                  this.updateMessageList({
                    message_id: message.message_id,
                    user_id: message.user_id,
                    user_name: message.name,
                    image_url: message.image_url,
                    contents: message.contents,
                    created_at: new Date(message.created_at.seconds * 1000),
                    type: "success",
                    setting_info: false,
                    scroll: true,
                  });
                } else if (change.type === "removed") {
                  // 削除の時はチャットが終了と判断
                  this.deletePostFlg = false;
                  this.counterPartEnd();
                }
              });
            });
        } else {
          this.updateFlashMessageDisp({
            flashMessageDisp: {
              title: "エラー",
              message:
                "エラーが発生しました。恐れ入りますが部屋を再作成してください。",
              result: "error",
              watchFlg: false,
            },
          });
          this.deleteChatLog();
          this.updateRoomInfo(undefined);
          this.$router.push({ path: "/top" });
        }
      })
      .catch((error) => {
        this.updateFlashMessageDisp({
          flashMessageDisp: {
            title: "エラー",
            message:
              "エラーが発生しました。恐れ入りますが部屋を再作成してください。",
            result: "error",
            watchFlg: false,
          },
        });
        this.deleteChatLog();
        this.updateRoomInfo(undefined);
        this.$router.push({ path: "/top" });
      });
  },
  methods: {
    ...mapActions("flashMessageStore", ["updateFlashMessageDisp"]),
    ...mapActions("persnalChatStore", ["updateRoomInfo"]),
    async sendMessage() {
      const messageId = this.generateRamdomToken(16);
      const messageObj = {
        message_id: messageId,
        user_id: this.userInfo.user_id,
        user_name: this.userInfo.name,
        image_url: this.userInfo.image_url,
        contents: this.contents,
        created_at: new Date(),
        type: "success",
        setting_info: false,
      };
      // firebaseに登録
      const db = firebase.firestore();
      // コレクションの設定
      const chatCollection = db.collection(this.collectionName);
      chatCollection
        .add(messageObj)
        .then((ref) => {
          // 成功の時はメッセージを空に
          this.contents = undefined;
        })
        .catch((error) => {
          // エラーのときはメッセージに表示
          const errMessageId = this.generateRamdomToken(16);
          const errMessageObj = {
            message_id: errMessageId,
            contents:
              "メッセージ送信時にエラーが発生しました。再度送信してください。",
            created_at: new Date(),
            type: "error",
          };
          this.updateMessageList(errMessageObj);
        });
    },
    updateMessageList(addMessageObj) {
      // 該当のメッセージIDが配列にない場合のみ更新
      if (
        !this.messageList.some((m) => m.message_id == addMessageObj.message_id)
      ) {
        this.messageList = [...this.messageList, addMessageObj];
      }
    },
    endChat() {
      // モーダルを表示
      this.$modal.show("end-chat-modal-content");
    },
    async endChatConfirm() {
      this.deleteChatLog();
      // メッセージ
      this.updateFlashMessageDisp({
        flashMessageDisp: {
          title: "終了",
          message: "一対一チャットを終了しました。",
          result: "success",
          watchFlg: false,
        },
      });
      // モーダルを非表示に
      this.$modal.hide("end-chat-modal-content");
      this.updateRoomInfo(undefined);
      this.$router.push({ path: "/top" });
    },
    async counterPartEnd() {
      this.deleteChatLog();
      // メッセージ
      this.updateFlashMessageDisp({
        flashMessageDisp: {
          title: "一対一チャット終了",
          message: "お相手が退出しました。",
          result: "success",
          watchFlg: false,
        },
      });
      this.updateRoomInfo(undefined);
      this.$router.push({ path: "/top" });
    },
    endChatCancel() {
      // モーダルを非表示に
      this.$modal.hide("end-chat-modal-content");
    },
    deleteChatLog() {
      // wait状態のときは部屋情報のレコードも削除
      if (this.roomInfo.status == "wait") {
        this.postApi(this.$axios, "chat/delete_personal_chat_room", {
          delete_personal_chat_room_param: {
            category: this.category,
            room_doc_id: this.roomInfo.docId,
          },
        });
      }
      // postFlgがtrueの時はchatのデータを消す
      if (this.deletePostFlg) {
        this.postApi(this.$axios, "chat/delete_personal_chat_log", {
          delete_personal_chat_log_param: { room_id: this.roomInfo.roomId },
        });
      }
    },
  },
};
</script>

<style>
.message-area {
  margin-bottom: 140px;
  margin-top: 20px;
}
.title-footer {
  width: 100%;
  margin-bottom: 150px;
}
.chat-footer {
  margin-bottom: 90px;
  display: table;
  width: 100%;
}
.msg-input-area {
  width: 80%;
}
.send-btn {
  margin-bottom: 30px;
}
.end-chat {
  text-align: center;
}
.end-footer {
  width: 100%;
  margin-bottom: 45px;
}
</style>
