<script setup lang="ts">
import type { PostCategoryInputForm } from '~/composables/form/postCategoryInput';
import type { AddPostCategoryMutation, AddPostCategoryMutationVariables } from '~/gql/graphql';
import { addPostCategoryMutationDocument } from '~/query/postCategoryQuery';

const { mutate: addPostCategoryMutate, loading: addPostCategoryLoading } = useMutation<AddPostCategoryMutation>(addPostCategoryMutationDocument, {
    errorPolicy: 'all',
})
const snackbarState = useSnackbarState();

const submitAddCategory = async (submitData: PostCategoryInputForm) => {
    let displayOrder = null
    if (submitData.displayOrder) {
        displayOrder = parseInt(submitData.displayOrder ?? "")
    }
    const variables: AddPostCategoryMutationVariables = {
        name: submitData.name ?? "",
        parentCategoryId: submitData.parentCategoryId ?? null,
        displayOrder: displayOrder,
        memo: submitData.memo ?? null,
    }

    const addResult = await addPostCategoryMutate(variables)
    const result = addResult?.data?.addPostCategory
    if (result) {
        snackbarState.value = {
            type: "info",
            message: "カテゴリーを登録しました。",
            active: true
        }
        navigateTo(`/postCategory/list`)
    } else {
        snackbarState.value = {
            type: "error",
            message: "カテゴリーの登録に失敗しました。",
            active: true
        }
    }
}

</script>

<template>
    <PostCategoryInputComponent :submitFunc="submitAddCategory" :disabledButton="addPostCategoryLoading.valueOf()" />
</template>
