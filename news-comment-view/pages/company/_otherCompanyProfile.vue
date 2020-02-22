<template>
  <div>
    <header-component />
    <div v-if="masterList && companyProfile">
      <student-profile-view :company="companyProfile" />
    </div>
  </div>
</template>
<script>
import api_mixin from "~/mixins/api_mixin.js";
import HeaderComponent from "~/components/common/HeaderComponent.vue";
import CompanyProfileView from "~/components/company/CompanyProfileViewComponent.vue";
import { mapState } from "vuex";

export default {
  mixins: [api_mixin],
  components: {
    FlashMessageDisplayComponent,
    HeaderComponent,
    CompanyProfileView
  },
  data() {
    return {
      companyProfile: undefined
    };
  },
  computed: {
    ...mapState("masterStore", ["masterList"])
  },
  async created() {
    let refUserId = this.$route.params.otherCompanyProfile;
    if (!refUserId) {
      this.$router.push({ path: "/" });
    } else {
      // masterがstoreに無い場合はセット
      if (this.masterList == undefined) {
        let response = await this.getReponseApi(this.$axios, "master");
        if (response.status == 200) {
          this.updateMasterList({ masterList: response.data });
        }
      }
      // studentProfileをセット
      let response = await this.getReponseApi(
        this.$axios,
        "getCompanyForRef?user_id=" + refUserId
      );
      if (response.status == 200 && response.data) {
        this.companyProfile = response.data;
      }
    }
  }
};
</script>
