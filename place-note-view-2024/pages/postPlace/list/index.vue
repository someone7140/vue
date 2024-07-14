<script setup lang="ts">

const loginState = useLoginState();

</script>

<template>
  <div v-if="loginState != null">
    <div class="mb-3">登録場所一覧</div>
    <PostPlaceListComponent />
  </div>
</template>
