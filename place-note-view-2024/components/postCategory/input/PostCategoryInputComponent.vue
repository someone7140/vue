<script setup lang="ts">
import { getMyPostCategoriesQueryDocument } from '~/query/postCategoryQuery';
import type { GetMyPostCategoriesQuery, PostCategoryObjFragment } from '~/gql/graphql';

const props = defineProps({
    submitFunc: {
        type: Function,
        default: (_: PostCategoryInputForm) => { }
    },
    disabledButton: {
        type: Boolean,
        default: false
    },
    postCategory: {
        type: Object as () => PostCategoryObjFragment,
        default: undefined
    }
})
const postCategoryInputFormState = ref<PostCategoryInputForm>(props.postCategory ? {
    valid: false,
    name: props.postCategory.name,
    parentCategoryId: props.postCategory.parentCategoryId ?? undefined,
    displayOrder: props.postCategory.displayOrder?.toString() ?? undefined,
    memo: props.postCategory.memo ?? undefined,
} : { valid: false })

const { requiredValidation, numberValidation } = commonInput()

const { result: categories, loading: getMyPostCategoriesLoading } = useQuery<GetMyPostCategoriesQuery>(getMyPostCategoriesQueryDocument, {
    errorPolicy: 'all',
    nameFilter: null
})

const submitCategory = () => {
    if (postCategoryInputFormState.value.valid) {
        props.submitFunc(postCategoryInputFormState.value)
    }
}

const listPageTransfer = () => {
    navigateTo(`/postCategory/list`)
}

</script>

<template>
    <div v-if="getMyPostCategoriesLoading">
        <LoadingComponent />
    </div>
    <div v-if="!getMyPostCategoriesLoading">
        <v-form v-model="postCategoryInputFormState.valid" validate-on="blur" @submit.prevent="submitCategory">
            <v-sheet min-width="300px">
                <v-text-field v-model="postCategoryInputFormState.name" :rules="[requiredValidation]">
                    <template v-slot:label>
                        名前<span class="text-red"> *</span>
                    </template>
                </v-text-field>
                <div v-if="categories?.getMyPostCategories && categories.getMyPostCategories.length > 0">
                    <v-select v-model="postCategoryInputFormState.parentCategoryId"
                        :items="categories.getMyPostCategories.filter(c => !c.parentCategoryId && c.id !== props.postCategory?.id)"
                        item-title="name" item-value="id" label="親カテゴリー" clearable></v-select>
                </div>
                <v-text-field v-model="postCategoryInputFormState.displayOrder" :rules="[numberValidation]">
                    <template v-slot:label>
                        表示順（数値）
                    </template>
                </v-text-field>
                <v-textarea label="メモ" rows="3" v-model="postCategoryInputFormState.memo" />
                <div class="d-flex justify-center">
                    <v-btn type="submit" class="bg-light-blue-darken-1 text-black" @disabled="props.disabledButton">
                        {{ props.postCategory ? "編集" : "登録" }}
                    </v-btn>
                    <v-btn class="bg-blue-grey-lighten-4 text-black ml-6" @click="listPageTransfer">
                        一覧へ
                    </v-btn>
                </div>
            </v-sheet>
        </v-form>
    </div>
</template>
