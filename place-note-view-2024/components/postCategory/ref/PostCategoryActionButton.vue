<script setup lang="ts">
import type { PostCategoryResponse } from '~/gql/graphql';

const props = defineProps({
    postCategory: {
        type: Object as () => PostCategoryResponse,
        default: undefined
    },
    refetchExec: {
        type: Function,
        default: () => { }
    }
})

const editPageTransfer = () => {
    navigateTo(`/postCategory/edit?categoryId=${props.postCategory?.id}`)
}

</script>

<template>
    <div class="d-flex justify-center">
        <v-btn class="bg-light-green-lighten-4 text-black mr-4" @click="editPageTransfer">
            編集
        </v-btn>
        <PostCategoryDeleteDialogComponent :postCategory="props.postCategory" :refetchExec="props.refetchExec" />
    </div>
</template>
