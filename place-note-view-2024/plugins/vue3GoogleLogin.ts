import vue3GoogleLogin from "vue3-google-login";

export default defineNuxtPlugin((app) => {
  const configContentful = useRuntimeConfig();

  app.vueApp.use(vue3GoogleLogin, {
    clientId: (configContentful.public.googleClientId as string) ?? null,
  });
});
