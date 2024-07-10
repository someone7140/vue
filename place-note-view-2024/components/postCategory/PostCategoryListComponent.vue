<script setup lang="ts">
import type { GetMyPostCategoriesQuery } from '~/gql/graphql';
import { getMyPostCategoriesQueryDocument } from '~/query/postCategoryQuery';

const { result: categories, loading: getMyPostCategoriesLoading, refetch: refetchCategories } = useQuery<GetMyPostCategoriesQuery>(getMyPostCategoriesQueryDocument, {
    errorPolicy: 'all',
    nameFilter: null
}, { fetchPolicy: 'network-only', })

</script>

<template>
    <div v-if="getMyPostCategoriesLoading">
        <LoadingComponent />
    </div>
    <div v-if="!getMyPostCategoriesLoading">
        <PostCategoryDisplayComponent :categories="categories?.getMyPostCategories" :displayActionButton="true"
            :refetchCategoryFunc="refetchCategories" />
    </div>
</template>
