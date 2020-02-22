<template>
  <div>
    <header-component />
    <div>退会</div>
    <div v-if="isStudent">
      やりとりしている企業様がある場合、退会の旨ご連絡の上退会してください
      <br />
      <button type="button" @click="quit">退会する</button>
      <div v-if="message">{{ message }}</div>
    </div>
    <div v-if="!isStudent">shake hands社へ別途ご連絡ください。</div>
  </div>
</template>

<script>
import api_mixin from "~/mixins/api_mixin.js";
import HeaderComponent from "~/components/common/HeaderComponent.vue";
import { mapState, mapActions } from "vuex";

export default {
  mixins: [api_mixin],
  data() {
    return {
      message: undefined
    };
  },
  components: {
    HeaderComponent
  },
  computed: {
    ...mapState("userStore", ["userInfo", "isSignedIn"]),
    isStudent: function() {
      return this.userInfo.user_category == "student";
    }
  },
  methods: {
    ...mapActions("flashMessageStore", ["updateFlashMessageDisp"]),
    ...mapActions("userStore", ["updateUserInfo", "updateLoginState"]),
    async quit() {
      if (confirm("退会してよろしいですか？")) {
        let response = await this.postApi(this.$axios, "deleteStudent", {});
        if (response.status == 200) {
          this.updateUserInfo({ userInfo: undefined });
          this.updateLoginState({ isSignedIn: false });
          this.updateFlashMessageDisp({
            flashMessageDisp: {
              title: "退会完了",
              message: "退会しました",
              position: "right bottom",
              result: "success",
              watchFlg: false
            }
          });
          this.$router.push({ path: "/" });
        } else {
          this.message =
            "退会操作に失敗しました。お手数ですが運営にお問い合わせお願いします。";
        }
      }
    }
  },
  async created() {
    if (this.userInfo == undefined || !this.isSignedIn) {
      this.$router.push({ path: "/" });
    }
  }
};
</script>
