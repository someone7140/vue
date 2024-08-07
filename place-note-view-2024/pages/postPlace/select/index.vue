<script setup lang="ts">
import { POST_PLACE_LIST_ACTION_CATEGORY } from '~/components/postPlace/const/postPlaceConst';

const loginState = useLoginState();

</script>

<template>
  <div v-if="loginState != null">
    <div class="mb-3">場所選択</div>
    <PostPlaceListComponent :actionType="POST_PLACE_LIST_ACTION_CATEGORY.Select" />
  </div>
</template>
