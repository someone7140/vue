<template>
  <div>
    <header-component />
    <div v-if="masterList && studentProfile">
      <student-profile-view :student="studentProfile" />
      <flash-message-display-component />
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import api_mixin from "~/mixins/api_mixin.js";
import FlashMessageDisplayComponent from "~/components/common/FlashMessageDisplayComponent.vue";
import HeaderComponent from "~/components/common/HeaderComponent.vue";
import StudentProfileView from "~/components/account/StudentProfileViewComponent.vue";

export default {
  mixins: [api_mixin],
  components: {
    FlashMessageDisplayComponent,
    HeaderComponent,
    StudentProfileView
  },
  data() {
    return {
      studentProfile: undefined
    };
  },
  computed: {
    ...mapState("masterStore", ["masterList"])
  },
  methods: {
    ...mapActions("masterStore", ["updateMasterList"])
  },
  async created() {
    let refUserId = this.$route.params.otherStudentProfile;
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
        "getStudentForRef?user_id=" + refUserId
      );
      if (response.status == 200 && response.data) {
        this.studentProfile = response.data;
      }
    }
  }
};
</script>
