<script setup lang="ts">
import type { AddPostMutation, AddPostMutationVariables, GetPostPlacesAndCategoriesQuery } from '~/gql/graphql';
import { getPostPlacesAndCategoriesQueryDocument } from '~/query/postPlaceQuery';
import { addPostMutationDocument } from '~/query/postQuery';

const props = defineProps({
    placeId: {
        type: String,
        required: true
    },
})

const { result: placeAndCategoryResult, loading: placeAndCategoryLoading } = useQuery<GetPostPlacesAndCategoriesQuery>(getPostPlacesAndCategoriesQueryDocument, {
    errorPolicy: 'all',
    idFilter: props.placeId
})
const { mutate: addPostMutate, loading: addPostMutateLoading } = useMutation<AddPostMutation>(addPostMutationDocument, {
    errorPolicy: 'all',
})
const snackbarState = useSnackbarState();

const submitAddPost = async (submitData: PostInputForm) => {
    const variables: AddPostMutationVariables = {
        title: submitData.title ?? "",
        placeId: submitData.placeId ?? "",
        visitedDate: submitData.visitedDate ?? new Date(),
        isOpen: !!submitData.isOpen,
        categoryIdList: submitData.categoryIdList ?? [],
        detail: submitData.detail,
        urlList: submitData.urlList?.filter(u => !!u) ?? [],
    }

    const addResult = await addPostMutate(variables)
    const result = addResult?.data?.addPost
    if (result) {
        snackbarState.value = {
            type: "info",
            message: "投稿を登録しました。",
            active: true
        }
        navigateTo(`/postCategory/list`)
    } else {
        snackbarState.value = {
            type: "error",
            message: "投稿の登録に失敗しました。",
            active: true
        }
    }
}

const selectPlaceTransfer = () => {
    navigateTo(`/postPlace/select`)
}

</script>

<template>
    <div v-if="placeAndCategoryLoading">
        <LoadingComponent />
    </div>
    <div v-if="placeAndCategoryResult?.getPostPlaces && placeAndCategoryResult.getPostPlaces.length > 0">
        <div class="d-flex justify-center ga-5 mt-2 mb-4">
            <v-sheet class="text-pre-wrap" max-width="250px">
                「{{ placeAndCategoryResult?.getPostPlaces[0].name }}」で投稿
            </v-sheet>
            <div><v-btn class=" bg-light-green-lighten-4 text-black mr-4" @click="selectPlaceTransfer">
                    場所を変更
                </v-btn>
            </div>
        </div>
        <PostInputComponent :submitFunc="submitAddPost" :disabledButton="addPostMutateLoading"
            :categories="placeAndCategoryResult?.getMyPostCategories"
            :postPlace="placeAndCategoryResult?.getPostPlaces[0]" :initialInput="{
                placeId: props.placeId,
                isOpen: false,
                categoryIdList: placeAndCategoryResult?.getPostPlaces[0].categoryIdList,
                visitedDate: new Date(new Date().toDateString())
            }" :editFlag="false" />
    </div>
    <div v-else>
        選択された場所がありません
    </div>
</template>
