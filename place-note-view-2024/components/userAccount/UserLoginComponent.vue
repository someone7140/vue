<script setup lang="ts">
import type { LoginByGoogleAuthCodeMutation, LoginByGoogleAuthCodeMutationVariables } from '~/gql/graphql';
import { loginByGoogleAuthCodeMutationDocument } from '~/query/accountUsersQuery';

const { mutate, loading } = useMutation<LoginByGoogleAuthCodeMutation>(loginByGoogleAuthCodeMutationDocument, {
  errorPolicy: 'all',
})
const snackbarState = useSnackbarState();

const afterGoogleAuthExec = async (code: string) => {
  if (code) {
    const variables: LoginByGoogleAuthCodeMutationVariables = { authCode: code }
    const verifyResult = await mutate(variables)
    const userData = verifyResult?.data?.loginByGoogleAuthCode
    if (userData) {
      await authSet(userData.token, userData.userSettingId, userData.name)
      snackbarState.value = {
        type: "info",
        message: "ログインしました",
        active: true
      }
      navigateTo("/");
    } else {
      snackbarState.value = {
        type: "error",
        message: "未登録のアカウントである可能性があります。",
        active: true
      }
    }
  }

}

</script>

<template>
  <GoogleAuthComponent :afterGoogleAuthExec="afterGoogleAuthExec" @disabledButton="loading.valueOf()" />
</template>
