<script setup lang="ts">

const loginState = useLoginState();

</script>

<template>
  <div v-if="loginState != null">
    <UserAccountEditComponent />
  </div>
</template>
