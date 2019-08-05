<template>
  <div>
    <header-component />
    <b>ユーザ登録</b><hr/><br/>
    <div v-if="!regist_success">
      表示名称<br/>
      <input v-model="user_name" size=33/><br/>
      メールアドレス<br/>
      <input v-model="email" size=33/><br/>
      パスワード<br/>
      <input type="password" v-model="password" size=33/><br/>
      <input type="password" v-model="password_confirm" size=33/><br/>
      アイコン画像<br/>
      <input type="file" name="image_file" @change="onUpload()"/><br/>
      <div v-if="upload_success">
        <br/><img v-bind:src=img_src width=150 height=150>
      </div>
      <br/>
      <input type="button" v-bind:value=button_name v-bind:disabled="!isPush" @click="pushBtn()"/><br/>
      {{message}}
    </div>
    <div v-if="regist_success">
      登録完了しました。
    </div>
  </div>
</template>

<script>
import HeaderComponent from '~/components/HeaderComponent.vue'
import api_mixin from '~/mixins/api_mixin.js'
import { mapState, mapActions } from 'vuex'

export default {
  mixins: [api_mixin],
  components: {
    HeaderComponent
  },
  data() {
    return {
      user_name: "",
      email: "",
      password: "",
      password_confirm: "",
      regist_success: false,
      img_src:"",
      upload_success: false,
      button_name: "",
      image_file: "",
      message: ""
    }
  },
  computed: {
    isPush: function () {
      return (
        this.user_name.length > 0 && this.email.length > 0 &&
        (this.isSignedIn || (!this.isSignedIn &&
          this.password.length > 5 && this.password_confirm.length > 5 &&
          this.password == this.password_confirm)
        )
      );
    },
    ...mapState('user', ['isSignedIn', 'name'])
  },
  methods: {
    ...mapActions('user', ['updateSignInState']),
    async pushBtn() {
      let param = {
        name: this.user_name,
        email: this.email,
        password: this.password,
        password_confirm: this.password_confirm
      }
      let result;
      if(this.isSignedIn) {
        result  = await this.$axios.$post("http://127.0.0.1:8000/api/user/update", param, this.getAuthHeader());
      } else {
        result  = await this.$axios.$post("http://127.0.0.1:8000/api/user/create", param);
      }
      if(result.status == 200) {
        this.regist_success = true;
        
      } else {
        this.password = "";
        this.password_confirm = "";        
        this.message = result.message;
      }
    },
    onUpload() {
      this.image_file = event.target.files[0];
      // FileReaderオブジェクトを使ってファイル読み込み
      var reader = new FileReader();
      // ファイル読み込みに成功したときの処理
      reader.onload = function() {
        this.img_src = reader.result;
        this.upload_success = true;
      }.bind(this)
      // ファイル読み込みを実行
      reader.readAsDataURL(this.image_file);
    }
  },
  async mounted() {
    if(this.isSignedIn) {
      this.button_name = "更新する"
      let result  = await this.$axios.$get("http://127.0.0.1:8000/api/user/user_info", this.getAuthHeader());
      if(result.status == 200) {
        this.user_name = result.name;
        this.email = result.email;
      } else {
        this.updateSignInState({isSignedIn: false, name: "", apiToken: ""})
        this.$router.push("/");
      }
    } else {
        this.button_name = "ユーザ登録";
    }
  }
}
</script>
