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

const nameFilter = ref<string | undefined>(undefined)
const allPlaceLength = ref<number | undefined>(undefined)

const { result: placesAndCategories, refetch: refetchPlacesAndCategories } = useQuery<GetPostPlacesAndCategoriesQuery>(getPostPlacesAndCategoriesQueryDocument, {
    errorPolicy: 'all',
    nameFilter: undefined
}, { fetchPolicy: 'network-only', })

const onClickFilter = () => {
    refetchPlacesAndCategories({ nameFilter: nameFilter.value })
}

watch(placesAndCategories, (newVal) => {
    if (newVal && allPlaceLength.value == null) {
        allPlaceLength.value = newVal.getPostPlaces.length
    }
})

</script>

<template>
    <div v-if="allPlaceLength == null">
        <LoadingComponent />
    </div>
    <div v-if="allPlaceLength != null">
        <div v-if="allPlaceLength > 0">
            <div class="d-flex ga-3">
                <div>
                    <v-text-field width="200px" v-model="nameFilter" clearable @click:clear="onClickFilter">
                        <template v-slot:label>
                            場所名
                        </template>
                    </v-text-field>
                </div>
                <div class="mt-2">
                    <v-btn class="bg-blue-lighten-4 text-black" @click="onClickFilter">
                        絞り込み
                    </v-btn>
                </div>
            </div>
            <v-list lines="two" max-width="500px" v-if="(placesAndCategories?.getPostPlaces ?? []).length > 0">
                <v-list-item v-for="place in placesAndCategories?.getPostPlaces ?? []" :key="place.id">
                    <v-list-item-tile>
                        <div class="text-h5 text-wrap">{{ place.name }}</div>
                    </v-list-item-tile>
                    <v-list-item-subtitle class="text-pre-wrap ml-4"
                        style="-webkit-line-clamp:10; overflow-wrap:anywhere">
                        {{ place.detail }}
                    </v-list-item-subtitle>
                    <div class="mt-2 text-pre-wrap" v-if="!!place.address">
                        {{ place.address }}
                    </div>
                    <div class="mt-2 text-pre-wrap" v-if="place.categoryIdList.length > 0">
                        {{ place.categoryIdList
                            .map(id => placesAndCategories?.getMyPostCategories.find(c => c.id === id)?.name)
                            .join("、")
                        }}
                    </div>
                    <PostPlaceAction :place="place" :refetchExec="refetchPlacesAndCategories"
                        :actionType="props.actionType" />
                </v-list-item>
            </v-list>
            <div v-else>
                指定した条件の場所はありません
            </div>
        </div>
        <div v-else>
            登録されている場所はありません
        </div>
    </div>
</template>
