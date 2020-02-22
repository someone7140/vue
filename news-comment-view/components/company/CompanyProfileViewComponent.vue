<template>
  <div>
    <div>
      <div>プロフィール参照</div>
      <br />
      <div v-if="!isOwnUser">
        <button type="button" @click="backToBefore">前の画面に戻る</button>
      </div>
      <table>
        <tr>
          <td>
            <profile-image-display :imageUrl="company.image_url" :size="imageSize" />
          </td>
          <td>
            <b>{{ company.company_name }}</b>
            <br />
            {{ company.category }}
            <br />
            {{ getPrefecture }}
            <br />
            <div v-if="isDisplayDm">
              <button type="button" @click="toMessageScreen">メッセージを送る</button>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <br />
    <div>
      <span v-if="company.url">
        <h5>ホームページ</h5>
        <a :href="company.url" target="_blank">{{ company.url }}</a>
      </span>
      <h5>詳細</h5>
      {{ company.detail }}
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import api_mixin from "~/mixins/api_mixin.js";
import common_mixin from "~/mixins/common_mixin.js";
import ProfileImageDisplay from "~/components/common/ProfileImageDisplayComponent.vue";

export default {
  mixins: [api_mixin, common_mixin],
  props: ["company"],
  components: {
    ProfileImageDisplay
  },
  data() {
    return {
      imageSize: 120
    };
  },
  computed: {
    ...mapState("masterStore", ["masterList"]),
    ...mapState("userStore", ["userInfo", "isSignedIn"]),
    ...mapState("historyBackStore", ["historyBackFlg"]),
    isOwnUser: function() {
      return this.userInfo && this.company.user_id == this.userInfo.user_id;
    },
    isDisplayDm: function() {
      return (
        this.userInfo &&
        this.userInfo.user_category == "student" &&
        !this.isOwnUser
      );
    },
    getPrefecture() {
      return this.getDisplayPrefecture(this.company.prefecture_code);
    }
  },
  async created() {
    if (this.historyBackFlg == "true") {
      this.updateHistoryBackFlg({ historyBackFlg: "false" });
    }
  },
  methods: {
    ...mapActions("historyBackStore", ["updateHistoryBackFlg"]),
    backToBefore() {
      this.updateHistoryBackFlg({ historyBackFlg: "true" });
      this.$router.go(-1);
    },
    toMessageScreen() {
      this.$router.push({
        path: "/message/message_exchange?user_id=" + this.company.user_id
      });
    }
  }
};
</script>
<style scoped>
h5 {
  padding: 0.5em; /*文字周りの余白*/
  color: #ffffff; /*文字色*/
  background: #a9a9a9; /*背景色*/
}
</style>
