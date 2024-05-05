<script setup lang="ts">
import type { LocationQueryValue } from 'vue-router';

const route = useRoute()
const categoryId = route.query.categoryId as LocationQueryValue ?? ""

const loginState = useLoginState();

</script>

<template>
  <div v-if="loginState != null && !!categoryId">
    <div class="mb-3">カテゴリー編集</div>
    <PostCategoryEditComponent :categoryId="categoryId" />
  </div>
</template>
