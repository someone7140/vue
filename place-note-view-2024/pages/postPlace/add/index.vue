<script setup lang="ts">
import type { LocationQueryValue } from 'vue-router';
import { POST_PLACE_ADD_AFTER_PAGE, type PostPlaceAddAfterPage } from '~/components/postPlace/const/postPlaceConst';

const loginState = useLoginState();

const route = useRoute()
const afterPage = (route.query.addAfter as LocationQueryValue ?? POST_PLACE_ADD_AFTER_PAGE.PlaceList) as PostPlaceAddAfterPage

</script>

<template>
  <div v-if="loginState != null">
    <div class="mb-3">場所追加</div>
    <PostPlaceRegisterComponent :afterPage="afterPage" />
  </div>
</template>
