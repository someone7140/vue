<script setup lang="ts">
import type { PostCategoryObjFragment, PostResponse } from '~/gql/graphql';

const { prefectureMap } = useGeolocationService()
const props = defineProps({
    post: {
        type: Object as () => PostResponse,
        default: {}
    },
    categories: {
        type: Array as () => Array<PostCategoryObjFragment>,
        default: []
    },
    displayActionButton: {
        type: Boolean,
        default: false
    },
    refetchPostFunc: {
        type: Function,
        default: () => { }
    },
    myPostFlag: {
        type: Boolean,
        default: false
    },
})

const { getDisplayDate } = useDisplayUtil()

</script>

<template>
    <v-card variant="outlined" min-width="300px" max-width="360px">
        <v-card-item>
            <v-card-title class="text-pre-wrap">
                {{ post.title }}
            </v-card-title>
            <div class="d-flex align-center ga-2 mt-2">
                <v-sheet class="text-pre-wrap" max-width="210px">
                    <div v-if="post.placeUrl">
                        <a :href="post.placeUrl" target="_blank">
                            {{ post!.placeName }}
                        </a>
                    </div>
                    <div v-else>
                        {{ post!.placeName }}
                    </div>
                </v-sheet>
                <v-sheet v-if="post.placePrefectureCode" min-width="50px">
                    {{ prefectureMap.get(post!.placePrefectureCode) }}
                </v-sheet>
                <v-sheet tv-if="myPostFlag" min-width="50px">
                    {{ post!.isOpen ? "公開" : "非公開" }}
                </v-sheet>
            </div>
            <div class="mb-2 mt-2">
                訪問日：{{ getDisplayDate(new Date(post.visitedDate)) }}
            </div>
            <v-card-subtitle v-if="myPostFlag && post.categoryIdList.length > 0">
                {{ post.categoryIdList.map(cId => categories.find(c => c.id === cId)?.name).join("、") }}
            </v-card-subtitle>
            <v-card-text class="text-pre-wrap">
                {{ props.post.detail }}
            </v-card-text>
            <div v-for="url in post.urlList" class="mt-2">
                <div class="d-flex justify-center mb-4" style="width:98%">
                    <UrlContentComponent :urlContent="url" />
                </div>
            </div>
        </v-card-item>
    </v-card>
</template>
