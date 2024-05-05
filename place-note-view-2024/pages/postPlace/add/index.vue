<script setup lang="ts">

const loginState = useLoginState();

</script>

<template>
  <div v-if="loginState != null">
    <div class="mb-3">場所追加</div>
    <PostPlaceRegisterComponent />
  </div>
</template>
