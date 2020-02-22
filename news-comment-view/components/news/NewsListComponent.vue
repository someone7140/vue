<template>
  <div>
    <div v-for="news of displayList" v-bind:key="news.index">
      <news :news="news" />
    </div>
    <infinite-loading ref="infiniteLoading" spinner="spiral" @infinite="infiniteHandler">
      <span slot="no-more">結果は以上です</span>
      <span slot="no-results">ニュースの取得中です</span>
    </infinite-loading>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import news from "~/components/news/NewsComponent.vue";

export default {
  components: {
    news
  },
  computed: {
    ...mapState("newsStore", ["newsList", "displayList"]),
    getNewsListFromStore: function() {
      return this.newsList;
    }
  },
  methods: {
    ...mapActions("newsStore", ["updateDisplayList"]),
    infiniteHandler() {
      setTimeout(() => {
        let newsListLength = this.newsList.length;
        let displayNewsLength = this.displayList.length;
        // 全件リストと表示リストの件数比較
        if (newsListLength != displayNewsLength) {
          this.updateDisplayNewsList(newsListLength, displayNewsLength);
          this.$refs.infiniteLoading.stateChanger.loaded();
        } else {
          this.$refs.infiniteLoading.stateChanger.complete();
        }
      }, 1000);
    },
    updateDisplayNewsList(newsListLength, displayNewsLength) {
      let undisplaySize = newsListLength - displayNewsLength;
      let updatedDisplay = [];
      if (undisplaySize > 0) {
        let diff = newsListLength - undisplaySize;
        // 10件ずつ読み込み
        let getDisplaySize = undisplaySize >= 10 ? 10 : undisplaySize;
        let appendDisplayList = this.newsList.slice(
          diff,
          diff + getDisplaySize
        );
        if (displayNewsLength > 0) {
          updatedDisplay = this.displayList.concat(appendDisplayList);
        } else {
          updatedDisplay = appendDisplayList;
        }
      }
      this.updateDisplayList({ displayList: updatedDisplay });
    }
  },
  watch: {
    getNewsListFromStore() {
      // storeのnewslistが更新されたらdisplayは0件で初期化
      this.updateDisplayNewsList(this.newsList.length, 0);
    }
  }
};
</script>
