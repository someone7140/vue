<template>
  <div>
    <span v-if="!newsErrorFlg">
      【NEWSリスト】
      <div v-if="category">選択カテゴリー：{{ getCategory }}</div>
      <div v-if="word">検索ワード：{{ word }}</div>
      <news-list-component />
    </span>
    <span v-if="newsErrorFlg">ニュースが取得できませんでした。</span>
    <flash-message-display-component />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import api_mixin from "~/mixins/api_mixin.js";
import common_mixin from "~/mixins/common_mixin.js";
import FlashMessageDisplayComponent from "~/components/common/FlashMessageDisplayComponent.vue";
import NewsListComponent from "~/components/news/NewsListComponent.vue";

export default {
  mixins: [api_mixin, common_mixin],
  props: ["category", "word"],
  data() {
    return {
      newsErrorFlg: false
    };
  },
  components: {
    FlashMessageDisplayComponent,
    NewsListComponent
  },
  computed: {
    ...mapState("historyBackStore", ["historyBackFlg"]),
    ...mapState("masterStore", ["masterList"]),
    getCategory: function() {
      return this.getDisplayCategory(this.category);
    }
  },
  methods: {
    ...mapActions("newsStore", ["updateNewsList"]),
    ...mapActions("historyBackStore", ["updateHistoryBackFlg"])
  },
  async created() {
    if (this.historyBackFlg != "true") {
      var response = undefined;
      if (this.category && this.word) {
        response = await this.getReponseApi(
          this.$axios,
          "news?category=" + this.category + "&word=" + this.word
        );
      } else if (this.category) {
        response = await this.getReponseApi(
          this.$axios,
          "news?category=" + this.category
        );
      } else if (this.word) {
        response = await this.getReponseApi(
          this.$axios,
          "news?word=" + this.word
        );
      } else {
        response = await this.getReponseApi(this.$axios, "news");
      }
      if (response && response.status == 200) {
        this.newsErrorFlg = false;
        this.updateNewsList({ newsList: response.data });
      } else {
        this.newsErrorFlg = true;
      }
    } else {
      this.updateHistoryBackFlg({ historyBackFlg: "false" });
    }
  }
};
</script>
