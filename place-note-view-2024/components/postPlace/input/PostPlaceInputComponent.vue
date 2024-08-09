<script setup lang="ts">
import type { PostCategoryObjFragment, PostPlaceResponse } from '~/gql/graphql';

const props = defineProps({
    submitFunc: {
        type: Function,
        default: (_: PostCategoryInputForm) => { }
    },
    disabledButton: {
        type: Boolean,
        default: false
    },
    categories: {
        type: Array as () => Array<PostCategoryObjFragment>,
        default: []
    },
    postPlace: {
        type: Object as () => PostPlaceResponse,
        default: undefined
    }
})

const postPlaceInputFormState = ref<PostPlaceInputForm>(props.postPlace ? {
    valid: false,
    name: props.postPlace.name,
    address: props.postPlace.address ?? undefined,
    categoryIdList: props.postPlace.categoryIdList ?? [],
    detail: props.postPlace.detail ?? undefined,
    url: props.postPlace.url ?? undefined,
} : { valid: false })

const { requiredValidation } = commonInput()

const submitPlace = () => {
    if (postPlaceInputFormState.value.valid) {
        props.submitFunc(postPlaceInputFormState.value)
    }
}

const listPageTransfer = () => {
    navigateTo(`/postPlace/list`)
}

const updateCategoryIds = (categoryIdList: string[]) => {
    postPlaceInputFormState.value.categoryIdList = categoryIdList
}

</script>

<template>
    <v-form v-model="postPlaceInputFormState.valid" validate-on="blur" @submit.prevent="submitPlace">
        <v-sheet min-width="300px">
            <v-text-field v-model="postPlaceInputFormState.name" :rules="[requiredValidation]">
                <template v-slot:label>
                    名前<span class="text-red"> *</span>
                </template>
            </v-text-field>
            <v-text-field v-model="postPlaceInputFormState.address">
                <template v-slot:label>
                    住所
                </template>
            </v-text-field>
            <div class="mb-1">カテゴリー設定</div>
            <div v-if="categories.length > 0">
                <PostCategorySelectDialogComponent :categories="categories"
                    :checkedCategoryIds="postPlaceInputFormState.categoryIdList"
                    :updateCategoryIdsFunc="updateCategoryIds" />
                <div>
                    <v-list lines="one" max-width="500px">
                        <v-list-item v-for="categoryId in postPlaceInputFormState.categoryIdList" :key="categoryId"
                            class="text-pre-wrap" style="-webkit-line-clamp:10; overflow-wrap:anywhere">
                            {{ categories.find(c => c.id === categoryId)?.name }}
                        </v-list-item>
                    </v-list>
                </div>
            </div>
            <div class="mb-2" v-else>
                登録されているカテゴリーはありません
            </div>
            <v-text-field v-model="postPlaceInputFormState.url">
                <template v-slot:label>
                    参考URL
                </template>
            </v-text-field>
            <v-textarea label="詳細" rows="3" v-model="postPlaceInputFormState.detail" />
            <div class="d-flex justify-center">
                <v-btn type="submit" class="bg-light-blue-darken-1 text-black" @disabled="props.disabledButton">
                    {{ postPlace ? "編集" : "登録" }}
                </v-btn>
                <v-btn class="bg-blue-grey-lighten-4 text-black ml-6" @click="listPageTransfer">
                    一覧へ
                </v-btn>
            </div>
        </v-sheet>
    </v-form>
</template>
