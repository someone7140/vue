<template>
  <div>
    <div v-if="masterList">
      <header-component />
      <news-search-component :category="categoryParam" :word="wordParam" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import FlashMessageDisplayComponent from "~/components/common/FlashMessageDisplayComponent.vue";
import HeaderComponent from "~/components/common/HeaderComponent.vue";
import NewsSearchComponent from "~/components/news/NewsSearchComponent.vue";

export default {
  data() {
    return {
      categoryParam: undefined,
      wordParam: undefined
    };
  },
  computed: {
    ...mapState("masterStore", ["masterList"]),
    ...mapState("newsStore", ["selectedCategory"])
  },
  components: {
    HeaderComponent,
    NewsSearchComponent
  },
  created() {
    this.categoryParam = this.selectedCategory;
    this.wordParam = this.$route.query.word;
  }
};
</script>
