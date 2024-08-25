<script setup lang="ts">
import type { UrlDetail } from '~/gql/graphql';

const props = defineProps({
    url: {
        type: String,
        default: undefined
    },
})

</script>

<template>
    <a :href="props.url" class="text-truncate" target="_blank" v-if="props.url">
        {{ props.url }}
    </a>
</template>
