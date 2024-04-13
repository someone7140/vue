<script setup lang="ts">
import { googleAuthCodeLogin } from "vue3-google-login"
import type { GoogleAuthCodeVerifyMutation } from "~/gql/graphql";
import { googleAuthCodeVerifyMutationDocument } from "~/query/accountUsersQuery";


const props = defineProps({
  setGoogleAuthToken: {
    type: Function,
    default: (_: string) => { }
  }
})

const { mutate, loading } = useMutation<GoogleAuthCodeVerifyMutation>(googleAuthCodeVerifyMutationDocument)

const googleAuth = () => {
  googleAuthCodeLogin().then(async (response) => {
    const verifyResult = await mutate({ authCode: response.code })
    const authToken = verifyResult?.data?.googleAuthCodeVerify?.token
    if (authToken) {
      props.setGoogleAuthToken(authToken)
    } else {

    }
  })
}
</script>

<template>
  <v-btn class="bg-blue-lighten-3" @click="googleAuth" @disabled="loading">Googleログイン</v-btn>
</template>
