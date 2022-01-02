<template>
  <v-app>
    <div v-if="state.loadingFlag">
      <loading v-model:active="state.loadingFlag" :can-cancel="false" />
    </div>
    <div v-if="!state.loadingFlag">
      <HeaderComponent />
      <CategoryTopComponent />
    </div>
  </v-app>
</template>

<script>
import { defineComponent, reactive } from "vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

import CategoryTopComponent from "../components/category/CategoryTopComponent";
import HeaderComponent from "../components/common/HeaderComponent";
import useAuthFunction from "../customFunction/AuthFunctionComponent";

export default defineComponent({
  components: {
    CategoryTopComponent,
    HeaderComponent,
    Loading,
  },
  async setup() {
    const userState = useUserState();
    const state = reactive({
      loadingFlag: true,
    });

    const { getUserFromToken } = useAuthFunction();
    if (process.client) {
      if (!userState.value.user) {
        const userFromToken = await getUserFromToken(window.localStorage);
        if (userFromToken) {
          userState.value = {
            user: userFromToken,
          };
          state.loadingFlag = false;
        } else {
          window.location.href = "/";
        }
      } else {
        state.loadingFlag = false;
      }
    }
    return { state };
  },
});
</script>
