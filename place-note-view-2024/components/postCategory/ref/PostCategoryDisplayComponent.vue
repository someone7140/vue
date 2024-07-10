<script setup lang="ts">
import type { PostCategoryResponse } from '~/gql/graphql';

const props = defineProps({
    categories: {
        type: Array as () => Array<PostCategoryResponse>,
        default: []
    },
    displayActionButton: {
        type: Boolean,
        default: false
    },
    displayCheck: {
        type: Boolean,
        default: false
    },
    checkedCategoryIds: {
        type: Array as () => Array<string>,
        default: []
    },
    updateCategoryIdsFunc: {
        type: Function,
        default: () => { }
    },
    refetchCategoryFunc: {
        type: Function,
        default: () => { }
    },
})

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

const checkedCategoryIdsRef = ref(props.checkedCategoryIds);
watch(checkedCategoryIdsRef, (val) => {
    props.updateCategoryIdsFunc(val)
})

</script>

<template>
    <v-list lines="two" max-width="500px">
        <v-list-item v-for="parentCategory in getRootCategoryList(props.categories)" :key="parentCategory.id">
            <v-list-item-tile>
                <v-row class="align-center ml-2" v-if="displayCheck">
                    <v-checkbox :value="parentCategory.id" v-model="checkedCategoryIdsRef" hide-details></v-checkbox>
                    <div class="text-h5 text-wrap">{{ parentCategory.name }}</div>
                </v-row>
                <div v-else class="text-h5 text-wrap">{{ parentCategory.name }}</div>
            </v-list-item-tile>
            <v-list-item-subtitle class="text-pre-wrap ml-4" style="-webkit-line-clamp:10; overflow-wrap:anywhere">
                {{ parentCategory.memo }}
            </v-list-item-subtitle>
            <div class="mt-3 mb-2" v-if="props.displayActionButton">
                <PostCategoryActionButton :postCategory="parentCategory" :refetchExec="props.refetchCategoryFunc" />
            </div>
            <v-list lines="one" max-width="450px" class="ml-2">
                <v-list-item v-for="childCategory in getChildrenCategory(props.categories, parentCategory.id)"
                    :key="childCategory.id">
                    <v-list-item-tile>
                        <v-row class="align-center ml-2" v-if="displayCheck">
                            <v-checkbox :value="childCategory.id" v-model="checkedCategoryIdsRef"
                                hide-details></v-checkbox>
                            <div class="text-h6 text-wrap text-teal-darken-4"> {{ childCategory.name }}</div>
                        </v-row>
                        <div v-else class="text-h6 text-wrap text-teal-darken-4"> {{ childCategory.name }}</div>
                    </v-list-item-tile>
                    <v-list-item-subtitle class="text-pre-wrap ml-4"
                        style="-webkit-line-clamp:10; overflow-wrap:anywhere">
                        {{
                            childCategory.memo
                        }}</v-list-item-subtitle>
                    <div class="mt-3 mb-2" v-if="props.displayActionButton">
                        <PostCategoryActionButton :postCategory="childCategory"
                            :refetchExec="props.refetchCategoryFunc" />
                    </div>
                </v-list-item>
            </v-list>
        </v-list-item>
    </v-list>
</template>
