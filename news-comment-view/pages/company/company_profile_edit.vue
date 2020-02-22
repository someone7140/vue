<template>
  <div>
    <div v-if="masterList && companyProfile">
      <header-component />
      <div>プロフィール編集</div>
      <company-profile-edit :company="companyProfile" />
      <flash-message-display-component />
    </div>
  </div>
</template>
<script>
import api_mixin from "~/mixins/api_mixin.js";
import FlashMessageDisplayComponent from "~/components/common/FlashMessageDisplayComponent.vue";
import HeaderComponent from "~/components/common/HeaderComponent.vue";
import CompanyProfileEdit from "~/components/company/CompanyProfileEditComponent.vue";
import { mapState, mapActions } from "vuex";

export default {
  mixins: [api_mixin],
  components: {
    FlashMessageDisplayComponent,
    HeaderComponent,
    CompanyProfileEdit
  },
  data() {
    return {
      companyProfile: undefined
    };
  },
  computed: {
    ...mapState("userStore", ["userInfo", "isSignedIn"]),
    ...mapState("masterStore", ["masterList"])
  },
  async created() {
    if (!this.isSignedIn || this.userInfo.user_category == "student") {
      this.$router.push({ path: "/" });
    } else {
      // masterがstoreに無い場合はセット
      if (this.masterList == undefined) {
        let response = await this.getReponseApi(this.$axios, "master");
        if (response.status == 200) {
          this.updateMasterList({ masterList: response.data });
        }
      }
      // companyProfileをセット
      let response = await this.getReponseApi(this.$axios, "getCompany");
      if (response.status == 200) {
        this.companyProfile = response.data;
      }
    }
  },
  methods: {
    ...mapActions("masterStore", ["updateMasterList"])
  }
};
</script>
