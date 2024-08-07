<script setup lang="ts">

const loginState = useLoginState();

</script>

<template>
  <div v-if="loginState != null">
    <div class="mb-3">投稿追加</div>
    <PostAddSelectComponent />
  </div>
</template>
