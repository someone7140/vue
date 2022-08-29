import { defineNuxtPlugin } from "#app";
import GAuth from "vue3-google-oauth2";

export default defineNuxtPlugin((nuxtApp) => {
  const $config = useRuntimeConfig();
  const gauthOption = {
    clientId: $config.GOOGLE_CLIENT_ID,
    scope: "email profile openid https://www.googleapis.com/auth/calendar",
    prompt: "consent",
  };
  nuxtApp.vueApp.use(GAuth, gauthOption);
});
