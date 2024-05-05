<script setup lang="ts">
import type { EditPostCategoryMutation, EditPostCategoryMutationVariables, GetMyPostCategoryByIdQuery } from '~/gql/graphql';
import { editPostCategoryMutationDocument, getMyPostCategoryByIdQueryDocument } from '~/query/postCategoryQuery';

const props = defineProps({
    categoryId: {
        type: String,
    },
})

const { mutate: editPostCategoryMutate, loading: editPostCategoryLoading } = useMutation<EditPostCategoryMutation>(editPostCategoryMutationDocument, {
    errorPolicy: 'all',
})

const { result: categoryResult, loading: categoryLoading } = useQuery<GetMyPostCategoryByIdQuery>(getMyPostCategoryByIdQueryDocument, {
    errorPolicy: 'all',
    idFilter: props.categoryId
})

const snackbarState = useSnackbarState();

const submitEditCategory = async (submitData: PostCategoryInputForm) => {
    let displayOrder = null
    if (submitData.displayOrder) {
        displayOrder = parseInt(submitData.displayOrder ?? "")
    }
    const variables: EditPostCategoryMutationVariables = {
        id: props.categoryId ?? "",
        name: submitData.name ?? "",
        parentCategoryId: submitData.parentCategoryId ?? null,
        displayOrder: displayOrder,
        memo: submitData.memo ?? null,
    }

    const editResult = await editPostCategoryMutate(variables)
    const result = editResult?.data?.editPostCategory
    if (result) {
        snackbarState.value = {
            type: "info",
            message: "カテゴリーを編集しました。",
            active: true
        }
    } else {
        snackbarState.value = {
            type: "error",
            message: "カテゴリーの編集に失敗しました。",
            active: true
        }
    }
}

</script>

<template>
    <div v-if="categoryLoading">
        <LoadingComponent />
    </div>
    <div v-if="!categoryLoading">
        <PostCategoryInputComponent :submitFunc="submitEditCategory" :disabledButton="editPostCategoryLoading"
            :postCategory="categoryResult?.getMyPostCategoryById" />
    </div>
</template>
