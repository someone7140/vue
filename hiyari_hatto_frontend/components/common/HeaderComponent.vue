<template>
  <header>
    <v-app-bar
      absolute
      color="blue-lighten-5"
      elevate-on-scroll
      scroll-target="#scrolling-techniques-7"
    >
      <v-spacer />
      <v-row style="min-width: 300px; max-width: 800px">
        <template v-if="userState.user">
          <span>{{ userState.user.name }}さんで<br />ログイン中</span>
          <v-spacer />
        </template>
        <v-toolbar-title><b>ヒヤリハット管理</b></v-toolbar-title>
        <template v-if="userState.user && state.showMenu">
          <v-spacer />
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn icon v-bind="props" color="blue-lighten-5">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list
              style="position: absolute; left: -100px; z-index: 999"
              color="white"
            >
              <v-list-item>
                <v-list-item-title>
                  <div @click="transferTop" role="button">トップ</div>
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  <div @click="transferCategory" role="button">
                    カテゴリー管理
                  </div></v-list-item-title
                >
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  <div @click="logout" role="button">
                    ログアウト
                  </div></v-list-item-title
                >
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
        <template v-if="userState.user && !state.showMenu">
          <v-spacer />
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn icon v-bind="props" color="blue-lighten-5">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
          </v-menu>
        </template>
      </v-row>
      <v-spacer />
    </v-app-bar>
  </header>
  <br />
  <br />
  <br />
</template>

<script>
import { defineComponent } from "vue";
import useAuthFunction from "../../customFunction/AuthFunctionComponent";

export default defineComponent({
  async setup() {
    const app = getCurrentInstance();
    const rootContext = app.appContext.config.globalProperties;

    const userState = useUserState();

    const state = reactive({
      showMenu: true,
    });

    const logout = async () => {
      const { deleteToken } = useAuthFunction();
      await deleteToken(window.localStorage);
      userState.value = {
        user: undefined,
      };
      rootContext.$toast.success("ログアウトしました");
      rootContext.$router.push("/");
    };

    const transferTop = async () => {
      rootContext.$router.push("/");
    };

    const transferCategory = async () => {
      rootContext.$router.push("/category");
    };

    return { userState, state, logout, transferTop, transferCategory };
  },
});
</script>
