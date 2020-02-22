<template>
  <div>
    <div v-if="!news">
      <button type="button" @click="backToNewsList">前の画面に戻る</button>
    </div>
    <div v-if="news">
      <div id="news" :style="styles">
        <button type="button" @click="backToNewsList">前の画面に戻る</button>
        <br />
        {{ news.title }}
        <br />
        <img :src="news.image_url" width="200" height="100" />
        <br />
        {{ news.description }}
        <br />
        <a :href="news.url" target="_blank">続きはこちら</a>
        <br />
        {{ getCategory }}&nbsp;&nbsp;{{ news.provider }}&nbsp;&nbsp;{{getDisplayPublished}}
      </div>
      <own-comment-component :news="news" />
      <other-comment-component />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import api_mixin from "~/mixins/api_mixin.js";
import common_mixin from "~/mixins/common_mixin.js";
import OwnCommentComponent from "~/components/comment/OwnCommentComponent.vue";
import OtherCommentComponent from "~/components/comment/OtherCommentComponent.vue";

export default {
  mixins: [api_mixin, common_mixin],
  props: ["index"],
  data() {
    return {
      news: undefined
    };
  },
  components: {
    OtherCommentComponent,
    OwnCommentComponent
  },
  computed: {
    ...mapState("newsStore", ["newsList"]),
    ...mapState("userStore", ["isSignedIn"]),
    ...mapState("historyBackStore", ["historyBackFlg"]),
    getDisplayPublished: function() {
      return this.getDisplayJpDate(this.news.date_published);
    },
    getCategory: function() {
      return this.getDisplayCategory(this.news.category);
    },
    // バインドするスタイルを生成
    styles() {
      // 固定位置の初期値は50px
      var fixPos = "50px";
      if (this.isSignedIn) {
        fixPos = "66px";
      }
      return {
        "--fixPos": fixPos
      };
    }
  },
  async created() {
    this.news = this.newsList.find(news => {
      return news.index === parseInt(this.index);
    });
    if (this.historyBackFlg == "true") {
      this.updateHistoryBackFlg({ historyBackFlg: "false" });
    } else {
      if (this.news) {
        let response = await this.postApi(this.$axios, "getCommentOtherUsers", {
          comment_byurl: {
            url: this.news.url
          }
        });
        if (response.status == 200 && response.data) {
          this.updateOtherCommentList({
            otherCommentList: response.data
          });
          this.updateDisplayOtherCommentList({
            displayOtherCommentList: []
          });
        }
      }
    }
  },
  methods: {
    ...mapActions("historyBackStore", ["updateHistoryBackFlg"]),
    ...mapActions("commentStore", [
      "updateOtherCommentList",
      "updateDisplayOtherCommentList"
    ]),
    backToNewsList() {
      this.updateHistoryBackFlg({ historyBackFlg: "true" });
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
#news {
  /* デフォルトの値を宣言*/
  --fixPos: 50px;

  position: sticky;
  top: var(--fixPos);
  background-color: #ffffff;
}
</style>
