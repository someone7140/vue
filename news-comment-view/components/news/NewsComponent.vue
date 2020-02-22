<template>
  <div>
    <nuxt-link
      v-bind:to="{ name: 'news-newsIndex', params: { newsIndex: news.index } }"
      class="card"
    >
      {{ news.title }}
      <br />
      <table>
        <tr>
          <td width="100">
            <img :src="news.image_url" width="80" height="80" />
          </td>
          <td>
            コメント数： {{ news.comments_count }}
            <br />
            {{ getCategory }}&nbsp;&nbsp;{{ getDisplayPublished }}
          </td>
        </tr>
      </table>
    </nuxt-link>
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
    },
    getCategory: function() {
      return this.getDisplayCategory(this.news.category);
    }
  }
};
</script>
