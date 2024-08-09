<script setup lang="ts">
import { POST_PLACE_ADD_AFTER_PAGE, type PostPlaceAddAfterPage } from '~/components/postPlace/const/postPlaceConst';
import type { AddPostPlaceMutation, AddPostPlaceMutationVariables, GetMyPostCategoriesQuery, LatLonInput } from '~/gql/graphql';
import { getMyPostCategoriesQueryDocument } from '~/query/postCategoryQuery';
import { addPostPlaceMutationDocument } from '~/query/postPlaceQuery';

const props = defineProps({
    afterPage: {
        type: Object as () => PostPlaceAddAfterPage,
        default: POST_PLACE_ADD_AFTER_PAGE.PlaceList
    },
})

const { mutate: addPostPlaceMutate } = useMutation<AddPostPlaceMutation>(addPostPlaceMutationDocument, {
    errorPolicy: 'all',
})
const { result: categories, loading: categoryLoading } = useQuery<GetMyPostCategoriesQuery>(getMyPostCategoriesQueryDocument, {
    errorPolicy: 'all',
    nameFilter: null
}, { fetchPolicy: 'network-only', })

const snackbarState = useSnackbarState();
const { getAddressInfo } = useGeolocationService();
const loading = ref(false)

const submitAddPlace = async (submitData: PostPlaceInputForm) => {
    loading.value = true
    // 住所から緯度経度と都道府県コードを取得
    let latLon: LatLonInput | undefined = undefined
    let prefectureCode: string | undefined = undefined
    if (submitData.address) {
        const addressInfo = await getAddressInfo(submitData.address)
        if (addressInfo?.latLon) {
            latLon = {
                lat: addressInfo.latLon.lat,
                lon: addressInfo.latLon.lon,
            }

        }
        prefectureCode = addressInfo?.prefectureCode
    }

    const variables: AddPostPlaceMutationVariables = {
        name: submitData.name ?? "",
        address: submitData.address ?? null,
        categoryIdList: submitData.categoryIdList ?? [],
        detail: submitData.detail ?? null,
        url: submitData.url,
        latLon: latLon ?? null,
        prefectureCode: prefectureCode ?? null
    }

    const addResult = await addPostPlaceMutate(variables)
    const result = addResult?.data?.addPostPlace
    if (result) {
        snackbarState.value = {
            type: "info",
            message: "場所を登録しました。",
            active: true
        }
        props.afterPage === POST_PLACE_ADD_AFTER_PAGE.AddPost ?
            navigateTo(`/post/add?placeId=${result}`)
            : navigateTo(`/postPlace/list`)
    } else {
        snackbarState.value = {
            type: "error",
            message: "場所の登録に失敗しました。",
            active: true
        }
    }
    loading.value = false
}

</script>

<template>
    <div v-if="categoryLoading">
        <LoadingComponent />
    </div>
    <div v-if="!categoryLoading">
        <PostPlaceInputComponent :submitFunc="submitAddPlace" :disabledButton="loading"
            :categories="categories?.getMyPostCategories" />
    </div>
</template>
