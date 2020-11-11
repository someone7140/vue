<template>
  <div>
    <div v-if="userFindFlg">
      <div v-if="ownReferFlg">
        <nuxt-link to="/profile/profile_edit" class="navbar-brand">
          <div class="btn btn-dark">マイページ設定</div> </nuxt-link
        >&nbsp;&nbsp;
        <nuxt-link to="/profile/profile_chat_setting" class="navbar-brand">
          <div class="btn btn-dark">チャット設定</div>
        </nuxt-link>
      </div>
      <ImageIconComponent
        :imgSrc="imageUrl"
        :size="iconSize"
        :otherFlg="!ownReferFlg"
      />
      <div class="p-1">
        <p class="h3">{{ userId }}</p>
      </div>
      <div class="p-1">
        <label for="intro_myself text-muted">ニックネーム</label>
        <p>{{ name }}</p>
      </div>
      <div class="p-1 text-area">
        <label for="intro_myself text-muted">自己紹介</label>
        <p>{{ introduction }}</p>
      </div>
      <div class="p-1 text-area">
        <label for="intro_myself text-muted">登録した目的</label>
        <p>{{ purpose }}</p>
      </div>
      <div>
        <button
          class="sns-button"
          v-if="twitterUrl"
          @click="handleTwitterLinkClick"
        >
          <img
            class="sns-icon"
            src="https://img.icons8.com/material-rounded/24/000000/twitter-squared.png"
          />
        </button>
        <button
          @click="handleInstagramLinkClick"
          class="sns-button"
          v-if="instagramUrl"
        >
          <img class="sns-icon" :src="'/frontend/instagram_icon.png'" />
        </button>
        <button
          @click="handleFacebookLinkClick"
          class="sns-button"
          v-if="facebookUrl"
        >
          <img class="sns-icon" :src="'/frontend/facebook_icon.png'" />
        </button>
      </div>
      <hr class="text-dark" />
      <h4 class="my-5">ご病気について</h4>
      <div class="p-1">
        <label for="intro_myself text-muted">病名</label>
        <p>{{ sicknessName }}</p>
      </div>
      <div class="p-1" v-if="talkSicknessName">
        <label for="intro_myself text-muted">相談したい病名</label>
        <p>{{ talkSicknessName }}</p>
      </div>
      <div v-if="userInfo.role == 'admin'">
        <button class="btn btn-dark" @click="userSuspend">ユーザ凍結</button>
        <modal
          name="user-suspend-modal-content"
          class="user-suspend-confirm"
          :width="'300px'"
          :height="'150px'"
        >
          <p>ユーザ凍結します。問題なければ「凍結」ボタンを押してください。</p>
          <button class="btn btn-dark" @click="userSuspendConfirm">凍結</button
          >&nbsp;&nbsp;&nbsp;
          <button class="btn btn-dark" @click="userSuspendCancel">
            キャンセル
          </button>
        </modal>
      </div>
    </div>
    <div v-if="userGetErrorFlg">
      <div class="p-1">
        ユーザ情報が取得できなかったもしくは凍結されている可能性があります。
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import apiMixin from "~/mixins/apiMixin.js";
import ImageIconComponent from "~/components/common/ImageIconComponent.vue";

export default {
  mixins: [apiMixin],
  props: ["ownReferFlg", "userId"],
  components: {
    ImageIconComponent,
  },
  computed: {
    ...mapState("masterStore", ["master"]),
    ...mapState("userStore", ["userInfo"]),
  },
  data() {
    return {
      userFindFlg: false,
      userGetErrorFlg: false,
      name: undefined,
      email: undefined,
      introduction: undefined,
      purpose: undefined,
      imageUrl: undefined,
      twitterUrl: undefined,
      instagramUrl: undefined,
      facebookUrl: undefined,
      sicknessName: undefined,
      talkSicknessName: undefined,
      iconSize: 100,
    };
  },
  async created() {
    const response = await this.getReponseApi(
      this.$axios,
      "user_profile/profile_refer/" + this.userId
    );
    if (response.status == 200) {
      this.userFindFlg = true;
      const profileFromApi = response.user_profile;
      this.email = profileFromApi.email;
      this.name = profileFromApi.name;
      this.imageUrl = profileFromApi.image_url;
      this.introduction = profileFromApi.introduction;
      this.purpose = profileFromApi.purpose;
      this.twitterUrl = profileFromApi.twitter_url;
      this.instagramUrl = profileFromApi.instagram_url;
      this.facebookUrl = profileFromApi.facebook_url;
      const sicknessObj = this.master.profile_disease_list.find((p) => {
        return p.key == profileFromApi.sickness;
      });
      if (sicknessObj) {
        this.sicknessName = sicknessObj.value;
      }
      const talkSicknessObj = this.master.profile_disease_list.find((p) => {
        return p.key == profileFromApi.talking_sickness;
      });
      if (talkSicknessObj) {
        this.talkSicknessName = talkSicknessObj.value;
      }
      this.userGetErrorFlg = false;
    } else {
      this.userFindFlg = false;
      this.userGetErrorFlg = true;
    }
    // ユーザ凍結用のモーダルを非表示
    this.$modal.hide("user-suspend-modal-content");
  },
  methods: {
    ...mapActions("flashMessageStore", ["updateFlashMessageDisp"]),
    handleTwitterLinkClick() {
      // SNSを踏んだカウント
      this.postApi(this.$axios, "user_profile/sns_user_count", {
        sns_user_count: {
          user_id: this.userId,
          sns_type: "twitter",
        },
      });
      // 別タブでSNSを開く
      window.open(this.twitterUrl, "_blank");
    },
    handleInstagramLinkClick() {
      // SNSを踏んだカウント
      this.postApi(this.$axios, "user_profile/sns_user_count", {
        sns_user_count: {
          user_id: this.userId,
          sns_type: "instagram",
        },
      });
      // 別タブでSNSを開く
      window.open(this.instagramUrl, "_blank");
    },
    handleFacebookLinkClick() {
      // SNSを踏んだカウント
      this.postApi(this.$axios, "user_profile/sns_user_count", {
        sns_user_count: {
          user_id: this.userId,
          sns_type: "facebook",
        },
      });
      // 別タブでSNSを開く
      window.open(this.facebookUrl, "_blank");
    },
    userSuspend() {
      // 凍結用のモーダルを表示
      this.$modal.show("user-suspend-modal-content");
    },
    async userSuspendConfirm() {
      const response = await this.postApi(this.$axios, "auth/user_suspend", {
        user_suspend: {
          user_id: this.userId,
        },
      });
      // 凍結用のモーダルを非表示
      this.$modal.hide("user-suspend-modal-content");
      if (response.status == 200) {
        this.updateFlashMessageDisp({
          flashMessageDisp: {
            title: "完了",
            message: "ユーザを凍結しました。",
            result: "success",
            watchFlg: false,
          },
        });
        this.$router.push({ path: "/top" });
      } else {
        this.updateFlashMessageDisp({
          flashMessageDisp: {
            title: "エラー",
            message: "処理中にエラーが発生しました。再度お試しください",
            result: "error",
            watchFlg: true,
          },
        });
      }
    },
    userSuspendCancel() {
      // 凍結用のモーダルを非表示
      this.$modal.hide("user-suspend-modal-content");
    },
  },
};
</script>

<style>
.text-area {
  white-space: pre-wrap;
}
.sns-button {
  padding: 0;
  border: none;
  background: transparent;
  margin: 0px 15px 0px 15px;
}
.sns-icon {
  width: 25px;
  height: 25px;
  display: block;
}
.user-suspend-confirm {
  text-align: center;
}
</style>
