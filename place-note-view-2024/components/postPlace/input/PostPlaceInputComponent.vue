<script setup lang="ts">

const props = defineProps({
    submitFunc: {
        type: Function,
        default: (_: PostCategoryInputForm) => { }
    },
    disabledButton: {
        type: Boolean,
        default: false
    },
})
const postPlaceInputFormState = ref<PostPlaceInputForm>({
    valid: false,
})

const { requiredValidation, numberValidation } = commonInput()

const submitPlace = () => {
    if (postPlaceInputFormState.value.valid) {
        props.submitFunc(postPlaceInputFormState.value)
    }
}

const listPageTransfer = () => {
    navigateTo(`/postCategory/list`)
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
            <v-textarea label="詳細" rows="3" v-model="postPlaceInputFormState.detail" />
            <div class="d-flex justify-center">
                <v-btn type="submit" class="bg-light-blue-darken-1 text-black" @disabled="props.disabledButton">
                    登録
                </v-btn>
                <v-btn class="bg-blue-grey-lighten-4 text-black ml-6" @click="listPageTransfer">
                    一覧へ
                </v-btn>
            </div>
        </v-sheet>
    </v-form>
</template>
