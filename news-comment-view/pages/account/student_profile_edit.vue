<template>
  <div>
    <div v-if="masterList && studentProfile">
      <header-component />
      <div>プロフィール編集</div>
      <student-profile-edit :student="studentProfile" />
      <flash-message-display-component />
    </div>
  </div>
</template>
<script>
import api_mixin from "~/mixins/api_mixin.js";
import FlashMessageDisplayComponent from "~/components/common/FlashMessageDisplayComponent.vue";
import HeaderComponent from "~/components/common/HeaderComponent.vue";
import StudentProfileEdit from "~/components/account/StudentProfileEditComponent.vue";
import { mapState, mapActions } from "vuex";

export default {
  mixins: [api_mixin],
  components: {
    FlashMessageDisplayComponent,
    HeaderComponent,
    StudentProfileEdit
  },
  data() {
    return {
      studentProfile: undefined
    };
  },
  computed: {
    ...mapState("userStore", ["userInfo", "isSignedIn"]),
    ...mapState("masterStore", ["masterList"])
  },
  async created() {
    if (!this.isSignedIn || this.userInfo.user_category != "student") {
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
      let response = await this.getReponseApi(this.$axios, "getStudent");
      if (response.status == 200) {
        this.studentProfile = response.data;
      }
    }
  },
  methods: {
    ...mapActions("masterStore", ["updateMasterList"])
  }
};
</script>
