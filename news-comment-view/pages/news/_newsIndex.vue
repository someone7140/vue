<template>
  <div>
    <header-component />
    <news-detail-component :index="index" />
    <flash-message-display-component />
  </div>
</template>

<script>
import { mapState } from "vuex";
import FlashMessageDisplayComponent from "~/components/common/FlashMessageDisplayComponent.vue";
import HeaderComponent from "~/components/common/HeaderComponent.vue";
import NewsDetailComponent from "~/components/news/NewsDetailComponent.vue";

export default {
  computed: {
    ...mapState("masterStore", ["masterList"])
  },
  data() {
    return {
      index: 0
    };
  },
  components: {
    FlashMessageDisplayComponent,
    HeaderComponent,
    NewsDetailComponent
  },
  async created() {
    // masterがstoreに無い場合はトップに遷移
    if (this.masterList == undefined) {
      this.$router.push({ path: "/" });
    } else {
      this.index = this.$route.params.newsIndex;
    }
  }
};
</script>
