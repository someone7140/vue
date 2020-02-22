<template>
  <div>
    <div v-if="masterList">
      <header-component />
      <news-search-component />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import api_mixin from "~/mixins/api_mixin.js";
import HeaderComponent from "~/components/common/HeaderComponent.vue";
import NewsSearchComponent from "~/components/news/NewsSearchComponent.vue";

export default {
  mixins: [api_mixin],
  components: {
    HeaderComponent,
    NewsSearchComponent
  },
  computed: {
    ...mapState("masterStore", ["masterList"])
  },
  methods: {
    ...mapActions("newsStore", ["updateSelectedCategory"]),
    ...mapActions("masterStore", ["updateMasterList"])
  },
  async created() {
    // カテゴリー選択のstoreを初期化
    this.updateSelectedCategory({ selectedCategory: undefined });
    // masterがstoreに無い場合はセット
    if (this.masterList == undefined) {
      let response = await this.getReponseApi(this.$axios, "master");
      if (response.status == 200) {
        this.updateMasterList({ masterList: response.data });
      }
    }
  }
};
</script>
