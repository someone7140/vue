<script setup lang="ts">
import type { LocationQueryValue } from 'vue-router';

const route = useRoute()
const placeId = route.query.placeId as LocationQueryValue ?? ""

const loginState = useLoginState();

</script>

<template>
  <div v-if="loginState != null && !!placeId">
    <PostRegisterComponent :placeId="placeId" />
  </div>
</template>
