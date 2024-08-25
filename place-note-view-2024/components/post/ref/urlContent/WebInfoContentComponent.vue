<script setup lang="ts">
import type { UrlDetail } from '~/gql/graphql';

const props = defineProps({
    urlContent: {
        type: Object as () => UrlDetail,
        default: {}
    },
})

const urlInfo = ref(props.urlContent?.urlInfo)

</script>

<template>
    <v-card :href="urlContent.url" target="_blank" v-if="urlInfo" width="100%" variant="outlined">
        <v-card-item>
            <v-card-title class="text-pre-wrap text-subtitle-2">
                {{ urlInfo.title }}
            </v-card-title>
            <v-card-subtitle v-if="urlInfo.siteName">
                {{ urlInfo.siteName }}
            </v-card-subtitle>
            <v-img width="95%" aspect-ratio="16/9" :src="urlInfo.imageUrl" v-if="urlInfo.imageUrl"></v-img>
        </v-card-item>
    </v-card>
</template>
