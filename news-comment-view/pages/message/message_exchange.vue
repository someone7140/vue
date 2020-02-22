<template>
  <div>
    <header-component />
    <div>メッセージ一覧</div>
    <div v-if="counterUser">
      <message-list :counter_user="counterUser" />
    </div>
    <flash-message-display-component />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import api_mixin from "~/mixins/api_mixin.js";
import FlashMessageDisplayComponent from "~/components/common/FlashMessageDisplayComponent.vue";
import HeaderComponent from "~/components/common/HeaderComponent.vue";
import MessageList from "~/components/message/MessageListComponent.vue";

export default {
  mixins: [api_mixin],
  components: {
    FlashMessageDisplayComponent,
    HeaderComponent,
    MessageList
  },
  computed: {
    ...mapState("userStore", ["userInfo", "isSignedIn"]),
    ...mapState("messageStore", ["messageUserList"])
  },
  data() {
    return {
      counterUser: undefined
    };
  },
  async created() {
    this.counterUserId = this.$route.query.user_id;
    if (!this.isSignedIn || !this.counterUserId) {
      this.$router.push({ path: "/" });
    } else {
      let response = await this.getReponseApi(
        this.$axios,
        "getMessages?counter_user_id=" + this.counterUserId
      );
      if (response && response.status == 200) {
        this.updateMessageDisplayList({
          messageDisplayList: []
        });
        this.counterUser = response.data.counter_user_info;
        if (response.data.message_records.length > 0) {
          this.updateMessageList({
            messageList: response.data.message_records
          });
          let postData = {
            un_read: {
              counter_user_id: this.counterUserId,
              flg: false
            }
          };
          let responseUnRead = await this.postApi(
            this.$axios,
            "updateUnRead",
            postData
          );
          if (responseUnRead && responseUnRead.status == 200) {
            // messageUserListのstore未読フラグを更新
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
              if (updatedMessage.user_id == this.counterUser.user_id) {
                updatedMessage.un_read_flg = false;
              }
              return updatedMessage;
            });
            this.updateMessageUserList({
              messageUserList: updatedMessageUserList
            });
            // userInfoのstore未読フラグを更新
            this.updateUnReadMessageFlg({
              unReadMessageFlg:
                updatedMessageUserList.filter(m => m.un_read_flg).length > 0
            });
          }
        } else {
          this.updateMessageList({ messageList: [] });
        }
      }
    }
  },
  methods: {
    ...mapActions("messageStore", [
      "updateMessageUserList",
      "updateMessageList",
      "updateMessageDisplayList"
    ]),
    ...mapActions("userStore", ["updateUnReadMessageFlg"])
  }
};
</script>
