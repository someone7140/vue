<script setup lang="ts">
import type { UrlDetail } from '~/gql/graphql';
import { UrlTypeEnum } from '~/gql/graphql';

const props = defineProps({
    urlContent: {
        type: Object as () => UrlDetail,
        default: {}
    },
})

const urlType = ref(props.urlContent.urlType ?? UrlTypeEnum.WebNoInfo)

</script>

<template>
    <XContentComponent v-if="urlType === UrlTypeEnum.X && urlContent?.embedHtml" :html="urlContent?.embedHtml" />
    <ThreadsContentComponent v-else-if="urlType === UrlTypeEnum.Threads" :url="urlContent?.url" />
    <iframe frameborder=0 v-else-if="urlType === UrlTypeEnum.Instagram"
        :src="`/post/contents/instagram?url=${urlContent?.url}`" style="width:100%; height:430px"></iframe>
    <WebInfoContentComponent v-else-if="urlType === UrlTypeEnum.WebWithInfo && urlContent" :urlContent="urlContent" />
    <WebNoInfoContentComponent v-else :url="urlContent?.url" />
</template>
