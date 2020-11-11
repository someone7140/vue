<template>
  <div style="display: inline-block; _display: inline;">
    <nuxt-link :to="chatLink">
      <font-awesome-icon icon="door-open" class="fa-5x door-active" />
    </nuxt-link>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";
import { mapActions, mapState } from "vuex";
import chatMixin from "~/mixins/chatMixin.js";

export default {
  computed: {
    ...mapState("masterStore", ["master"]),
    ...mapState("persnalChatStore", ["roomInfo"]),
    ...mapState("userStore", ["userInfo"]),
  },
  mixins: [chatMixin],
  data() {
    return {
      chatLink: undefined,
    };
  },
  created() {
    this.chatLink =
      "/chat/chat_message?type=personal&category=" +
      this.roomInfo.category +
      "&room_id=" +
      this.roomInfo.roomId;

    // ページ離脱時のハンドラー設定
    window.addEventListener("beforeunload", this.chatPageMoveHandler);
    window.addEventListener("unload", this.unloadHandler);
  },
  destroyed() {
    window.removeEventListener("beforeunload", this.chatPageMoveHandler);
    window.removeEventListener("unload", this.unloadHandler);
  },
  methods: {
    ...mapActions("persnalChatStore", ["updateRoomInfo"]),
    async unloadHandler() {
      if (this.roomInfo) {
        this.postApi(this.$axios, "chat/delete_personal_chat", {
          delete_personal_chat_log_param: { room_id: this.roomInfo.roomId },
        });
        this.updateRoomInfo(undefined);
      }
    },
  },
};
</script>

<style>
.door-active {
  color: #ffcc99;
  height: 40px;
  width: 40px;
}
</style>
