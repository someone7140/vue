<script setup lang="ts">
import type { LocationQueryValue } from 'vue-router';

const route = useRoute()
const placeId = route.query.placeId as LocationQueryValue ?? ""

const loginState = useLoginState();

</script>

<template>
  <div v-if="loginState != null && !!placeId">
    <div class="mb-3">場所の編集</div>
    <PostPlaceEditComponent :placeId="placeId" />
  </div>
</template>
