<template>
  <div>
    <header-component />
    <div>メッセージ</div>
    <message-user-list />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import api_mixin from "~/mixins/api_mixin.js";
import HeaderComponent from "~/components/common/HeaderComponent.vue";
import MessageUserList from "~/components/message/MessageUserListComponent.vue";

export default {
  mixins: [api_mixin],
  components: {
    HeaderComponent,
    MessageUserList
  },
  computed: {
    ...mapState("userStore", ["userInfo", "isSignedIn"]),
    ...mapState("historyBackStore", ["historyBackFlg"])
  },
  async created() {
    if (!this.isSignedIn) {
      this.$router.push({ path: "/" });
    } else {
      if (this.historyBackFlg != "true") {
        let response = await this.getReponseApi(this.$axios, "getMessageUsers");
        if (response && response.status == 200) {
          this.updateMessageUserDisplayList({
            messageUserDisplayList: []
          });
          this.updateMessageUserList({ messageUserList: response.data });
        }
      } else {
        this.updateHistoryBackFlg({ historyBackFlg: "false" });
      }
    }
  },
  methods: {
    ...mapActions("messageStore", [
      "updateMessageUserList",
      "updateMessageUserDisplayList"
    ]),
    ...mapActions("historyBackStore", ["updateHistoryBackFlg"])
  }
};
</script>
