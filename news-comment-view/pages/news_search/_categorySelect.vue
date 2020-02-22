<template>
  <div>
    <div v-if="masterList">
      <header-component />
      <news-search-component :category="categoryParam" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import FlashMessageDisplayComponent from "~/components/common/FlashMessageDisplayComponent.vue";
import HeaderComponent from "~/components/common/HeaderComponent.vue";
import NewsSearchComponent from "~/components/news/NewsSearchComponent.vue";

export default {
  data() {
    return {
      categoryParam: undefined
    };
  },
  computed: {
    ...mapState("masterStore", ["masterList"])
  },
  components: {
    HeaderComponent,
    NewsSearchComponent
  },
  methods: {
    ...mapActions("newsStore", ["updateSelectedCategory"])
  },
  created() {
    this.categoryParam = this.$route.params.categorySelect;
    this.updateSelectedCategory({ selectedCategory: this.categoryParam });
  }
};
</script>
