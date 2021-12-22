<template>
  <input type="button" value="Googleログイン" @click="googleLogin" />
</template>

<script>
import { defineComponent } from "vue";
import useAuthFunction from "../../customFunction/AuthFunctionComponent";

export default defineComponent({
  props: ["setUser"],
  setup() {
    const app = getCurrentInstance();
    const root = app.appContext.config.globalProperties;
    const props = app.props;

    async function googleLogin() {
      const errorLoginDisplay = () => {
        root.$toast.error("ログインに失敗しました");
      };
      const { getUserFromAuthCode } = useAuthFunction();
      try {
        const authCode = await root.$gAuth.getAuthCode();
        if (authCode) {
          const user = await getUserFromAuthCode(authCode, window.localStorage);
          if (user) {
            props.setUser(user);
          } else {
            errorLoginDisplay();
          }
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
