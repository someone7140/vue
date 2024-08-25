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
    <WebInfoContentComponent v-else-if="urlType === UrlTypeEnum.WebWithInfo && urlContent" :urlContent="urlContent" />
    <WebNoInfoContentComponent v-else :url="urlContent?.url" />
</template>
