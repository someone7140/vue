<script setup lang="ts">
import { commonInput } from '~/composables/form/commonInput';
import { type PostCategoryInputForm } from '~/composables/form/postCategoryInput';
import type { GetMyPostCategoriesQuery } from '~/gql/graphql';
import { getMyPostCategoriesQueryDocument } from '~/query/postCategoryQuery';

const props = defineProps({
    submitFunc: {
        type: Function,
        default: (_: PostCategoryInputForm) => { }
    },
    disabledButton: {
        type: Boolean,
        default: false
    }
})
const postCategoryInputFormState = ref<PostCategoryInputForm>({})
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
                        :items="categories.getMyPostCategories.filter(c => !c.parentCategoryId)" item-title="name"
                        item-value="id" label="親カテゴリー" clearable></v-select>
                </div>
                <v-text-field v-model="postCategoryInputFormState.displayOrder" :rules="[numberValidation]">
                    <template v-slot:label>
                        表示順（数値）
                    </template>
                </v-text-field>
                <v-textarea label="メモ" rows="3" v-model="postCategoryInputFormState.memo" />
                <v-btn type="submit" class="bg-light-blue-darken-1 text-black" @disabled="props.disabledButton">
                    登録
                </v-btn>
            </v-sheet>
        </v-form>
    </div>
</template>
