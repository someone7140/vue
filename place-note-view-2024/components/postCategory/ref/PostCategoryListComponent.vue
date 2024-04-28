<script setup lang="ts">
import type { GetMyPostCategoriesQuery, PostCategoryResponse } from '~/gql/graphql';
import { getMyPostCategoriesQueryDocument } from '~/query/postCategoryQuery';

const props = defineProps({
    displayActionButton: {
        type: Boolean,
        default: true
    },
})

const { result: categories, loading: getMyPostCategoriesLoading, refetch: refetchCategories } = useQuery<GetMyPostCategoriesQuery>(getMyPostCategoriesQueryDocument, {
    errorPolicy: 'all',
    nameFilter: null
}, { fetchPolicy: 'network-only', })

const getRootCategoryList = (categoryList: PostCategoryResponse[]) => {
    return (
        categoryList.filter(
            (child) => !categoryList.some((parent) => child.parentCategoryId === parent.id)
        ) ?? []
    );
}

const getChildrenCategory = (categoryList: PostCategoryResponse[], parentId: string) => {
    return categoryList.filter((child) => child.parentCategoryId === parentId);
}

</script>

<template>
    <div v-if="getMyPostCategoriesLoading">
        <LoadingComponent />
    </div>
    <div v-if="!getMyPostCategoriesLoading">
        <v-list lines="two" max-width="500px">
            <v-list-item v-for="parentCategory in getRootCategoryList(categories?.getMyPostCategories ?? [])"
                :key="parentCategory.id">
                <v-list-item-tile class="text-h5 text-wrap">{{ parentCategory.name }}</v-list-item-tile>
                <v-list-item-subtitle class="text-pre-wrap" style="-webkit-line-clamp:10; overflow-wrap:anywhere"> {{
                    parentCategory.memo
                    }}</v-list-item-subtitle>
                <div class="mt-3 mb-2" v-if="props.displayActionButton">
                    <PostCategoryActionButton :postCategory="parentCategory" :refetchExec="refetchCategories" />
                </div>

                <v-list lines="one" max-width="450px" class="ml-2">
                    <v-list-item
                        v-for="childCategory in getChildrenCategory(categories?.getMyPostCategories ?? [], parentCategory.id)"
                        :key="childCategory.id">
                        <v-list-item-tile class="text-h6 text-wrap text-teal-darken-4">{{ childCategory.name
                            }}</v-list-item-tile>
                        <v-list-item-subtitle class="text-pre-wrap"
                            style="-webkit-line-clamp:10; overflow-wrap:anywhere">
                            {{
                                childCategory.memo
                            }}</v-list-item-subtitle>
                        <div class="mt-3 mb-2" v-if="props.displayActionButton">
                            <PostCategoryActionButton :postCategory="childCategory" :refetchExec="refetchCategories" />
                        </div>
                    </v-list-item>
                </v-list>
            </v-list-item>
        </v-list>
    </div>
</template>
