<template>
  <div>
    {{ news.title }}
    <br />
    <img :src="news.image_url" width="200" height="100" />
    <br />
    {{ news.description }}
    <br />
    <a :href="news.url" target="_blank">続きはこちら</a>
    <br />
    {{ news.category }}&nbsp;&nbsp;{{ news.provider }}&nbsp;&nbsp;{{ getDisplayPublished }}
  </div>
</template>

<script>
import common_mixin from "~/mixins/common_mixin.js";

export default {
  mixins: [common_mixin],
  props: ["news"],
  computed: {
    getDisplayPublished: function() {
      return this.getDisplayJpDate(this.news.date_published);
    }
  }
};
</script>
