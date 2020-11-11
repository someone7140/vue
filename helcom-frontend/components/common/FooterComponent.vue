<template>
  <div>
    <br />
    <br />
    <br />
    <br />
    <br />
    <footer>
      <div class="text-center fixed-bottom bg-white">
        <div v-if="isSignedIn">
          <nuxt-link to="/common/inquiry">お問い合わせはこちら</nuxt-link>
        </div>Copyright &copy; HELCOM All Rights Reserved &middot;
        <nuxt-link to="/common/privacy" target="_blank">Privacy</nuxt-link>&middot;
        <nuxt-link to="/common/terms" target="_blank">Terms</nuxt-link>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("userStore", ["isSignedIn"]),
  },
};
</script>
<style>
.helcom-footer {
  width: 100%;
}
</style>