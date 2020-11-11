<template>
  <div>
    <div v-for="post of postList" v-bind:key="post.post_id">
      <hr class="featurette-divider" />
      <PostContentsComponent :post="post" :userCategory="userCategory" />
    </div>
    <div v-if="postListLength > 3">
      <div v-if="userCategory == 'user'">
        <br />
        <nuxt-link class="text-light" to="post/user_post_list">
          <button class="btn btn-dark p-3">もっとみる</button>
        </nuxt-link>
      </div>
      <div v-else>
        <br />
        <nuxt-link class="text-light" to="post/admin_post_list">
          <button class="btn btn-dark p-3">もっとみる</button>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import apiMixin from "~/mixins/apiMixin.js";
import PostContentsComponent from "~/components/post/PostContentsComponent.vue";

export default {
  mixins: [apiMixin],
  props: ["userCategory"],
  components: {
    PostContentsComponent,
  },
  data() {
    return {
      postList: [],
      postListLength: 0,
    };
  },
  async created() {
    var result = undefined;
    // 4件以上あるか判断したいのでlimitは4にする
    if (this.userCategory == "user") {
      result = await this.getReponseApi(
        this.$axios,
        "post/refer_all_users_posts?limit=4&post_category=all"
      );
    } else if (this.userCategory == "admin") {
      result = await this.getReponseApi(
        this.$axios,
        "post/refer_admin_posts?limit=4&post_category=all"
      );
    }
    if (result && result.status == 200) {
      this.postListLength = result.user_posts.length;
      // 3件のみを表示
      if (this.postListLength > 3) {
        this.postList = result.user_posts.slice(0, 3);
      } else {
        this.postList = result.user_posts;
      }
    }
  },
};
</script>
