<template>
  <div>
    <section class="mt-5 pt-5 text-center">
      <div class="pb-2">
        <span v-if="nowPage == 'profile'">
          <b>Public Profile</b>
        </span>
        <span v-else>
          <nuxt-link to="/profile/profile_mypage" class="text-dark"
            >Public Profile</nuxt-link
          >
        </span>
      </div>
      <div class="pb-2">
        <span v-if="nowPage == 'password_change'">
          <b>パスワード変更</b>
        </span>
        <span v-else>
          <nuxt-link to="/auth/mail/password_change" class="text-dark"
            >パスワード変更</nuxt-link
          >
        </span>
        <br />
      </div>
      <div class="pb-2">
        <span v-if="nowPage == 'post'">
          <b>記事投稿</b>
        </span>
        <span v-else>
          <nuxt-link to="/post/post_create" class="text-dark"
            >記事投稿</nuxt-link
          >
        </span>
      </div>
    </section>
    <hr />
  </div>
</template>

<script>
export default {
  props: ["nowPage"],
};
</script>
