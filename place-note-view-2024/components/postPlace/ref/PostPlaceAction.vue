<script setup lang="ts">
import type { PostPlaceListActionCategoryType } from '~/components/postPlace/const/postPlaceConst';
import { POST_PLACE_LIST_ACTION_CATEGORY } from '~/components/postPlace/const/postPlaceConst';
import type { PostPlaceResponse } from '~/gql/graphql';

const props = defineProps({
    place: {
        type: Object as () => PostPlaceResponse,
        default: undefined
    },
    refetchExec: {
        type: Function,
        default: () => { }
    },
    actionType: {
        type: Object as () => PostPlaceListActionCategoryType,
        default: POST_PLACE_LIST_ACTION_CATEGORY.None
    },
})

const editPageTransfer = () => {
    navigateTo(`/postPlace/edit?placeId=${props.place?.id}`)
}

const afterSelectPageTransfer = () => {
    navigateTo(`/post/add?placeId=${props.place?.id}`)
}

</script>

<template>
    <div class="mt-2">
        <div class="d-flex justify-center" v-if="props.actionType === POST_PLACE_LIST_ACTION_CATEGORY.Modify">
            <v-btn class="bg-light-green-lighten-4 text-black mr-4" @click="editPageTransfer">
                編集
            </v-btn>
            <PostPlaceDeleteDialogComponent :postPlace="props.place" :refetchExec="props.refetchExec" />
        </div>
        <div class="d-flex justify-center" v-if="props.actionType === POST_PLACE_LIST_ACTION_CATEGORY.Select">
            <v-btn class="bg-light-green-lighten-4 text-black mr-4" @click="afterSelectPageTransfer">
                選択
            </v-btn>
        </div>
    </div>
</template>
