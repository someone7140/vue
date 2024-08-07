<script setup lang="ts">
import { POST_PLACE_ADD_AFTER_PAGE } from '~/components/postPlace/const/postPlaceConst';

const selectPlaceTransfer = () => {
    navigateTo(`/postPlace/select`)
}

const addPlaceTransfer = () => {
    navigateTo(`/postPlace/add?addAfter=${POST_PLACE_ADD_AFTER_PAGE.AddPost}`)
}

</script>

<template>
    <div class="d-flex justify-center mb-7 mt-6">
        <v-btn width="200px" height="50px" class="bg-light-green-lighten-4 text-black" @click="selectPlaceTransfer">
            場所を選択して投稿
        </v-btn>
    </div>
    <div class="d-flex justify-center">
        <v-btn width="200px" height="50px" class="bg-light-green-lighten-4 text-black" @click="addPlaceTransfer">
            場所から追加
        </v-btn>
    </div>
</template>
