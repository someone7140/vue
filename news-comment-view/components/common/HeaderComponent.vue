<template>
  <table id="header_table">
    <tr>
      <td>
        <slide>
          <span>カテゴリー</span>
          <div>
            <nuxt-link v-bind:to="{
                name: 'index'
              }">
              <span>全て</span>
            </nuxt-link>
          </div>
          <div v-for="category of getCategoryKeyList" v-bind:key="category.index">
            <nuxt-link
              v-bind:to="{
                name: 'news_search-categorySelect',
                params: { categorySelect: category.key }
              }"
            >
              <span>{{ category.value }}</span>
            </nuxt-link>
          </div>
        </slide>
      </td>
      <td>
        <nuxt-link to="/">RANKNESS</nuxt-link>
        <span class="menu">
          <input type="text" v-model="searchWord" placeholder="ニュース検索" name="searchWord" />
          <button type="button" @click="searchNews">
            <img src="~assets/search.png" />
          </button>
        </span>
        <span v-if="!isSignedIn">
          <nuxt-link to="/auth/user_regist" class="menu">アカウント登録</nuxt-link>
          <nuxt-link to="/auth/login" class="menu">ログイン</nuxt-link>
        </span>
        <span v-if="isSignedIn">
          <span v-if="unReadMessageFlg">
            <nuxt-link to="/message/message_users" class="menu">
              <img width="30" height="30" src="~assets/message_alert.jpeg" />
            </nuxt-link>
          </span>
          <b-dropdown class="menu">
            <template v-slot:button-content>
              <span v-if="userInfo.user_category == 'student'">{{ userInfo.name }}&nbsp;</span>
              <span v-if="userInfo.user_category != 'student'">{{ userInfo.company_name }}&nbsp;</span>
              <span v-if="userInfo.image_url">
                <img :src="userInfo.image_url" width="50" height="50" />
              </span>
              <span v-if="!userInfo.image_url">
                <img src="~assets/default_icon.png" width="50" height="50" />
              </span>
            </template>
            <span v-if="userInfo.user_category == 'student'">
              <b-dropdown-item to="/account/student_profile_view">プロフィール参照</b-dropdown-item>
              <b-dropdown-item to="/account/student_profile_edit">プロフィール編集</b-dropdown-item>
            </span>
            <span v-if="userInfo.user_category != 'student'">
              <b-dropdown-item to="/company/company_profile_view">プロフィール参照</b-dropdown-item>
              <b-dropdown-item to="/company/company_profile_edit">プロフィール編集</b-dropdown-item>
            </span>
            <b-dropdown-item to="/message/message_users">メッセージ</b-dropdown-item>
            <b-dropdown-item to="/auth/login">ログアウト</b-dropdown-item>
            <b-dropdown-item to="/auth/quit">退会</b-dropdown-item>
          </b-dropdown>
        </span>
      </td>
    </tr>
  </table>
</template>
<style>
.bm-burger-button {
  width: 25px;
  height: 20px;
  left: 5px;
  top: 0px;
  position: relative;
  cursor: pointer;
  margin-right: 20px;
}
.bm-overlay {
  background: rgba(0, 0, 0, 0);
}
#header_table {
  height: 50px;
  width: 100%;
  background-color: #bde9ba;
  margin-bottom: 10px;
  column-span: 20px;
  position: sticky;
  z-index: 1;
  top: 0px;
}
.menu {
  margin-left: 20px;
  margin-right: 20px;
}
</style>
<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      searchWord: undefined
    };
  },
  computed: {
    ...mapState("masterStore", ["masterList"]),
    ...mapState("userStore", ["isSignedIn", "userInfo", "unReadMessageFlg"]),
    getCategoryKeyList: function() {
      return this.masterList.news_category;
    }
  },
  methods: {
    searchNews() {
      if (this.searchWord && this.searchWord.length > 0) {
        this.$router.push({
          path: "/news_search/word_search?word=" + this.searchWord
        });
      }
    }
  }
};
</script>
