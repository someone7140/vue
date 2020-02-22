<template>
  <div>
    <div v-for="messageUser of messageUserDisplayList" v-bind:key="messageUser.index">
      <message-user :messageUser="messageUser" />
    </div>
    <infinite-loading ref="infiniteLoading" spinner="spiral" @infinite="infiniteHandler">
      <span slot="no-more">結果は以上です</span>
      <span slot="no-results">結果は以上です</span>
    </infinite-loading>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import MessageUser from "~/components/message/MessageUserComponent.vue";

export default {
  components: {
    MessageUser
  },
  computed: {
    ...mapState("messageStore", ["messageUserList", "messageUserDisplayList"]),
    getMessageUserListFromStore: function() {
      return this.messageUserList;
    }
  },
  created() {
    // 表示リストと元データを同期させる
    if (this.messageUserDisplayList.length > 0) {
      let messageUserListSliced = this.messageUserList.slice(
        0,
        this.messageUserDisplayList.length
      );
      if (
        JSON.stringify(messageUserListSliced) !=
        JSON.stringify(this.messageUserDisplayList)
      ) {
        this.updateMessageUserDisplayList({
          messageUserDisplayList: this.messageUserList.slice(
            0,
            this.messageUserDisplayList.length - 1
          )
        });
      }
    }
  },
  methods: {
    ...mapActions("messageStore", ["updateMessageUserDisplayList"]),
    infiniteHandler() {
      setTimeout(() => {
        let messageUserListLength = this.messageUserList.length;
        let displayMessageUserListLength = this.messageUserDisplayList.length;
        // 全件リストと表示リストの件数比較
        if (messageUserListLength != displayMessageUserListLength) {
          this.updateDisplayList(
            messageUserListLength,
            displayMessageUserListLength
          );
          this.$refs.infiniteLoading.stateChanger.loaded();
        } else {
          this.$refs.infiniteLoading.stateChanger.complete();
        }
      }, 1000);
    },
    updateDisplayList(messageUserListLength, displayMessageUserListLength) {
      let undisplaySize = messageUserListLength - displayMessageUserListLength;
      let updatedDisplay = [];
      if (undisplaySize > 0) {
        let diff = messageUserListLength - undisplaySize;
        // 10件ずつ読み込み
        let getDisplaySize = undisplaySize >= 10 ? 10 : undisplaySize;
        let appendDisplayList = this.messageUserList.slice(
          diff,
          diff + getDisplaySize
        );
        if (displayMessageUserListLength > 0) {
          updatedDisplay = this.messageUserDisplayList.concat(
            appendDisplayList
          );
        } else {
          updatedDisplay = appendDisplayList;
        }
      }
      this.updateMessageUserDisplayList({
        messageUserDisplayList: updatedDisplay
      });
    }
  }
};
</script>
