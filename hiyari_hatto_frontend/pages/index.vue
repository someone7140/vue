<template>
  <v-app>
    <div v-if="state.loadingFlag">
      <loading v-model:active="state.loadingFlag" :can-cancel="false" />
    </div>
    <div v-if="!state.loadingFlag">
      <HeaderComponent />
      <div v-if="userState.user">
        <div v-if="menuState.menu === 'top'">
          <PostTopComponent />
        </div>
        <div v-if="menuState.menu === 'category'">
          <CategoryTopComponent />
        </div>
      </div>
      <div v-if="!userState.user">
        <LoginComponent :setUser="setUser" />
      </div>
    </div>
  </v-app>
</template>

<script>
import { defineComponent, reactive } from "vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

import CategoryTopComponent from "../components/category/CategoryTopComponent";
import HeaderComponent from "../components/common/HeaderComponent";
import LoginComponent from "../components/auth/LoginComponent";
import useAuthFunction from "../customFunction/AuthFunctionComponent";

export default defineComponent({
  components: {
    CategoryTopComponent,
    HeaderComponent,
    Loading,
    LoginComponent,
  },
  async setup() {
    const userState = useUserState();
    const menuState = useMenuState();
    const state = reactive({
      loadingFlag: true,
    });

    const { getUserFromToken } = useAuthFunction();
    if (process.client) {
      const userFromToken = await getUserFromToken(window.localStorage);
      userState.value = {
        user: userFromToken,
      };
      state.loadingFlag = false;
    }
    const setUser = (user) => {
      userState.value = {
        user: user,
      };
    };
    return { state, userState, menuState, setUser };
  },
});
</script>
