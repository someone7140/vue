<script setup lang="ts">
import type { EditPostPlaceMutation, EditPostPlaceMutationVariables, GetPostPlacesAndCategoriesQuery, LatLonInput } from '~/gql/graphql';
import { editPostPlaceMutationDocument, getPostPlacesAndCategoriesQueryDocument } from '~/query/postPlaceQuery';

const props = defineProps({
    placeId: {
        type: String,
        required: true
    },
})

const { mutate: editPostPlaceMutate } = useMutation<EditPostPlaceMutation>(editPostPlaceMutationDocument, {
    errorPolicy: 'all',
})

const { result: placeAndCategoryResult, loading: placeAndCategoryLoading } = useQuery<GetPostPlacesAndCategoriesQuery>(getPostPlacesAndCategoriesQueryDocument, {
    errorPolicy: 'all',
    idFilter: props.placeId
})

const snackbarState = useSnackbarState();
const { getAddressInfo } = useGeolocationService();
const loading = ref(false)

const submitEditPlace = async (submitData: PostPlaceInputForm) => {
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

    const variables: EditPostPlaceMutationVariables = {
        id: props.placeId,
        name: submitData.name ?? "",
        address: submitData.address ?? null,
        categoryIdList: submitData.categoryIdList ?? [],
        detail: submitData.detail ?? null,
        url: submitData.url,
        latLon: latLon ?? null,
        prefectureCode: prefectureCode ?? null
    }

    const editResult = await editPostPlaceMutate(variables)
    const result = editResult?.data?.editPostPlace
    if (result) {
        snackbarState.value = {
            type: "info",
            message: "場所を編集しました。",
            active: true
        }
    } else {
        snackbarState.value = {
            type: "error",
            message: "場所の編集に失敗しました。",
            active: true
        }
    }
    loading.value = false
}

</script>

<template>
    <div v-if="placeAndCategoryLoading">
        <LoadingComponent />
    </div>
    <div v-if="!placeAndCategoryLoading">
        <PostPlaceInputComponent :submitFunc="submitEditPlace" :disabledButton="loading"
            :categories="placeAndCategoryResult?.getMyPostCategories" :postPlace="placeAndCategoryResult?.getPostPlaces &&
                placeAndCategoryResult?.getPostPlaces?.length > 0 ?
                placeAndCategoryResult.getPostPlaces[0] : undefined" />
    </div>
</template>
