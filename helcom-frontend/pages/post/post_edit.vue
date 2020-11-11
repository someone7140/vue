<template>
  <div>
    <HeaderComponent />
    <div class="container main">
      <MyPageHeaderComponent />
      <div class="container">
        <section class="container my-5">
          <div class="bg-dark text-light text-left p-4 mb-3">
            <h4 class>記事編集</h4>
            <span class="text-muted">投稿した記事を編集します</span>
          </div>
          <PostRegistComponent :postId="postId" />
        </section>
      </div>
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import FooterComponent from "~/components/common/FooterComponent.vue";
import HeaderComponent from "~/components/common/HeaderComponent.vue";
import MyPageHeaderComponent from "~/components/profile/MyPageHeaderComponent.vue";
import PostRegistComponent from "~/components/post/PostRegistComponent.vue";

export default {
  middleware: "authCheck",
  components: {
    FooterComponent,
    HeaderComponent,
    MyPageHeaderComponent,
    PostRegistComponent,
  },
  data() {
    return {
      postId: undefined,
    };
  },
  created() {
    if (this.$route.query.post_id) {
      this.postId = this.$route.query.post_id;
    }
  },
};
</script>
