<template>
  <div>
    <div v-if="masterList">
      <header-component />
      <div v-if="!(userCategory == 'company')">会員登録（学生様用）</div>
      <div v-if="userCategory == 'company'">会員登録（企業様用）</div>
      <div>[Facebookで登録]</div>
      <facebook-auth-component :authPurpose="authPurpose" :userCategory="userCategory" />
      <br />
      <div>[メールアドレスで登録]</div>
      <mail-auth-component :authPurpose="authPurpose" :userCategory="userCategory" />
    </div>
  </div>
</template>

<script>
import api_mixin from "~/mixins/api_mixin.js";
import FacebookAuthComponent from "~/components/auth/FacebookAuthComponent.vue";
import HeaderComponent from "~/components/common/HeaderComponent.vue";
import MailAuthComponent from "~/components/auth/MailAuthComponent.vue";
import { mapState, mapActions } from "vuex";

export default {
  mixins: [api_mixin],
  components: {
    FacebookAuthComponent,
    HeaderComponent,
    MailAuthComponent
  },
  data() {
    return {
      authPurpose: "register",
      userCategory: "student"
    };
  },
  computed: {
    ...mapState("masterStore", ["masterList"])
  },
  methods: {
    ...mapActions("masterStore", ["updateMasterList"])
  },
  async created() {
    // masterがstoreに無い場合はセット
    if (this.masterList == undefined) {
      let response = await this.getReponseApi(this.$axios, "master");
      if (response.status == 200) {
        this.updateMasterList({ masterList: response.data });
      }
    }
    // クエリパラメータがcompanyの場合
    if (this.$route.query.category == "company") {
      this.userCategory = "company";
    }
  }
};
</script>
