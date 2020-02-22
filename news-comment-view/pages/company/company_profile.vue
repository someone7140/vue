<template>
  <div>
    <header-component />
    <div>プロフィール登録（企業様用）</div>
    <div v-if="userInfo">
      <company-profile-edit />
    </div>
  </div>
</template>
<script>
import HeaderComponent from "~/components/common/HeaderComponent.vue";
import CompanyProfileEdit from "~/components/company/CompanyProfileEditComponent.vue";
import { mapState } from "vuex";

export default {
  components: {
    HeaderComponent,
    CompanyProfileEdit
  },
  computed: {
    ...mapState("userStore", ["userInfo", "isSignedIn"]),
    ...mapState("masterStore", ["masterList"])
  },
  created() {
    if (
      this.userInfo == undefined ||
      this.masterList == undefined ||
      this.isSignedIn
    ) {
      this.$router.push({ path: "/" });
    }
  }
};
</script>
