<template>
  <div>
    <header>
      <nav
        class="navbar-dark fixed-top back-orange navbar-height header-height"
      >
        <span v-if="isSignedIn">
          <table>
            <tr>
              <td>
                <nuxt-link to="/top" class="navbar-brand color-black"
                  >&nbsp;&nbsp;<span class="color-black"
                    >HELCOM</span
                  ></nuxt-link
                >
              </td>
              <td>
                <ImageIconComponent
                  :imgSrc="userInfo.image_url"
                  :size="iconSize"
                />&nbsp;&nbsp;
                <span v-if="userInfo.name">{{ userInfo.name }}</span>
              </td>
              <td>
                <span v-if="displayChatActiveIcon">
                  &nbsp;
                  <ChatActiveIconComponent />
                </span>
                <span v-if="displayChatReserveIcon">
                  &nbsp;
                  <ChatReserveIconComponent />
                </span>
                <span v-if="displayChatWaitingIcon">
                  &nbsp;
                  <ChatWaitingIconComponent />
                </span>
              </td>
              <td>
                <slide right>
                  <div class="nav-item">
                    <nuxt-link
                      class="nav-link text-white"
                      tabindex="-1"
                      aria-disabled="true"
                      to="/profile/profile_mypage"
                      >マイページ</nuxt-link
                    >
                  </div>
                  <div class="nav-item">
                    <a
                      class="nav-link text-white"
                      href="javascript:void(0)"
                      tabindex="-1"
                      aria-disabled="true"
                      @click="logout"
                      >ログアウト</a
                    >
                  </div>
                  <div v-if="userInfo.role == 'admin'">
                    <nuxt-link
                      class="nav-link text-white"
                      tabindex="-1"
                      aria-disabled="true"
                      to="/whistle/whistle_list"
                      >通報の参照</nuxt-link
                    >
                  </div>
                </slide>
              </td>
            </tr>
          </table>
        </span>
        <span v-else>
          <nuxt-link to="/auth/login" class="navbar-brand"
            >&nbsp;&nbsp;<span class="color-black">HELCOM</span></nuxt-link
          >
        </span>
        <FlashMessageDisplayComponent />
      </nav>
    </header>
  </div>
</template>

<script>
import apiMixin from "~/mixins/apiMixin.js";
import { mapActions, mapState } from "vuex";
import ChatActiveIconComponent from "~/components/chat/icon/ChatActiveIconComponent.vue";
import ChatReserveIconComponent from "~/components/chat/icon/ChatReserveIconComponent.vue";
import ChatWaitingIconComponent from "~/components/chat/icon/ChatWaitingIconComponent.vue";
import FlashMessageDisplayComponent from "~/components/common/FlashMessageDisplayComponent.vue";
import ImageIconComponent from "~/components/common/ImageIconComponent.vue";

export default {
  mixins: [apiMixin],
  components: {
    ChatActiveIconComponent,
    ChatReserveIconComponent,
    ChatWaitingIconComponent,
    FlashMessageDisplayComponent,
    ImageIconComponent,
  },
  computed: {
    ...mapState("userStore", ["isSignedIn", "userInfo"]),
    ...mapState("persnalChatStore", ["roomInfo"]),
    displayChatWaitingIcon() {
      return this.isSignedIn && this.roomInfo && this.roomInfo.status == "wait";
    },
    displayChatReserveIcon() {
      return (
        this.isSignedIn && this.roomInfo && this.roomInfo.status == "reserve"
      );
    },
    displayChatActiveIcon() {
      return (
        this.isSignedIn && this.roomInfo && this.roomInfo.status == "active"
      );
    },
  },
  data() {
    return {
      iconSize: 40,
    };
  },
  methods: {
    ...mapActions("flashMessageStore", ["updateFlashMessageDisp"]),
    ...mapActions("userStore", ["updateUserInfo", "updateLoginState"]),
    async logout() {
      if (this.roomInfo) {
        this.updateFlashMessageDisp({
          flashMessageDisp: {
            title: "エラー",
            message: "一対一チャットを退出してからログアウトしてください。",
            position: "right bottom",
            result: "error",
            watchFlg: true,
          },
        });
      } else {
        await this.postApi(this.$axios, "auth/logout");
        this.updateUserInfo(undefined);
        this.updateLoginState({ isSignedIn: false });
        this.updateFlashMessageDisp({
          flashMessageDisp: {
            title: "ログアウト完了",
            message: "ログアウトしました",
            position: "right bottom",
            result: "success",
            watchFlg: false,
          },
        });
        // ログイン画面へ移動
        this.$router.push({ path: "/auth/login" });
      }
    },
  },
};
</script>
<style>
.bm-burger-button {
  width: 25px;
  height: 20px;
  top: 10px;
  cursor: pointer;
}
.bm-burger-bars {
  background-color: black;
}
.bm-overlay {
  background: rgba(0, 0, 0, 0);
}
.back-orange {
  background: #ffdead;
}
.header-height {
  height: 55px;
}
.color-black {
  color: black;
}
</style>
