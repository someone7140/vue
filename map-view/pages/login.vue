<template>
  <div>
    <header-component />
    <b>ログイン</b><hr/><br/>
    メールアドレス<br/>
    <input v-model="email" size=33/><br/>
    パスワード<br/>
    <input type="password" v-model="password" size=33/><br/>
    <input type="button" value="ログイン" v-bind:disabled="!isPush" @click="pushBtn()"/><br/>
    {{message}}
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import HeaderComponent from '~/components/HeaderComponent.vue'

export default {
  components: {
    HeaderComponent
  },
  data() {
    return {
      email: "",
      password: "",
      message: ""
    }
  },
  computed: {
    isPush: function () {
      return (
        this.email.length &&　this.password.length > 0
      );
    }
  },
  methods: {
    ...mapActions('user', ['updateSignInState']),
    async pushBtn() {
      let param = {
        email: this.email,
        password: this.password
      }
      let result  = await this.$axios.$post("http://127.0.0.1:8000/api/user/login", param);
      if(result.status == 200) {
        this.updateSignInState({isSignedIn: true, name: result.name})
        this.$router.push("/");
      } else {
        this.password = "";
        this.message = result.message;
      }
    }
  }
}
</script>
