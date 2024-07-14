<script setup lang="ts">
import type { GetPostPlacesAndCategoriesQuery } from '~/gql/graphql';
import { getPostPlacesAndCategoriesQueryDocument } from '~/query/postPlaceQuery';

const { result: placesAndCategories, loading: placesAndCategoriesLoading, refetch: refetchPlacesAndCategories } = useQuery<GetPostPlacesAndCategoriesQuery>(getPostPlacesAndCategoriesQueryDocument, {
    errorPolicy: 'all',
    nameFilter: null
}, { fetchPolicy: 'network-only', })

</script>

<template>
    <div v-if="placesAndCategoriesLoading">
        <LoadingComponent />
    </div>
    <div v-if="!placesAndCategoriesLoading">
        <PostPlaceDisplayComponent :places="placesAndCategories?.getPostPlaces ?? []"
            :categories="placesAndCategories?.getMyPostCategories ?? []" :displayActionButton="true"
            :refetchPlaceFunc="refetchPlacesAndCategories" />
    </div>
</template>
