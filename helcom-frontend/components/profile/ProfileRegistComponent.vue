<template>
  <div>
    <section class="text-left">
      <validation-observer v-slot="{ invalid }">
        <div class="p-1" v-if="editFlg">
          <label for="email text-muted">email</label>
          <p>
            {{ email }}
            &nbsp;&nbsp;
            <nuxt-link to="/auth/mail/mail_change">
              <button class="btn btn-dark send-btn">email変更</button>
            </nuxt-link>
          </p>
        </div>
        <div class="form-group">
          <label for="name">ニックネーム</label>
          <validation-provider v-slot="{ errors }" rules="required" name="name">
            <input type="text" class="form-control" v-model="name" />
            <ErrorMessageComponent :errors="errors" />
          </validation-provider>
        </div>
        <div class="form-group">
          <label for="introduction">自己紹介</label>
          <textarea class="form-control" rows="3" v-model="introduction" />
        </div>
        <div class="form-group">
          <label for="purpose">登録した目的</label>
          <textarea class="form-control" rows="3" v-model="purpose" />
        </div>
        <div class="form-group">
          <label for="purpose">アイコン画像のアップロード</label>
          <table>
            <tr>
              <td>
                <ImageIconComponent :imgSrc="imgSrc" :size="iconSize" />
              </td>
              <td>
                <input type="file" name="imageFile" @change="onImageUpload" />
              </td>
            </tr>
          </table>
        </div>
        <div class="form-group">
          <label for="registered_purpose">
            Twitterのユーザ名（ユーザ名については
            <a
              href="https://help.twitter.com/ja/managing-your-account"
              target="_blank"
              >こちら</a
            >を参照してください）
          </label>
          <input type="text" class="form-control" v-model="twitterId" />
        </div>
        <div class="form-group">
          <label for="registered_purpose">
            Instagramのユーザネーム（ユーザネームについては
            <a href="https://help.instagram.com/182492381886913" target="_blank"
              >こちら</a
            >を参照してください）
          </label>
          <input type="text" class="form-control" v-model="instagramId" />
        </div>
        <div class="form-group">
          <label for="registered_purpose">
            FacebookのユーザID（ユーザIDについては
            <a
              href="https://www.facebook.com/help/211813265517027"
              target="_blank"
              >こちら</a
            >を参照してください）
          </label>
          <input type="text" class="form-control" v-model="facebookId" />
        </div>
        <hr />
        <h4 class="mt-3">ご病気について</h4>
        <div class="form-group">
          <validation-provider
            v-slot="{ errors }"
            rules="required"
            name="selectedSickness"
          >
            <select v-model="selectedSickness" class="form-control">
              <optgroup
                v-for="g in diseaseList.optGroup"
                :label="g.label"
                :key="g.key"
              >
                <option
                  v-for="option in g.childs"
                  :value="option.value"
                  :key="option.value"
                >
                  {{ option.label }}
                </option>
              </optgroup>
              <option
                v-for="option in diseaseList.opt"
                :value="option.value"
                :key="option.value"
              >
                {{ option.label }}
              </option>
            </select>
            <ErrorMessageComponent :errors="errors" />
          </validation-provider>
        </div>
        <div v-if="selectedSickness == 'none'">
          <h4 class="mt-3">相談したいご病気</h4>
          <p class="text-muted">
            身内にご病気がある方はこちらに入力してください
          </p>
          <div class="form-group">
            <validation-provider
              v-slot="{ errors }"
              rules="required"
              name="selectedTalkSickness"
            >
              <select v-model="selectedTalkSickness" class="form-control">
                <optgroup
                  v-for="g in diseaseList.optGroup"
                  :label="g.label"
                  :key="g.key"
                >
                  <option
                    v-for="option in g.childs"
                    :value="option.value"
                    :key="option.value"
                  >
                    {{ option.label }}
                  </option>
                </optgroup>
                <option
                  v-for="option in diseaseList.opt"
                  :value="option.value"
                  :key="option.value"
                >
                  {{ option.label }}
                </option>
              </select>
              <ErrorMessageComponent :errors="errors" />
            </validation-provider>
          </div>
        </div>
        <div class="form-group text-right">
          <button
            class="btn btn-dark text-light"
            :disabled="invalid"
            @click="profileRegist"
          >
            更新
          </button>
        </div>
        <br />
        <br />
        <nuxt-link to="/auth/user_cancel">退会を行う方はこちらから</nuxt-link>
      </validation-observer>
    </section>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import apiMixin from "~/mixins/apiMixin.js";
import commonMixin from "~/mixins/commonMixin.js";
import ErrorMessageComponent from "~/components/common/ErrorMessageComponent.vue";
import ImageIconComponent from "~/components/common/ImageIconComponent.vue";

