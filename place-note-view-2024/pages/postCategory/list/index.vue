<script setup lang="ts">
import { useLoginState } from '~/composables/globalState';

const loginState = useLoginState();

</script>

<template>
  <div v-if="loginState != null">
    <div class="mb-3">カテゴリー一覧</div>
    <PostCategoryListComponent :displayActionButton="true" />
  </div>
</template>
