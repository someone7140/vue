<script setup lang="ts">
import type { LocationQueryValue } from 'vue-router';

definePageMeta({
  layout: 'no-header'
})

const route = useRoute()
const url = route.query.url as LocationQueryValue ?? ""

</script>

<template>
  <InstagramContentComponent :url="url" />
</template>
