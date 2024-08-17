<script setup lang="ts">
import type { GetMyPostsQuery } from '~/gql/graphql';
import { getMyPostsQueryDocument } from '~/query/postQuery';

const { result: postsResult, loading: postsLoading, refetch: refetchPosts } = useQuery<GetMyPostsQuery>(getMyPostsQueryDocument, {
    errorPolicy: 'all',
    idFilter: null
})

const allPostLength = ref<number | undefined>(undefined)

watch(postsResult, (newVal) => {
    if (newVal && allPostLength.value == null) {
        allPostLength.value = newVal.getMyPosts.length
    }
})

</script>

<template>
    <div v-if="postsLoading">
        <LoadingComponent />
    </div>
    <div v-if="allPostLength != null">
        <div v-if="allPostLength > 0">
            <div v-for="post in postsResult?.getMyPosts ?? []">
                <div class="mb-3">
                    <PostDisplayComponent :post="post" :categories="postsResult?.getMyPostCategories"
                        :displayActionButton="true" :refetchPostFunc="refetchPosts" :myPostFlag="true" />
                </div>

            </div>
        </div>
        <div v-else>
            登録されている投稿はありません
        </div>
    </div>
</template>
