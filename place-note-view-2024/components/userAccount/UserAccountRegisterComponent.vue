<script setup lang="ts">
import { useSnackbarState } from '~/composables/globalState';

const snackbarState = useSnackbarState();

const setGoogleAuthToken = (token: string) => {
  snackbarState.value = {
    type: "info",
    message: "テストだよ2",
    active: true
  }
}

</script>

<template>
  <GoogleAuthComponent @setGoogleAuthToken="setGoogleAuthToken" />
  <v-btn class="bg-blue-lighten-3" @click="setGoogleAuthToken">test</v-btn>
</template>
