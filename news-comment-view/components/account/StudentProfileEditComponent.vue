<template>
  <div>
    <div>
      【氏名】
      <br />
      <input type="text" v-model="lastName" placeholder="姓" name="lastName" />
      <br />
      <input type="text" v-model="firstName" placeholder="名" name="firstName" />
    </div>
    <div v-if="genderList.length > 0" style="width:250px;">
      【性別】
      <multiselect
        v-model="selectedGender"
        deselect-label="Can't remove this value"
        track-by="key"
        label="value"
        placeholder="性別を選択"
        :options="genderList"
        :searchable="false"
        :allow-empty="false"
      >
        <template slot="singleLabel" slot-scope="{ option }">{{ option.value }}</template>
      </multiselect>
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
    <div v-if="student != undefined || userInfo.auth_category != 'email'">
      【メールアドレス】
      <br />
      <input type="email" v-model="email" placeholder="メールアドレス" name="email" />
    </div>
    <div>
      【学年】
      <br />
      <div v-if="schoolCategoryList.length > 0" style="width:250px;">
        <multiselect
          v-model="selectedSchoolCategory"
          deselect-label="Can't remove this value"
          track-by="key"
          label="value"
          placeholder="学校の区分を選択"
          :options="schoolCategoryList"
          :searchable="false"
          :allow-empty="false"
        >
          <template slot="singleLabel" slot-scope="{ option }">{{ option.value }}</template>
        </multiselect>
      </div>
      <br />
      <input type="number" v-model="year" placeholder="年次" name="year" />
      <br />
      <br />【学部・専門】
      <br />
      <input type="text" v-model="department" placeholder="学部や専門" name="department" />
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
    <div v-if="student != undefined || userInfo.auth_category != 'email'">
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
      【自己紹介】
      <br />
      <textarea cols="35" rows="3" v-model="introduction" name="introduction" />
    </div>
    <div>
      【資格】
      <br />
      <div style="width:250px;">
        <multiselect
          v-model="certificationTags"
          :options="certificationTagOptions"
          :multiple="true"
          :taggable="true"
          label="name"
          track-by="code"
          @tag="addCertificationTag"
          tag-placeholder="Add this as new tag"
          placeholder="資格を入力してください"
        ></multiselect>
      </div>
    </div>
    <div>
      【興味のある業種・職種】
      <br />
      <div id="interestSelect" style="width:250px;">
        <multiselect
          v-model="interestTags"
          :options="interestTagOptions"
          :multiple="true"
          :taggable="true"
          label="name"
          track-by="code"
          @tag="addInterestTag"
          tag-placeholder="Add this as new tag"
          placeholder="興味のある業種・職種"
        ></multiselect>
      </div>
    </div>
    <br />
    <button type="button" @click="profileRegist">登録する</button>
    <div v-for="message of messageList" v-bind:key="message.index">
      {{ message }}
      <br />
    </div>
  </div>
</template>
<style>
#interestSelect .multiselect__tag {
  background-color: #0080ff;
}
#interestSelect .multiselect__tag-icon:hover {
  background-color: #0101df;
}
</style>
<script>
import { mapActions, mapState } from "vuex";
import api_mixin from "~/mixins/api_mixin.js";
import input_mixin from "~/mixins/input_mixin.js";

