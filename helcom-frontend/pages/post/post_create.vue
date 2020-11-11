<template>
  <div>
    <HeaderComponent />
    <div class="container main">
      <MyPageHeaderComponent nowPage="post" />
      <div class="container">
        <section class="container my-5">
          <div class="back-orange text-light text-left p-4 mb-3">
            <h4 class>記事投稿</h4>
            <span class="text-muted">別サイトの記事を載せることができます</span>
          </div>
          <PostRegistComponent />
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
    PostRegistComponent
  }
};
</script>

<style>
.back-orange {
  background: #ffdead;
}
</style>
