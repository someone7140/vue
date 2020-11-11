<template>
  <div>
    <HeaderComponent />
    <div class="container">
      <section class="container my-5">
        <div class="bg-dark text-light text-left p-4 mb-3">
          <h4 class>運営者投稿記事</h4>
          <span class="text-muted">精神障がい者・発達障がい者向けのサービスを告知します</span>
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
      userCategory: "admin",
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
