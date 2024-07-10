<script setup lang="ts">

const loginState = useLoginState();

</script>

<template>
  <div v-if="loginState != null">
    <div class="mb-3">カテゴリー一覧</div>
    <PostCategoryListComponent />
  </div>
</template>
