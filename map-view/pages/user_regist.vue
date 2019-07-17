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
      <input type="button" value="ユーザ登録" v-bind:disabled="!isPush" @click="pushBtn()"/><br/>
      {{message}}
    </div>
    <div v-if="regist_success">
      登録完了しました。
    </div>
  </div>
</template>

<script>
import HeaderComponent from '~/components/HeaderComponent.vue'
import { mapState, mapActions } from 'vuex'

export default {
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
      message: ""
    }
  },
  computed: {
    isPush: function () {
      return (
        this.user_name.length > 0 && this.email.length > 0 &&
        this.password.length > 5 && this.password_confirm.length > 5 &&
        this.password == this.password_confirm
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
        result  = await this.$axios.$post("http://127.0.0.1:8000/api/user/update", param);
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
    }
  },
  async mounted() {
    if(this.isSignedIn) {
      let result  = await this.$axios.$get("http://127.0.0.1:8000/api/user/user_info");
      if(result.status == 200) {
        this.user_name = result.name;
        this.email = result.email;
      } else {
        this.updateSignInState({isSignedIn: false, name: ""})
        this.$router.push("/");
      }
    }
  }
}
</script>
