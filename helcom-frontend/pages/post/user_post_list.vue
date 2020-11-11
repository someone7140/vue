<template>
  <div>
    <HeaderComponent />
    <div class="container">
      <section class="container my-5">
        <div class="bg-dark text-light text-left p-4 mb-3">
          <h4 class>ユーザー投稿記事</h4>
          <span class="text-muted">このサイトの利用者さんに書いていただいた記事になります。</span>
        </div>
        <PostListComponent :userCategory="userCategory" :displayUnit="postDisplayUnit" />
      </section>
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import FooterComponent from "~/components/common/FooterComponent.vue";
import HeaderComponent from "~/components/common/HeaderComponent.vue";
import PostListComponent from "~/components/post/PostListComponent.vue";

export default {
  middleware: "authCheck",
  data() {
    return {
      userCategory: "user",
      postDisplayUnit: 5,
    };
  },
  components: {
    FooterComponent,
    HeaderComponent,
    PostListComponent,
  },
};
</script>
