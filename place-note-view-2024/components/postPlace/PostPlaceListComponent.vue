<script setup lang="ts">
import type { PostPlaceListActionCategoryType } from '~/components/postPlace/const/postPlaceConst';
import { POST_PLACE_LIST_ACTION_CATEGORY } from '~/components/postPlace/const/postPlaceConst';
import type { GetPostPlacesAndCategoriesQuery } from '~/gql/graphql';
import { getPostPlacesAndCategoriesQueryDocument } from '~/query/postPlaceQuery';

const props = defineProps({
    actionType: {
        type: Object as () => PostPlaceListActionCategoryType,
        default: POST_PLACE_LIST_ACTION_CATEGORY.None
    },
})

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
            :categories="placesAndCategories?.getMyPostCategories ?? []" :actionType="props.actionType"
            :refetchPlaceFunc="refetchPlacesAndCategories" />
    </div>
</template>
