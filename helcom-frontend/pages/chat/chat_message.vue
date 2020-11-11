<template>
  <div>
    <HeaderComponent />
    <div class="my-3">&nbsp;</div>
    <div v-if="type == 'group'">
      <GroupChatMessageListComponent
        :type="type"
        :category="categoryObj.key"
        :title="title"
      />
    </div>
    <div v-if="type == 'personal'">
      <PersonalChatMessageListComponent
        :type="type"
        :category="categoryObj.key"
        :roomId="roomId"
        :title="title"
      />
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import GroupChatMessageListComponent from "~/components/chat/GroupChatMessageListComponent.vue";
import FooterComponent from "~/components/common/FooterComponent.vue";
import HeaderComponent from "~/components/common/HeaderComponent.vue";
import PersonalChatMessageListComponent from "~/components/chat/PersonalChatMessageListComponent.vue";

export default {
  middleware: "authCheck",
  components: {
    GroupChatMessageListComponent,
    FooterComponent,
    HeaderComponent,
    PersonalChatMessageListComponent
  },
  computed: {
    ...mapState("masterStore", ["master"]),
    ...mapState("persnalChatStore", ["roomInfo"])
  },
  data() {
    return {
      type: undefined,
      categoryObj: undefined,
      title: undefined,
      roomId: undefined
    };
  },
  created() {
    const type = this.$route.query.type;
    this.categoryObj = this.master.chat_category_list.find(
      c => c.key == this.$route.query.category
    );
    // typeかカテゴリーが不正だったらtopへ遷移させる
    if ((type == "group" || type == "personal") && this.categoryObj) {
      // 一対一チャットの場合は部屋IDを取得
      if (type == "personal") {
        const roomId = this.$route.query.room_id;
        // パラメータの部屋IDとstoreの部屋IDを照合
        if (roomId == this.roomInfo.roomId) {
          this.roomId = roomId;
        } else {
          this.updateFlashMessageDisp({
            flashMessageDisp: {
              title: "エラー",
              message: "この一対一チャットの部屋にはアクセスできません。",
              result: "error",
              watchFlg: false
            }
          });
          this.$router.push({ path: "/top" });
        }
      }
      this.title = `【${
        type == "group" ? "グループチャット" : "一対一チャット"
      }】${this.categoryObj.value}`;
      this.type = type;
    } else {
      this.$router.push({ path: "/top" });
    }
  },
  methods: {
    ...mapActions("flashMessageStore", ["updateFlashMessageDisp"])
  }
};
</script>
