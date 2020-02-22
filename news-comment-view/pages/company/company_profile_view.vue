<template>
  <div>
    <div v-if="masterList && companyProfile">
      <header-component />
      <company-profile-view :company="companyProfile" />
    </div>
  </div>
</template>
<script>
import api_mixin from "~/mixins/api_mixin.js";
import HeaderComponent from "~/components/common/HeaderComponent.vue";
import CompanyProfileView from "~/components/company/CompanyProfileViewComponent.vue";
import { mapState, mapActions } from "vuex";

export default {
  mixins: [api_mixin],
  components: {
    HeaderComponent,
    CompanyProfileView
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
      // companyProfileをstoreにセット
      let response = await this.getReponseApi(this.$axios, "getCompanyForRef");
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
