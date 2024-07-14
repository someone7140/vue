<script setup lang="ts">
import type { PostCategoryResponse, PostPlaceResponse } from '~/gql/graphql';

const props = defineProps({
    places: {
        type: Array as () => Array<PostPlaceResponse>,
        default: []
    },
    categories: {
        type: Array as () => Array<PostCategoryResponse>,
        default: []
    },
    displayActionButton: {
        type: Boolean,
        default: false
    },
    refetchPlaceFunc: {
        type: Function,
        default: () => { }
    },
})
</script>

<template>
    <v-list lines="two" max-width="500px">
        <v-list-item v-for="place in places" :key="place.id">
            <v-list-item-tile>
                <div class="text-h5 text-wrap">{{ place.name }}</div>
            </v-list-item-tile>
            <v-list-item-subtitle class="text-pre-wrap ml-4" style="-webkit-line-clamp:10; overflow-wrap:anywhere">
                {{ place.detail }}
            </v-list-item-subtitle>
            <div class="mt-2 text-pre-wrap" v-if="!!place.address">
                {{ place.address }}
            </div>
            <div class="mt-2 text-pre-wrap" v-if="place.categoryIdList.length > 0">
                {{ place.categoryIdList
                    .map(id => props.categories.find(c => c.id === id)?.name)
                    .join("、")
                }}
            </div>
            <div class="mt-3 mb-2" v-if="props.displayActionButton">
                <PostPlaceActionButton :place="place" :refetchExec="props.refetchPlaceFunc" />
            </div>
        </v-list-item>
    </v-list>
</template>
