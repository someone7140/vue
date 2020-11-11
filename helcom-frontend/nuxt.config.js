const environment = process.env.NODE_ENV || "local";
const envSet = require(`./config/env.${environment}.js`);

export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: "spa",
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  // target: "static",
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: "HELCOM",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/frontend/icon_helcom.png" }
    ]
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    { src: "~/plugins/vueFlashMessage.js", mode: "client" },
    { src: "~/plugins/localStorage.js" },
    { src: "~/plugins/veeValidate.js" },
    { src: "~/plugins/burgerMenu.js", ssr: false },
    { src: "~/plugins/vueTabs.js", mode: "client" },
    { src: "~/plugins/modal.js" },
    { src: "~/plugins/firebase.js" },
    { src: "~/plugins/infiniteloading", ssr: false }
  ],
  router: {
    base: "/frontend/",
    middleware: "masterSet"
  },
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    "@nuxtjs/axios",
    "bootstrap-vue/nuxt",
    "nuxt-fontawesome"
  ],
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    transpile: ["vee-validate/dist/rules"],
    babel: {
      babelrc: false,
      compact: false
    }
  },
  server: {
    port: 3001, // デフォルト: 3000
    host: "localhost" // デフォルト: localhost
  },
  env: envSet,
  fontawesome: {
    imports: [
      {
        set: "@fortawesome/free-solid-svg-icons",
        icons: ["fas"]
      }
    ]
  }
};
