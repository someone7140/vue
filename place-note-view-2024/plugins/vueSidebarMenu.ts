import VueSidebarMenu from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";

export default defineNuxtPlugin((app) => {
  app.vueApp.use(VueSidebarMenu);
});
