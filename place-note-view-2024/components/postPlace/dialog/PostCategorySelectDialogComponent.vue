<script setup lang="ts">
import type { DeletePostCategoryMutation, DeletePostCategoryMutationVariables, PostCategoryResponse } from '~/gql/graphql';

const props = defineProps({
    categories: {
        type: Array as () => Array<PostCategoryResponse>,
        default: []
    },
    checkedCategoryIds: {
        type: Array as () => Array<string>,
        default: []
    },
    updateCategoryIdsFunc: {
        type: Function,
        default: () => { }
    },
})

const isOpenDialog = ref<boolean>(false)
const checkedCategoryIdsRef = ref(props.checkedCategoryIds)
watch(() => props.checkedCategoryIds, (val) => {
    checkedCategoryIdsRef.value = val
})

</script>

<template>
    <v-btn class="bg-teal-lighten-4 text-black ml-2" @click="isOpenDialog = true">
        カテゴリー選択
    </v-btn>
    <v-dialog v-model="isOpenDialog" width="auto" min-width="300px">
        <PostCategoryDisplayComponent :categories="categories" :displayCheck="true"
            :checkedCategoryIds="checkedCategoryIdsRef" :updateCategoryIdsFunc="props.updateCategoryIdsFunc" />
        <div class="d-flex justify-center w-100 mt-3">
            <v-btn class="text-black bg-blue-grey-lighten-4" text="閉じる" @click="isOpenDialog = false"></v-btn>
        </div>
    </v-dialog>
</template>
