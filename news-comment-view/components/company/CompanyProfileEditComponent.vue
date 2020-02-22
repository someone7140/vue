<template>
  <div>
    <div>
      【企業名】
      <br />
      <input type="text" v-model="companyName" placeholder="企業名" name="companyName" />
    </div>
    <div>
      【アイコン画像】
      <br />
      <table>
        <tr>
          <td>
            <span v-if="img_src">
              <img width="50" height="50" :src="img_src" />
            </span>
            <span v-else-if="this.userInfo.image_url">
              <img width="50" height="50" :src="userInfo.image_url" />
            </span>
            <span v-else>
              <img width="50" height="50" src="~assets/default_icon.png" />
            </span>
          </td>
          <td>
            <input type="file" name="image_file" @change="onImageUpload()" />
          </td>
        </tr>
      </table>
      <br />
    </div>
    <div>
      【メールアドレス】
      <br />
      <input type="email" v-model="email" placeholder="メールアドレス" name="email" />
    </div>
    <div>
      【業種】
      <br />
      <input type="text" v-model="category" placeholder="カテゴリー" name="category" />
    </div>
    <div v-if="prefectureList.length > 0" style="width:250px;">
      【都道府県】
      <multiselect
        v-model="selectedPrefecture"
        deselect-label="Can't remove this value"
        track-by="key"
        label="value"
        placeholder="都道府県を選択"
        :options="prefectureList"
        :searchable="false"
        :allow-empty="false"
      >
        <template slot="singleLabel" slot-scope="{ option }">{{ option.value }}</template>
      </multiselect>
    </div>
    <div>
      【ホームページURL】
      <br />
      <input type="text" v-model="url" placeholder="ホームページURL" name="url" />
    </div>
    <div>
      【パスワード】
      <br />
      <input type="password" v-model="password" placeholder="6文字以上で入力" name="password" />
      <br />
      <input
        type="password"
        v-model="passwordReInput"
        placeholder="パスワードを再入力"
        name="passwordReInput"
      />
    </div>
    <div>
      【詳細】
      <br />
      <textarea cols="35" rows="3" v-model="detail" name="detail" />
    </div>
    <button type="button" @click="profileRegist">登録する</button>
    <div v-for="message of messageList" v-bind:key="message.index">
      {{ message }}
      <br />
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import api_mixin from "~/mixins/api_mixin.js";
import input_mixin from "~/mixins/input_mixin.js";

export default {
  mixins: [api_mixin, input_mixin],
  props: ["company"],
  data() {
    return {
      companyName: "",
      email: "",
      category: "",
      image_file: undefined,
      img_src: undefined,
      selectedPrefecture: undefined,
      prefectureList: [],
      url: "",
      password: undefined,
      passwordReInput: undefined,
      detail: undefined,
      messageList: []
    };
  },
  computed: {
    ...mapState("userStore", ["userInfo", "isSignedIn"]),
    ...mapState("masterStore", ["masterList"])
  },
  methods: {
    ...mapActions("flashMessageStore", ["updateFlashMessageDisp"]),
    ...mapActions("userStore", ["updateLoginState", "updateUserInfo"]),
    initialDataSet() {
      if (this.userInfo != undefined && this.masterList != undefined) {
        // 編集の時
        if (this.company != undefined) {
          this.companyName = this.company.company_name;
          this.email = this.company.email;
          this.category = this.company.category;
          this.prefectureList = this.masterList.prefecture;
          this.selectedPrefecture = this.masterList.prefecture.find(s => {
            return s.key == this.company.prefecture_code;
          });
          this.url = this.company.url;
          this.detail = this.company.detail;
        } else {
          this.companyName = this.userInfo.company_name;
          this.email = this.userInfo.email;
          this.prefectureList = this.masterList.prefecture;
        }
      }
    },
    onImageUpload() {
      if (event.target.files.length > 0) {
        this.image_file = event.target.files[0];
        // FileReaderオブジェクトを使ってファイル読み込み
        var reader = new FileReader();
        // ファイル読み込みに成功したときの処理
        reader.onload = function() {
          this.img_src = reader.result;
        }.bind(this);
        // ファイル読み込みを実行
        reader.readAsDataURL(this.image_file);
      } else {
        this.image_file = undefined;
      }
    },
    async profileRegist() {
      this.messageList = [];
      // 入力チェック
      if (!this.companyName) {
        this.messageList.push("企業名を入力してください");
      }
      if (!this.category) {
        this.messageList.push("業種を入力してください");
      }
      if (!this.emailCheck(this.email)) {
        this.messageList.push("メールアドレスを正しく入力してください");
      }
      if (!this.selectedPrefecture) {
        this.messageList.push("都道府県を選択してください");
      }
      if (this.company != undefined) {
        if (this.password) {
          if (this.password.length < 6) {
            this.messageList.push("パスワードを6文字以上で入力してください");
          }
          if (this.password != this.passwordReInput) {
            this.messageList.push("再入力されたパスワードが異なります");
          }
        }
      } else {
        if (!this.password || this.password.length < 6) {
          this.messageList.push("パスワードを6文字以上で入力してください");
        }
        if (this.password != this.passwordReInput) {
          this.messageList.push("再入力されたパスワードが異なります");
        }
      }
      // エラーがない場合
      if (this.messageList.length == 0) {
        var postData = undefined;
        if (!this.image_file) {
          postData = {
            company: {
              user_id: this.userInfo.user_id,
              password: this.password,
              image_url: this.userInfo.image_url,
              email: this.email,
              company_name: this.companyName,
              category: this.category,
              prefecture_code: this.selectedPrefecture.key,
              url: this.url,
              detail: this.detail
            }
          };
        } else {
          postData = new FormData();
          postData.append("company[user_id]", this.userInfo.user_id);
          postData.append("company[password]", this.password);
          postData.append("company[image_url]", this.userInfo.image_url);
          postData.append("company[image_file]", this.image_file);
          postData.append("company[email]", this.email);
          postData.append("company[company_name]", this.companyName);
          postData.append("company[category]", this.category);
          postData.append(
            "company[prefecture_code]",
            this.selectedPrefecture.key
          );
          postData.append("company[url]", this.url);
          postData.append("company[detail]", this.detail);
        }
        var response = undefined;
        let headers = this.image_file ? "multipart/form-data" : undefined;
        // 編集の時
        if (this.company != undefined) {
          response = await this.postApi(
            this.$axios,
            "editCompanyProfile",
            postData,
            headers
          );
        } else {
          response = await this.postApi(
            this.$axios,
            "registCompanyProfile",
            postData,
            headers
          );
        }
        if (response.status == 200) {
          // storeのユーザ情報の更新
          this.updateUserInfo({ userInfo: response.data });
          this.updateLoginState({ isSignedIn: true });
          // 編集の時
          if (this.company != undefined) {
            this.updateFlashMessageDisp({
              flashMessageDisp: {
                title: "登録完了",
                message: "プロフィールを登録しました",
                position: "right bottom",
                result: "success",
                watchFlg: true
              }
            });
          } else {
            this.updateFlashMessageDisp({
              flashMessageDisp: {
                title: "登録完了",
                message: "プロフィールを登録しました",
                position: "right bottom",
                result: "success",
                watchFlg: false
              }
            });
            this.$router.push({ path: "/" });
          }
        } else {
          this.messageList.push(
            "登録に失敗しました。メールアドレスがすでに登録済みでないか確認してください"
          );
        }
      }
    }
  },
  created() {
    this.initialDataSet();
  }
};
</script>
