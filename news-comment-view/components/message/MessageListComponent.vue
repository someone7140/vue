<template>
  <div>
    <div id="fixAreaTop">
      <table>
        <tr>
          <td>
            <button type="button" @click="backToPrefScreen">前の画面に戻る</button>
          </td>
          <td>{{ counter_user.name }}</td>
        </tr>
      </table>
    </div>
    <div id="messageArea">
      <div v-for="messageObj of messageDisplayList" v-bind:key="messageObj.index">
        <message-component :message="messageObj" :counter_user="counter_user" />
      </div>
      <infinite-loading
        ref="infiniteLoading"
        spinner="spiral"
        @infinite="infiniteHandler"
        direction="top"
      >
        <span slot="no-more">&nbsp;</span>
        <span slot="no-results">&nbsp;</span>
      </infinite-loading>
      <div id="fixAreaBottom">
        <table>
          <tr>
            <td>
              <textarea cols="35" rows="1" v-model="message" placeholder="メッセージを入力してください" />
            </td>
            <td>
              <button type="button" @click="sendMessage">メッセージを送信</button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<style>
#messageArea {
  width: 450px;
  z-index: -11;
}
#fixAreaBottom {
  bottom: 0px;
  position: sticky;
}
#fixAreaTop {
  position: sticky;
  top: 66px;
  background-color: #ffffff;
}
</style>
<script>
import { mapState, mapActions } from "vuex";
import api_mixin from "~/mixins/api_mixin.js";
import MessageComponent from "~/components/message/MessageComponent.vue";

export default {
  mixins: [api_mixin],
  components: {
    MessageComponent
  },
  props: ["counter_user"],
  data() {
    return {
      message: undefined
    };
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),
    ...mapState("messageStore", [
      "messageList",
      "messageDisplayList",
      "messageUserList"
    ])
  },
  methods: {
    ...mapActions("messageStore", ["updateMessageDisplayList"]),
    ...mapActions("messageStore", ["updateMessageList"]),
    ...mapActions("messageStore", ["updateMessageUserList"]),
    ...mapActions("historyBackStore", ["updateHistoryBackFlg"]),
    ...mapActions("flashMessageStore", ["updateFlashMessageDisp"]),
    infiniteHandler() {
      setTimeout(() => {
        let messageListLength = this.messageList.length;
        let displayMessageListLength = this.messageDisplayList.length;
        // 全件リストと表示リストの件数比較
        if (messageListLength != displayMessageListLength) {
          this.updateDisplayList(messageListLength, displayMessageListLength);
          this.$refs.infiniteLoading.stateChanger.loaded();
        } else {
          this.$refs.infiniteLoading.stateChanger.complete();
        }
      }, 1000);
    },
    updateDisplayList(messageListLength, displayMessageListLength) {
      let undisplaySize = messageListLength - displayMessageListLength;
      let updatedDisplay = [];
      if (undisplaySize > 0) {
        let diff = messageListLength - undisplaySize;
        // 10件ずつ読み込み
        let getDisplaySize = undisplaySize >= 10 ? 10 : undisplaySize;
        let appendDisplayList = this.messageList.slice(
          diff,
          diff + getDisplaySize
        );
        if (displayMessageListLength > 0) {
          updatedDisplay = this.messageDisplayList.concat(appendDisplayList);
        } else {
          updatedDisplay = appendDisplayList;
        }
      }
      this.updateMessageDisplayList({
        messageDisplayList: updatedDisplay.sort(function(a, b) {
          return a.send_at > b.send_at ? 1 : -1;
        })
      });
    },
    backToPrefScreen() {
      this.updateHistoryBackFlg({ historyBackFlg: "true" });
      this.$router.go(-1);
    },
    async sendMessage() {
      if (this.message && this.message.length > 0) {
        let postData = {
          message: {
            counter_user_id: this.counter_user.user_id,
            message: this.message
          }
        };
        let response = await this.postApi(this.$axios, "postMessage", postData);
        if (response.status == 200) {
          let now = new Date();
          // messageUserListのstoreの最新メッセージを更新
          let updatedMessageUserList = this.messageUserList.map(m => {
            var updatedMessage = {
              user_id: m.user_id,
              un_read_flg: m.un_read_flg,
              recent_message: m.recent_message,
              recent_message_date: m.recent_message_date,
              image_url: m.image_url,
              name: m.name,
              gender: m.gender,
              user_category: m.user_category
            };
            if (updatedMessage.user_id == this.counter_user.user_id) {
              updatedMessage.recent_message = this.message.slice(0, 50);
              updatedMessage.recent_message_date = now;
            }
            return updatedMessage;
          });
          this.updateMessageUserList({
            messageUserList: updatedMessageUserList
          });
          // messageListのstoreに追加したメッセージを追加
          let addMessage = {
            send_user_id: this.userInfo.user_id,
            received_user_id: this.counter_user.user_id,
            message: this.message,
            send_at: now
          };
          var updatedDisplayMessageList = this.messageDisplayList.concat();
          updatedDisplayMessageList.push(addMessage);
          this.updateMessageDisplayList({
            messageDisplayList: updatedDisplayMessageList
          });
          var updatedMessageList = this.messageList.concat();
          updatedMessageList.unshift(addMessage);
          this.updateMessageList({
            messageList: updatedMessageList
          });
          // 完了メッセージ
          this.updateFlashMessageDisp({
            flashMessageDisp: {
              title: "送信完了",
              message: "メッセージを送信しました",
              position: "right bottom",
              result: "success",
              watchFlg: true
            }
          });
        } else {
          this.updateFlashMessageDisp({
            flashMessageDisp: {
              title: "送信エラー",
              message: "送信時にエラーが発生しました",
              position: "right bottom",
              result: "error",
              watchFlg: true
            }
          });
        }
      }
    }
  }
};
</script>
