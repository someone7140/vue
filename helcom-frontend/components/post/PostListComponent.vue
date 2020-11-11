<template>
  <div>
    <ul class="boxContainer">
      カテゴリー選択
      <br />
      <br />
      <li class="box">
        <select v-model="selectedCategory" class="category-input">
          <option value="all">全て</option>
          <optgroup v-for="g in categoryList.optGroup" :label="g.label" :key="g.key">
            <option
              v-for="option in g.childs"
              :value="option.value"
              :key="option.value"
            >{{ option.label }}</option>
          </optgroup>
          <option
            v-for="option in categoryList.opt"
            :value="option.value"
            :key="option.value"
          >{{ option.label }}</option>
        </select>
      </li>
      <li class="box">
        <button class="btn btn-dark" @click="search">再検索</button>
      </li>
    </ul>
    <div v-if="postList.length > 0">
      <div v-for="(post ,index) of filterDisplayPost" v-bind:key="post.post_id">
        <hr class="featurette-divider" />
        <PostContentsComponent :post="post" :userCategory="userCategory" />
        <div v-if="index == (filterDisplayPost.length - 1) && displayCount < postList.length">
          <br />
          <div class="text-center">
            <button class="btn btn-dark p-3" @click="displaySet(postList)">もっとみる</button>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center" v-else>投稿はありません</div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import apiMixin from "~/mixins/apiMixin.js";
import commonMixin from "~/mixins/commonMixin.js";
import PostContentsComponent from "~/components/post/PostContentsComponent.vue";

export default {
  mixins: [apiMixin, commonMixin],
  props: ["userCategory", "userId", "displayUnit"],
  components: {
    PostContentsComponent,
  },
  computed: {
    ...mapState("masterStore", ["master"]),
    filterDisplayPost() {
      return this.postList.filter((p) => {
        return p.displayFlg;
      });
    },
  },
  data() {
    return {
      postList: [],
      selectedCategory: "all",
      categoryList: [],
      displayCount: 0,
    };
  },

  created() {
    // storeのmaster情報をコンボボックス用にセット
    this.categoryList = this.getNestCategoryList(
      this.master.profile_disease_group_list,
      this.master.post_category_list
    );
  },
  async mounted() {
    var result = await this.getPostList();
    if (result && result.status == 200) {
      this.displaySet(result.user_posts);
    }
  },
  methods: {
    ...mapActions("flashMessageStore", ["updateFlashMessageDisp"]),
    async search() {
      this.displayCount = 0;
      var result = await this.getPostList();
      if (result && result.status == 200) {
        this.displaySet(result.user_posts);
      }
      this.updateFlashMessageDisp({
        flashMessageDisp: {
          title: "検索完了",
          message: "投稿一覧の結果を更新しました。",
          result: "success",
          watchFlg: true,
        },
      });
    },
    getPostList() {
      if (this.userCategory == "user") {
        return this.getReponseApi(
          this.$axios,
          "post/refer_all_users_posts?limit=100&post_category=" +
            this.selectedCategory
        );
      } else if (this.userCategory == "admin") {
        return this.getReponseApi(
          this.$axios,
          "post/refer_admin_posts?limit=100&post_category=" +
            this.selectedCategory
        );
      } else if (this.userCategory == "own") {
        // 自分の記事の時はmax1000件で多めにする
        return this.getReponseApi(
          this.$axios,
          `post/refer_user_posts/${this.userId}?limit=1000&post_category=${this.selectedCategory}&`
        );
      } else if (this.userCategory == "other") {
        return this.getReponseApi(
          this.$axios,
          `post/refer_user_posts/${this.userId}?limit=100&post_category=${this.selectedCategory}`
        );
      }
    },
    displaySet(inputPostList) {
      var displayAddCount = 0;
      this.postList = inputPostList.map((p) => {
        if (p.displayFlg || displayAddCount >= this.displayUnit) {
          return p;
        } else {
          displayAddCount = displayAddCount + 1;
          return {
            ...p,
            displayFlg: true,
          };
        }
      });
      this.displayCount = this.displayCount + this.displayUnit;
    },
  },
};
</script>

<style>
.box {
  display: inline-block;
  margin: 0px 30px 0px 0;
}
.boxContainer {
  text-align: center;
}
.category-input {
  height: 38px;
  width: 150px;
}
</style>