import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  css: ['vuetify/lib/styles/main.sass'],
  build: {
      transpile: ['vuetify']
  },
  ssr: false,
  publicRuntimeConfig: {
    API_HOST: process.env.NODE_ENV === "development" ? "http://localhost:9000" : "http://example.com",
    GOOGLE_CLIENT_ID: "client_id"
  },
})
