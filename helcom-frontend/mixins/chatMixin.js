export default {
  methods: {
    chatPageMoveHandler(event) {
      // storeの有無判定
      if (this.$store.getters["persnalChatStore/getRoomInfo"]) {
        event.returnValue =
          "一対一チャットの部屋が設定中です。本当にページ離脱しますか。";
      }
    }
  }
};
