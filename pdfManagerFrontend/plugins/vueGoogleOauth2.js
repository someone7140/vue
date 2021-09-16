import Vue from "vue";
import GAuth from "vue-google-oauth2";

const gauthOption = {
  // eslint-disable-next-line no-undef
  clientId: process.env.GOOGLE_CLIENT_ID,
  scope:
    "email profile openid https://www.googleapis.com/auth/drive.apps.readonly",
  prompt: "consent",
};
Vue.use(GAuth, gauthOption);
