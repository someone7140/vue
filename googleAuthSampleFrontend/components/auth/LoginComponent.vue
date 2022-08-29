<template>
  <input type="button" value="Googleログイン" @click="googleLogin" />
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const app = getCurrentInstance();
    const root = app.appContext.config.globalProperties;

    async function googleLogin() {
      const errorLoginDisplay = () => {
        root.$toast.error("ログインに失敗しました");
      };
      try {
        const authCode = await root.$gAuth.getAuthCode();
        if (authCode) {
          console.log(authCode);
        } else {
          errorLoginDisplay();
        }
      } catch (e) {
        errorLoginDisplay();
      }
    }
    return { googleLogin };
  },
});
</script>
