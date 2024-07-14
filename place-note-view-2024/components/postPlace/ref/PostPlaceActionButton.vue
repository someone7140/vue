<script setup lang="ts">
import type { PostPlaceResponse } from '~/gql/graphql';

const props = defineProps({
    place: {
        type: Object as () => PostPlaceResponse,
        default: undefined
    },
    refetchExec: {
        type: Function,
        default: () => { }
    }
})

const editPageTransfer = () => {
    navigateTo(`/postPlace/edit?placeId=${props.place?.id}`)
}

</script>

<template>
    <div class="d-flex justify-center">
        <v-btn class="bg-light-green-lighten-4 text-black mr-4" @click="editPageTransfer">
            編集
        </v-btn>
        <PostPlaceDeleteDialogComponent :postPlace="props.place" :refetchExec="props.refetchExec" />
    </div>
</template>
