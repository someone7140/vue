import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Placeノート",
    },
  },
  devtools: { enabled: process.env.ENABLE_DEVTOOL === "true" },
  build: {
    transpile: ["vuetify"],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    "@nuxtjs/apollo",
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  runtimeConfig: {
    public: {
      googleClientId: process.env.GOOGLE_CLIENT_ID,
      apiEndpoint: process.env.API_ENDPOINT,
    },
  },
  components: [
    {
      path: "~/components/",
      pathPrefix: false,
    },
  ],
  imports: {
    dirs: ["composables/**"],
  },
  apollo: {
    clients: {
      default: {
        authType: "Bearer",
        authHeader: "Authorization",
        tokenStorage: "localStorage",
        httpEndpoint: process.env.API_ENDPOINT ?? "",
        wsEndpoint: process.env.API_ENDPOINT ?? "",
      },
    },
  },
  compatibilityDate: "2024-07-03",
});
