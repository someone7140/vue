<template>
  <div>
    <HeaderComponent />
    <main role="main">
      <div class="my-3">&nbsp;</div>
      <div class="main-header text-center bg-dark">
        <div class="main-header-text row p-3">
          <div class="col-2 p-0">
            <img :src="'/frontend/icon_helcom.png'" class="top-icon" />
          </div>
          <div class="col-10 p-0 text-left">
            <h4>病気で繋がるSNS</h4>
          </div>
        </div>
      </div>
      <div class="container my-3 text-center">
        <div>
          現在β版です。ご意見・ご感想などありましたら
          <a :href="betaFormPath" target="_blank">こちら</a
          >のフォームにてお願いします。
        </div>
        <section class="p-3">
          <div
            id="user_article"
            class="back-orange mb-3 p-3 user-post-section text-center"
          >
            <h3>お話ししてみる</h3>
            <span class="text-muted"
              >このサービスの目的は”精神障がい者・発達障がい者を独りにしない”です。<br />
              チャットで、他の方のアイコンをクリックしてプロフィール欄のSNSでフレンド申請してみてください。</span
            >
          </div>
          <br />
          <ChatSelectComponent />
        </section>
        <section class="p-3">
          <div
            id="user_article"
            class="back-orange mb-3 p-3 user-post-section text-center"
          >
            <h3>ユーザー投稿記事</h3>
            <span class="text-muted"
              >このサイトの利用者さんに書いていただいた記事になります。<br />記事の投稿は
              <nuxt-link to="/post/post_create">こちら</nuxt-link>
              から</span
            >
          </div>
          <PostListTopComponent :userCategory="'user'" />
        </section>
        <section class="p-3 text-center">
          <div
            id="admin_article"
            class="back-orange mb-3 p-3 text-center user-post-section"
          >
            <h3>運営者投稿記事</h3>
            <span class="text-muted"
              >精神障がい者・発達障がい者向けのサービスを告知します</span
            >
          </div>
          <PostListTopComponent :userCategory="'admin'" />
        </section>
      </div>
    </main>
    <FooterComponent />
  </div>
</template>

<script>
import ChatSelectComponent from "~/components/chat/ChatSelectComponent.vue";
import FooterComponent from "~/components/common/FooterComponent.vue";
import HeaderComponent from "~/components/common/HeaderComponent.vue";
import PostListTopComponent from "~/components/post/PostListTopComponent.vue";

export default {
  middleware: "authCheck",
  components: {
    ChatSelectComponent,
    FooterComponent,
    HeaderComponent,
    PostListTopComponent,
  },
  data() {
    return {
      betaFormPath: process.env.BETA_FORM_PATH,
    };
  },
};
</script>

<style>
.main-header-text {
  background-color: #f5deb3;
  color: black;
}
.top-icon {
  width: 40px;
  height: 40px;
}
.user-post-section {
  max-width: 600px;
  margin: 0 auto;
}
.back-orange {
  background: #ffdead;
}
</style>
