<script setup lang="ts">
import { getPostPlacesAndCategoriesQueryDocument } from '~/query/postPlaceQuery';
import type { GetPostPlacesAndCategoriesQuery } from '~/gql/graphql';

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

const selectPlaceTransfer = () => {
    navigateTo(`/postPlace/select`)
}

</script>

<template>
    <div v-if="placeAndCategoryLoading">
        <LoadingComponent />
    </div>
    <div class="d-flex justify-center ga-5 mt-2"
        v-if="placeAndCategoryResult?.getPostPlaces && placeAndCategoryResult.getPostPlaces.length > 0">
        <div class="mt-1">「{{ placeAndCategoryResult?.getPostPlaces[0].name }}」で投稿
        </div>
        <div><v-btn class="bg-light-green-lighten-4 text-black mr-4" @click="selectPlaceTransfer">
                場所を変更
            </v-btn>
        </div>
    </div>
    <div v-else>
        選択された場所がありません
    </div>
</template>
