<template>
  <div>
    <header-component />
    <div>プロフィール登録（学生様用）</div>
    <div v-if="userInfo">
      <student-profile-edit />
    </div>
  </div>
</template>
<script>
import HeaderComponent from "~/components/common/HeaderComponent.vue";
import StudentProfileEdit from "~/components/account/StudentProfileEditComponent.vue";
import { mapState } from "vuex";

export default {
  components: {
    HeaderComponent,
    StudentProfileEdit
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
