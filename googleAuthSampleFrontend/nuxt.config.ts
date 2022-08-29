import { defineNuxtConfig } from "nuxt";

const environment = process.env.NODE_ENV;
const envSet = require(`./env/.env.${environment}.js`);

export default defineNuxtConfig({
  ssr: false,
  runtimeConfig: {
    public: envSet,
  },
});
