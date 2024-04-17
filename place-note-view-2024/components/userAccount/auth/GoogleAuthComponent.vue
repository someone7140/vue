<script setup lang="ts">
import { googleAuthCodeLogin } from "vue3-google-login"

const props = defineProps({
  afterGoogleAuthExec: {
    type: Function,
    default: (_: string) => { }
  },
  disabledButton: {
    type: Boolean,
    default: false
  }
})

const googleAuth = () => {
  googleAuthCodeLogin().then(async (response) => {
    props.afterGoogleAuthExec(response.code)
  })
}
</script>

<template>
  <v-btn class="bg-blue-lighten-3" @click="googleAuth" @disabled="props.disabledButton">Googleログイン</v-btn>
</template>
