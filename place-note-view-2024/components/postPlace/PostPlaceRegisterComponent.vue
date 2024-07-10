<script setup lang="ts">
import type { AddPostPlaceMutation, AddPostPlaceMutationVariables, LatLonInput } from '~/gql/graphql';
import { addPostPlaceMutationDocument } from '~/query/postPlaceQuery';

const { mutate: addPostPlaceMutate } = useMutation<AddPostPlaceMutation>(addPostPlaceMutationDocument, {
    errorPolicy: 'all',
})
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
        urlList: submitData.urlList ?? [],
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
        navigateTo(`/postCategory/list`)
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
    <PostPlaceInputComponent :submitFunc="submitAddPlace" :disabledButton="loading" />
</template>
