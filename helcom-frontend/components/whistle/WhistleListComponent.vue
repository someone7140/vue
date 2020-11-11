<template>
  <div>
    <div class="container text-center">
      <h1 class="m-5 pt-5">投稿通報一覧</h1>

      <div class="text-left mx-5">
        <div v-if="postWhistleList.length > 0">
          <table class="whistle-list-table">
            <tr>
              <th class="whistle-list-table-td">投稿ユーザID</th>
              <th class="whistle-list-table-td">投稿記事</th>
              <th class="whistle-list-table-td">通報ユーザID</th>
              <th class="whistle-list-table-td">通報内容</th>
              <th class="whistle-list-table-td">通報日付</th>
            </tr>
            <tr
              v-for="(whistle, index) of filterDisplayPostWhistle"
              v-bind:key="index"
            >
              <td class="whistle-list-table-td">
                <nuxt-link
                  :to="getUserLink(whistle.post_owner_user_id)"
                  target="_blank"
                  >{{ whistle.post_owner_user_id }}</nuxt-link
                >
              </td>
              <td class="whistle-list-table-td">
                <a :href="whistle.url" target="_blank">{{ whistle.title }}</a>
              </td>
              <td class="whistle-list-table-td">
                <nuxt-link
                  :to="getUserLink(whistle.whistle_send_user_id)"
                  target="_blank"
                  >{{ whistle.whistle_send_user_id }}</nuxt-link
                >
              </td>
              <td class="whistle-list-table-td">{{ whistle.contents }}</td>
              <td class="whistle-list-table-td">
                {{ getDisplayTime(whistle.whistle_at) }}
              </td>
            </tr>
          </table>

          <br />
          <div class="text-center" v-if="displayCount < postWhistleList.length">
            <button
              class="btn btn-dark p-3"
              @click="displaySet(postWhistleList)"
            >
              もっとみる
            </button>
          </div>
        </div>
        <div class="text-center" v-else>投稿通報はありません</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import apiMixin from "~/mixins/apiMixin.js";
import commonMixin from "~/mixins/commonMixin.js";

export default {
  mixins: [apiMixin, commonMixin],
  data() {
    return {
      postWhistleList: [],
      displayCount: 0,
      displayUnit: 20
    };
  },
  computed: {
    filterDisplayPostWhistle() {
      return this.postWhistleList.filter(p => {
        return p.displayFlg;
      });
    },
    getUserLink: function() {
      return function(userId) {
        return "/profile/profile_refer?user_id=" + userId;
      };
    },
    getDisplayTime: function() {
      return function(dateTime) {
        return this.getDisplayJpDateTime(new Date(dateTime));
      };
    }
  },
  async created() {
    const result = await this.getReponseApi(
      this.$axios,
      "post/admin_post_whistle_list?limit=200"
    );
    if (result && result.status == 200) {
      this.displaySet(result.post_whistle_list);
    } else {
      this.updateFlashMessageDisp({
        flashMessageDisp: {
          title: "エラー",
          message: "取得中にエラーが発生しました。再度読み込んでください。",
          result: "error",
          watchFlg: true
        }
      });
    }
  },
  methods: {
    ...mapActions("flashMessageStore", ["updateFlashMessageDisp"]),
    displaySet(inputPostWhistleList) {
      var displayAddCount = 0;
      this.postWhistleList = inputPostWhistleList.map(p => {
        if (p.displayFlg || displayAddCount >= this.displayUnit) {
          return p;
        } else {
          displayAddCount = displayAddCount + 1;
          return {
            ...p,
            displayFlg: true
          };
        }
      });
      this.displayCount = this.displayCount + this.displayUnit;
    }
  }
};
</script>

<style>
.whistle-list-table {
  border: 1px solid;
  border-collapse: collapse;
  width: 100%;
}
.whistle-list-table-td {
  border: 1px solid;
}
</style>
