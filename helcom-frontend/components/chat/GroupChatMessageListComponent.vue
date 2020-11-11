<template>
  <div>
    <div>
      <infinite-loading
        ref="infiniteLoading"
        spinner="spiral"
        @infinite="infiniteHandler"
        direction="top"
      >
        <span slot="no-more">&nbsp;</span>
        <span slot="no-results">&nbsp;</span>
      </infinite-loading>
    </div>
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
      <br />
      <br />
      <br />
    </div>
    <div id="scrollEnd"></div>
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
  props: ["type", "category", "title"],
  components: {
    ChatMessageComponent,
  },
  data() {
    return {
      contents: undefined,
      messageList: [],
      collectionName: undefined,
      messageCount: 0,
      pastLogEndFlg: false,
      pastGetUnit: 5,
    };
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),
  },
  async created() {
    // 過去メッセージをDBから取得
    const pastMessages = await this.getPastMesssage();
    if (pastMessages.status == 200) {
      this.updateByPastMessages(
        pastMessages.chat_logs.map((c) => {
          return {
            ...c,
            scroll: true,
          };
        })
      );
    }
    // コレクション名の設定
    this.collectionName = "group_chat_" + this.category;
    // チャットの同期処理
    const db = firebase.firestore();
    // コレクションの設定
    const chatCollection = db.collection(this.collectionName);
    chatCollection
      .orderBy("created_at", "desc")
      .limit(1)
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const addMessage = change.doc.data();
          // 追加の時だけ更新
          if (change.type === "added") {
            this.updateMessageList({
              message_id: addMessage.message_id,
              user_id: addMessage.user_id,
              user_name: addMessage.name,
              image_url: addMessage.image_url,
              contents: addMessage.contents,
              created_at: new Date(addMessage.created_at.seconds * 1000),
              type: "success",
              scroll: true,
            });
          }
        });
      });
  },
  methods: {
    ...mapActions("flashMessageStore", ["updateFlashMessageDisp"]),
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
      };
      // firebaseに登録
      const db = firebase.firestore();
      // コレクションの設定
      const chatCollection = db.collection(this.collectionName);
      chatCollection
        .add(messageObj)
        .then((ref) => {
          // DBにも登録する
          this.postApi(this.$axios, "chat/add_group_chat_log", {
            add_group_chat_log: {
              chat_contents_id: messageId,
              category: this.category,
              contents: this.contents,
            },
          });
          // 成功の時はメッセージを空に
          this.contents = undefined;
          // メッセージのカウントを1追加する
          this.messageCount = this.messageCount + 1;
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
    updateByPastMessages(pastLogs) {
      if (pastLogs.length > 0) {
        this.messageList = pastLogs.concat(this.messageList);
        this.messageCount = this.messageCount + pastLogs.length;
      } else {
        this.pastLogEndFlg = true;
      }
    },
    async getPastMesssage() {
      return await this.getReponseApi(
        this.$axios,
        "chat/get_group_chat_log?limit=" +
          this.pastGetUnit +
          "&skip=" +
          this.messageCount +
          "&category=" +
          this.category
      );
    },
    async infiniteHandler() {
      setTimeout(() => {
        if (this.pastLogEndFlg) {
          this.$refs.infiniteLoading.stateChanger.complete();
        } else {
          this.getPastMesssage().then((res) => {
            if (res.status == 200) {
              this.updateByPastMessages(
                res.chat_logs.map((c) => {
                  return {
                    ...c,
                    scroll: false,
                  };
                })
              );
            }
            this.$refs.infiniteLoading.stateChanger.loaded();
          });
        }
      }, 2000);
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
  margin-bottom: 120px;
}
.chat-footer {
  margin-bottom: 35px;
  display: table;
  width: 100%;
}
.msg-input-area {
  width: 80%;
}
.send-btn {
  margin-bottom: 30px;
}
</style>
