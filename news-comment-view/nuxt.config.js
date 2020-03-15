import path from "path";
import fs from "fs";

const environment = process.env.NODE_ENV || "local";
const envSet = require(`./env.${environment}.js`);

export default {
  mode: "spa",
  /*
   ** Headers of the page
   */
  head: {
    title: "ニュースコメント",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: "~/plugins/localStorage.js", ssr: false },
    { src: "~/plugins/infiniteloading", ssr: false },
    { src: "~/plugins/vueFlashMessage.js", mode: "client" },
    { src: "~plugins/burgerMenu.js", ssr: false }
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    "bootstrap-vue/nuxt",
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "nuxt-vue-multiselect"
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
  },
  server: {
    port: 3001, // デフォルト: 3000
    host: "localhost", // デフォルト: localhost
    https: {
      key: fs.readFileSync(
        path.resolve("server/localhost", "localhost-key.pem")
      ),
      cert: fs.readFileSync(path.resolve("server/localhost", "localhost.pem"))
    }
  },
  env: envSet
};
