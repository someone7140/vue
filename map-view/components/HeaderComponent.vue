<template>
  <table id="header_table">
    <tr>
      <td>
        <span v-if = "!isSignedIn">
          <nuxt-link to="/login" class="menu">ログイン</nuxt-link>
          <nuxt-link to="/user_regist" class="menu">ユーザ登録</nuxt-link>
        </span>
        <span v-if = "isSignedIn">
          <span class="menu">【{{name}}】さんでログインしています。</span>
          <nuxt-link to="/user_regist" class="menu">ユーザ設定変更</nuxt-link>
        </span>
      </td>
    </tr>
  </table>
  

</template>
<style>
#header_table {
  height:50px;
  width:100%;
  background-color:#bde9ba;
  margin-bottom: 10px;
  column-span: 20px;
}
.menu {
  margin-left: 20px;
  margin-right: 20px;
}
</style>
<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('user', ['isSignedIn', 'name'])
  }
}
</script>