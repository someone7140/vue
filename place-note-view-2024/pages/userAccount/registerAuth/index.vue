<script setup lang="ts">

const loginState = useLoginState();

</script>

<template>
  <div v-if="loginState == null">
    <div class="mb-3">ユーザ登録</div>
    <UserAccountRegisterComponent />
  </div>
</template>
