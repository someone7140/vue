<template>
  <div>
    <HeaderComponent />
    <div class="my-3">&nbsp;</div>
    <PersonalChatRoomComponent :category="categoryObj.key" />
    <FooterComponent />
  </div>
</template>

<script>
import { mapState } from "vuex";
import FooterComponent from "~/components/common/FooterComponent.vue";
import HeaderComponent from "~/components/common/HeaderComponent.vue";
import PersonalChatRoomComponent from "~/components/chat/personal_room/PersonalChatRoomComponent.vue";

export default {
  middleware: "authCheck",
  components: {
    FooterComponent,
    HeaderComponent,
    PersonalChatRoomComponent
  },
  computed: {
    ...mapState("masterStore", ["master"])
  },
  data() {
    return {
      categoryObj: undefined
    };
  },
  async created() {
    this.categoryObj = this.master.chat_category_list.find(
      c => c.key == this.$route.query.category
    );
    // カテゴリーが不正だったらtopへ遷移させる
    if (!this.categoryObj) {
      this.$router.push({ path: "/top" });
    }
  }
};
</script>
