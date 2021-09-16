<template>
  <div>
    <div v-if="isLogin" class="mt-2">
      <div class="header fixed-top">
        {{ userInfo.name }}さんでログイン中
        <button class="ml-4 btn btn-secondary" @click="googleLogout">
          ログアウト
        </button>
        <div class="mt-2">
          <SearchComponent />
        </div>
        <div class="mt-2 register">
          <PdfRegisterComponent
            :updateRefreshPdfListTimestamp="updateRefreshPdfListTimestamp"
          />
        </div>
      </div>
      <div class="pdfList">
        <PdfListComponent
          :refreshPdfListTimestamp="refreshPdfListTimestamp"
          :updateRefreshPdfListTimestamp="updateRefreshPdfListTimestamp"
        />
      </div>
    </div>
    <div v-else>
      <button class="btn btn-primary" @click="googleLogin">
        Googleログイン
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import apiMixin from "~/mixins/apiMixin.js";
import authMixin from "~/mixins/authMixin.js";
import SearchComponent from "~/components/search/SearchComponent.vue";
import PdfListComponent from "~/components/view/PdfListComponent.vue";
import PdfRegisterComponent from "~/components/register/PdfRegisterComponent.vue";

export default {
  mixins: [apiMixin, authMixin],
  data: function () {
    return {
      searchWord: "",
      refreshPdfListTimestamp: 0,
    };
  },
  components: {
    SearchComponent,
    PdfRegisterComponent,
    PdfListComponent,
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),
    ...mapGetters("userStore", ["isLogin"]),
    isDisableSearchButton() {
      return !this.searchWord;
    },
  },
  mounted() {
    this.accessTokenCheck(this.userInfo, this.updateUserInfo);
  },
  methods: {
    ...mapActions("userStore", ["updateUserInfo"]),
    async googleLogin() {
      const errorLoginDisplay = () => {
        this.$toast.error("ログインできませんでした", {
          position: "top-right",
        });
      };
      try {
        const authCode = await this.$gAuth.getAuthCode();
        if (authCode) {
          const result = await this.postApi(
            "/user/auth",
            {
              authCode: authCode,
            },
            undefined
          );
          if (result) {
            this.updateUserInfo(result);
          } else {
            errorLoginDisplay();
          }
        } else {
          errorLoginDisplay();
        }
      } catch (_) {
        errorLoginDisplay();
      }
    },
    googleLogout() {
      this.updateUserInfo(undefined);
      window.localStorage.clear();
      this.$toast.success("ログアウトしました", {
        position: "top-right",
      });
    },
    async updateRefreshPdfListTimestamp() {
      var date = new Date();
      const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      await _sleep(300);
      this.refreshPdfListTimestamp = date.getTime();
    },
  },
};
</script>

<style>
.header {
  max-width: 350px;
  background: white;
  margin: auto;
}
.register {
  text-align: right;
}
.pdfList {
  margin-top: 150px;
}
</style>