export default {
  mixins: [api_mixin, input_mixin],
  props: ["student"],
  data() {
    return {
      lastName: "",
      firstName: "",
      selectedGender: undefined,
      genderList: [],
      image_file: undefined,
      img_src: undefined,
      email: "",
      selectedSchoolCategory: undefined,
      schoolCategoryList: [],
      year: undefined,
      department: "",
      selectedPrefecture: undefined,
      prefectureList: [],
      password: undefined,
      passwordReInput: undefined,
      introduction: undefined,
      certificationTags: [],
      certificationTagOptions: [],
      interestTags: [],
      interestTagOptions: [],
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
        if (this.student != undefined) {
          this.lastName = this.student.last_name;
          this.firstName = this.student.first_name;
          this.genderList = this.masterList.gender;
          this.selectedGender = this.masterList.gender.find(g => {
            return g.key == this.student.gender;
          });
          this.email = this.student.email;
          this.schoolCategoryList = this.masterList.school_categoty;
          this.selectedSchoolCategory = this.masterList.school_categoty.find(
            s => {
              return s.key == this.student.school_category;
            }
          );
          this.year = this.student.year;
          this.department = this.student.department;
          this.prefectureList = this.masterList.prefecture;
          this.selectedPrefecture = this.masterList.prefecture.find(s => {
            return s.key == this.student.prefecture_code;
          });
          this.introduction = this.student.introduction;
          this.student.certification.map(c => {
            this.certificationTags.push({ name: c });
            this.certificationTagOptions.push({ name: c });
          });
          this.student.interest.map(i => {
            this.interestTags.push({ name: i });
            this.interestTagOptions.push({ name: i });
          });
        } else {
          this.lastName = this.userInfo.last_name;
          this.firstName = this.userInfo.first_name;
          this.genderList = this.masterList.gender;
          this.email = this.userInfo.email;
          this.schoolCategoryList = this.masterList.school_categoty;
          this.prefectureList = this.masterList.prefecture;
        }
      }
    },
    addCertificationTag(newCertificationTag) {
      let newTag = { name: newCertificationTag };
      this.certificationTags.push(newTag);
      this.certificationTagOptions.push(newTag);
    },
    addInterestTag(newInterestTag) {
      let newTag = { name: newInterestTag };
      this.interestTags.push(newTag);
      this.interestTagOptions.push(newTag);
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
      if (!this.lastName || !this.firstName) {
        this.messageList.push("氏名を入力してください");
      }
      if (!this.selectedGender) {
        this.messageList.push("性別を選択してください");
      }
      if (!this.emailCheck(this.email)) {
        this.messageList.push("メールアドレスを正しく入力してください");
      }
      if (!this.selectedSchoolCategory) {
        this.messageList.push("学校の区分を選択してください");
      }
      if (!this.year) {
        this.messageList.push("年次を入力してください");
      }
      if (!this.department) {
        this.messageList.push("学部・専門を入力してください");
      }
      if (!this.selectedPrefecture) {
        this.messageList.push("都道府県を選択してください");
      }
      if (this.student != undefined) {
        if (this.password) {
          if (this.password.length < 6) {
            this.messageList.push("パスワードを6文字以上で入力してください");
          }
          if (this.password != this.passwordReInput) {
            this.messageList.push("再入力されたパスワードが異なります");
          }
        }
      } else if (this.userInfo.auth_category != "email") {
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
            student: {
              user_id: this.userInfo.user_id,
              password: this.password,
              image_url: this.userInfo.image_url,
              email: this.email,
              last_name: this.lastName,
              first_name: this.firstName,
              gender: this.selectedGender.key,
              school_category: this.selectedSchoolCategory.key,
              year: this.year,
              department: this.department,
              prefecture_code: this.selectedPrefecture.key,
              introduction: this.introduction,
              certification: this.certificationTags.map(c => c.name),
              interest: this.interestTags.map(i => i.name)
            }
          };
        } else {
          postData = new FormData();
          postData.append("student[user_id]", this.userInfo.user_id);
          postData.append("student[password]", this.password);
          postData.append("student[image_url]", this.userInfo.image_url);
          postData.append("student[image_file]", this.image_file);
          postData.append("student[email]", this.email);
          postData.append("student[last_name]", this.lastName);
          postData.append("student[first_name]", this.firstName);
          postData.append("student[gender]", this.selectedGender.key);
          postData.append(
            "student[school_category]",
            this.selectedSchoolCategory.key
          );
          postData.append("student[year]", this.year);
          postData.append("student[department]", this.department);
          postData.append(
            "student[prefecture_code]",
            this.selectedPrefecture.key
          );
          postData.append("student[introduction]", this.introduction);
          this.certificationTags.forEach(c => {
            postData.append("student[certification][]", c.name);
          });
          this.interestTags.forEach(i => {
            postData.append("student[interest][]", i.name);
          });
        }
        var response = undefined;
        let headers = this.image_file ? "multipart/form-data" : undefined;

        response = await this.postApi(
          this.$axios,
          "editStudentProfile",
          postData,
          headers
        );
        if (response.status == 200) {
          // storeのユーザ情報の更新
          this.updateUserInfo({ userInfo: response.data });
          this.updateLoginState({ isSignedIn: true });
          // 編集の時
          if (this.student != undefined) {
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
        } else if (response.status == 202) {
          this.updateFlashMessageDisp({
            flashMessageDisp: {
              title: "登録完了",
              message:
                "メールアドレスの変更手続きがありますので、変更後のメールアドレスにてメールをご確認ください。",
              position: "right bottom",
              result: "success",
              watchFlg: true
            }
          });
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
