<script setup lang="ts">
import type { DeletePostPlaceMutation, DeletePostPlaceMutationVariables, PostPlaceResponse } from '~/gql/graphql';
import { deletePostPlaceMutationDocument } from '~/query/postPlaceQuery';

const props = defineProps({
    postPlace: {
        type: Object as () => PostPlaceResponse,
        default: undefined
    },
    refetchExec: {
        type: Function,
        default: () => { }
    }
})

const snackbarState = useSnackbarState();
const isOpenDialog = ref<boolean>(false)
const { mutate, loading } = useMutation<DeletePostPlaceMutation>(deletePostPlaceMutationDocument, {
    errorPolicy: 'all',
})

const submitDeleteCategory = async () => {
    const variables: DeletePostPlaceMutationVariables = {
        id: props.postPlace?.id ?? ""
    }

    const result = await mutate(variables)

    isOpenDialog.value = false
    if (result?.data?.deletePostPlace) {
        snackbarState.value = {
            type: "info",
            message: "場所を削除しました。",
            active: true
        }
        props.refetchExec()
    } else {
        snackbarState.value = {
            type: "error",
            message: "削除に失敗しました。",
            active: true
        }
    }
}

</script>

<template>
    <v-btn class="bg-blue-grey-lighten-4 text-black" @click="isOpenDialog = true">
        削除
    </v-btn>
    <v-dialog v-model="isOpenDialog" width="auto">
        <v-card max-width="400" text="場所を削除します。問題なければ「削除する」を押してください。" :title="props.postPlace?.name">
            <template v-slot:actions>
                <div class="d-flex justify-end w-100">
                    <v-btn class="bg-pink-lighten-4 text-black" text="削除する" @click="submitDeleteCategory"
                        @disabled="loading"></v-btn>
                    <v-btn class="ml-4 text-black bg-blue-grey-lighten-4" text="キャンセル"
                        @click="isOpenDialog = false"></v-btn>
                </div>
            </template>
        </v-card>
    </v-dialog>
</template>
