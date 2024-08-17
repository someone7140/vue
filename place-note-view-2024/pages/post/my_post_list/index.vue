<script setup lang="ts">

const loginState = useLoginState();

</script>

<template>
  <div v-if="loginState != null">
    <div class="mb-3">登録した投稿一覧</div>
    <MyPostListComponent />
  </div>
</template>
