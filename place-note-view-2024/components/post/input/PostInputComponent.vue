<script setup lang="ts">
import type { PostCategoryResponse, PostPlaceResponse } from '~/gql/graphql';

const props = defineProps({
    submitFunc: {
        type: Function,
        default: (_: PostInputForm) => { }
    },
    disabledButton: {
        type: Boolean,
        default: false
    },
    categories: {
        type: Array as () => Array<PostCategoryResponse>,
        default: []
    },
    postPlace: {
        type: Object as () => PostPlaceResponse,
        default: undefined
    },
    initialInput: {
        type: Object as () => PostInputForm,
        default: undefined
    },
    editFlag: {
        type: Boolean,
        default: false
    },
})

const postInputFormState = ref<PostInputForm>(props.initialInput ? {
    valid: false,
    title: props.initialInput.title ?? undefined,
    placeId: props.initialInput.placeId ?? undefined,
    visitedDate: props.initialInput.visitedDate ?? undefined,
    isOpen: props.initialInput.isOpen ?? undefined,
    categoryIdList: props.initialInput.categoryIdList ?? [],
    detail: props.initialInput.detail ?? undefined,
    urlList: props.initialInput.urlList ?? [""],
} : { valid: false })

const visitedDateCalendarDisplay = ref(false)

const { requiredValidation } = commonInput()
const { getDisplayDate } = useCommonUtil()

const submitPost = () => {
    if (postInputFormState.value.valid) {
        props.submitFunc(postInputFormState.value)
    }
}

const updateCategoryIds = (categoryIdList: string[]) => {
    postInputFormState.value.categoryIdList = categoryIdList
}

const listPageTransfer = () => {
    navigateTo(`/postPlace/list`)
}

const addUrlList = () => {
    postInputFormState.value.urlList = [...(postInputFormState.value.urlList ?? []), ""]
}

const deleteUrlList = (index: number) => {
    postInputFormState.value.urlList = postInputFormState.value.urlList?.filter((_, i) => i != index) ?? []
}

</script>

<template>
    <v-form v-model="postInputFormState.valid" validate-on="blur" @submit.prevent="submitPost">
        <v-sheet min-width="300px">
            <v-text-field v-model="postInputFormState.title" :rules="[requiredValidation]">
                <template v-slot:label>
                    タイトル<span class="text-red"> *</span>
                </template>
            </v-text-field>
            <div class="d-flex align-center ga-4">
                <v-btn class="bg-teal-lighten-4 text-black"
                    @click="visitedDateCalendarDisplay = !visitedDateCalendarDisplay">
                    訪問日
                    <v-dialog v-model="visitedDateCalendarDisplay" max-width="350">
                        <v-locale-provider locale="ja">
                            <v-date-picker v-model="postInputFormState.visitedDate">
                                <template #actions>
                                    <v-btn color="info" @click="visitedDateCalendarDisplay = false">
                                        閉じる
                                    </v-btn>
                                </template>
                            </v-date-picker>
                        </v-locale-provider>
                    </v-dialog>
                </v-btn>
                <div>
                    {{ getDisplayDate(postInputFormState.visitedDate) }}
                </div>
            </div>
            <v-switch v-model="postInputFormState.isOpen" color="primary"
                :label="postInputFormState.isOpen ? `公開` : `非公開`"></v-switch>
            <div class="mb-1">カテゴリー設定</div>
            <div v-if="categories.length > 0">
                <PostCategorySelectDialogComponent :categories="categories"
                    :checkedCategoryIds="postInputFormState.categoryIdList"
                    :updateCategoryIdsFunc="updateCategoryIds" />
                <div class="mb-4 mt-3 ml-2">
                    <div class="text-pre-wrap" v-for="categoryId in postInputFormState.categoryIdList" :key="categoryId"
                        style="-webkit-line-clamp:10; overflow-wrap:anywhere">
                        {{ categories.find(c => c.id === categoryId)?.name }}
                    </div>
                </div>
            </div>
            <div class="mb-2" v-else>
                登録されているカテゴリーはありません
            </div>
            <div class="d-flex align-center ga-3 mb-3">
                <div>
                    URL
                </div>
                <div>
                    <v-btn class="bg-indigo-lighten-3 text-black" @click="addUrlList">
                        追加
                    </v-btn>
                </div>
                <div>
                    <v-icon>mdi-information-outline</v-icon>
                    <v-tooltip activator="parent" location="top">SNSやブログで投稿したURLを入力</v-tooltip>
                </div>
            </div>
            <div v-for="(url, index) in postInputFormState.urlList" :key="index">
                <div class="d-flex align-center ga-4">
                    <v-text-field v-model="postInputFormState.urlList![index]"></v-text-field>
                    <div class="mb-3">
                        <v-btn class="bg-blue-grey-lighten-4 text-black" @click="deleteUrlList(index)">
                            削除
                        </v-btn>
                    </div>
                </div>
            </div>
            <v-textarea label="詳細" rows="3" v-model="postInputFormState.detail" />
            <div class="d-flex justify-center mb-3">
                <v-btn type="submit" class="bg-light-blue-darken-1 text-black" @disabled="props.disabledButton">
                    {{ props.editFlag ? "編集" : "登録" }}
                </v-btn>
                <v-btn class="bg-blue-grey-lighten-4 text-black ml-6" @click="listPageTransfer">
                    一覧へ
                </v-btn>
            </div>
        </v-sheet>
    </v-form>
</template>
