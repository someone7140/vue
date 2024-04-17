<script setup lang="ts">
import UserLoginComponent from '~/components/userAccount/UserLoginComponent.vue';
import { useLoginState } from '~/composables/globalState';

const loginState = useLoginState();
</script>

<template>
  <div v-if="loginState == null">
    <div class="mb-3">ログイン</div>
    <UserLoginComponent />
  </div>
</template>