export default {
  mixins: [apiMixin, commonMixin],
  props: ["editFlg"],
  components: {
    ErrorMessageComponent,
    ImageIconComponent,
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),
    ...mapState("masterStore", ["master"]),
  },
  data() {
    return {
      email: undefined,
      name: undefined,
      introduction: undefined,
      purpose: undefined,
      imageFile: undefined,
      imgSrc: undefined,
      twitterId: undefined,
      instagramId: undefined,
      facebookId: undefined,
      selectedSickness: undefined,
      selectedTalkSickness: undefined,
      diseaseList: [],
      iconSize: 70,
      twitterDomain: "https://twitter.com/",
      instagramDomain: "https://www.instagram.com/",
      facebookDomain: "https://www.facebook.com/profile.php?id=",
    };
  },
  async created() {
    if (this.editFlg) {
      // 編集の時はプロフィール情報を取得する。
      const response = await this.getReponseApi(
        this.$axios,
        "user_profile/profile_refer/" + this.userInfo.user_id
      );
      if (response.status == 200) {
        const profileFromApi = response.user_profile;
        if (profileFromApi.email) {
          this.email = profileFromApi.email;
        }
        if (profileFromApi.name) {
          this.name = profileFromApi.name;
        }
        if (profileFromApi.introduction) {
          this.introduction = profileFromApi.introduction;
        }
        if (profileFromApi.purpose) {
          this.purpose = profileFromApi.purpose;
        }
        if (profileFromApi.sickness) {
          this.selectedSickness = profileFromApi.sickness;
        }
        if (profileFromApi.talking_sickness) {
          this.selectedTalkSickness = profileFromApi.talking_sickness;
        }
        if (profileFromApi.twitter_url) {
          this.twitterId = profileFromApi.twitter_url.replace(
            this.twitterDomain,
            ""
          );
        }
        if (profileFromApi.instagram_url) {
          this.instagramId = profileFromApi.instagram_url.replace(
            this.instagramDomain,
            ""
          );
        }
        if (profileFromApi.facebook_url) {
          this.facebookId = profileFromApi.facebook_url.replace(
            this.facebookDomain,
            ""
          );
        }
      }
    } else if (!this.userInfo || !this.userInfo.afterAuthFlg) {
      // それ以外で認証直後でない場合はtop画面へ遷移させる
      this.$router.push({ path: "/top" });
    }
  },
  async mounted() {
    if (!this.master) {
      const response = await this.getReponseApi(this.$axios, "common/master");
      if (response.status == 200) {
        this.updateMasterStateFromApi(response);
      }
    }
    // storeのmaster情報をコンボボックス用にセット
    this.diseaseList = this.getNestCategoryList(
      this.master.profile_disease_group_list,
      this.master.profile_disease_list
    );
  },
  methods: {
    ...mapActions("flashMessageStore", ["updateFlashMessageDisp"]),
    ...mapActions("masterStore", ["updateMasterStateFromApi"]),
    ...mapActions("userStore", ["updateUserInfo", "updateLoginState"]),
    async profileRegist() {
      var postData = undefined;
      var response = undefined;
      const postTalkingSickness =
        this.selectedSickness == "none" ? this.selectedTalkSickness : undefined;
      const postTwitterUrl = this.twitterId
        ? this.twitterDomain + this.twitterId
        : undefined;
      const postInstagramUrl = this.instagramId
        ? this.instagramDomain + this.instagramId
        : undefined;
      const postFacebookUrl = this.facebookId
        ? this.facebookDomain + this.facebookId
        : undefined;
      if (!this.imageFile) {
        postData = {
          profile_regist: {
            name: this.name,
            sickness: this.selectedSickness,
            talking_sickness: postTalkingSickness,
            introduction: this.introduction,
            purpose: this.purpose,
            twitter_url: postTwitterUrl,
            instagram_url: postInstagramUrl,
            facebook_url: postFacebookUrl,
          },
        };
        response = await this.postApi(
          this.$axios,
          "user_profile/profile_regist",
          postData
        );
      } else {
        postData = new FormData();
        postData.append("profile_regist[name]", this.name);
        postData.append("profile_regist[sickness]", this.selectedSickness);
        if (postTalkingSickness) {
          postData.append(
            "profile_regist[talking_sickness]",
            postTalkingSickness
          );
        }
        if (this.introduction) {
          postData.append("profile_regist[introduction]", this.introduction);
        }
        if (this.purpose) {
          postData.append("profile_regist[purpose]", this.purpose);
        }
        if (postTwitterUrl) {
          postData.append("profile_regist[twitter_url]", postTwitterUrl);
        }
        if (postInstagramUrl) {
          postData.append("profile_regist[instagram_url]", postInstagramUrl);
        }
        if (postFacebookUrl) {
          postData.append("profile_regist[facebook_url]", postFacebookUrl);
        }
        postData.append("profile_regist[image_file]", this.imageFile);
        response = await this.postApi(
          this.$axios,
          "user_profile/profile_regist",
          postData,
          "multipart/form-data"
        );
      }
      if (response.status == 200) {
        // stateのユーザ情報を更新
        this.updateUserInfo({
          userInfo: response.user,
        });
        this.updateFlashMessageDisp({
          flashMessageDisp: {
            title: "プロフィール更新完了",
            message: "プロフィールを更新しました。",
            result: "success",
            watchFlg: false,
          },
        });
        // 編集画面から来た場合はマイページ、それ以外はtop画面へ遷移
        if (this.editFlg) {
          this.$router.push({ path: "/profile/profile_mypage" });
        } else {
          this.$router.push({ path: "/top" });
        }
      } else {
        this.updateFlashMessageDisp({
          flashMessageDisp: {
            title: "エラー",
            message:
              "登録処理中にエラーが発生しました。再度登録してエラーが発生する場合はお問い合わせください。",
            result: "error",
            watchFlg: true,
          },
        });
      }
    },
    onImageUpload() {
      if (event.target.files.length > 0) {
        this.imageFile = event.target.files[0];
        // FileReaderオブジェクトを使ってファイル読み込み
        var reader = new FileReader();
        // ファイル読み込みに成功したときの処理
        reader.onload = function () {
          this.imgSrc = reader.result;
        }.bind(this);
        // ファイル読み込みを実行
        reader.readAsDataURL(this.imageFile);
      } else {
        this.imageFile = undefined;
      }
    },
  },
};
</script>
