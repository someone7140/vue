<script setup lang="ts">
import type { UserAccountInputForm } from '~/composables/form/userAccountInput';
import type { AddAccountUserByGoogleMutation, AddAccountUserByGoogleMutationVariables, GoogleAuthCodeVerifyMutation, GoogleAuthCodeVerifyMutationVariables } from '~/gql/graphql';
import { addAccountUserByGoogleMutationDocument, googleAuthCodeVerifyMutationDocument } from '~/query/accountUsersQuery';

const snackbarState = useSnackbarState();

const { mutate: authCodeVerifyMutate, loading: authCodeVerifyLoading } = useMutation<GoogleAuthCodeVerifyMutation>(googleAuthCodeVerifyMutationDocument, {
  errorPolicy: 'all',
})
const googleAuthToken = ref<String | undefined>(undefined)

const { mutate: addAccountUserByGoogleMutate, loading: addAccountUserByGoogleLoading } = useMutation<AddAccountUserByGoogleMutation>(addAccountUserByGoogleMutationDocument, {
  errorPolicy: 'all',
})

const afterGoogleAuthExec = async (code: string) => {
  if (code) {
    const variables: GoogleAuthCodeVerifyMutationVariables = { authCode: code }
    const verifyResult = await authCodeVerifyMutate(variables)
    const authToken = verifyResult?.data?.googleAuthCodeVerify?.token
    if (authToken) {
      googleAuthToken.value = authToken
    } else {
      snackbarState.value = {
        type: "error",
        message: "登録済みのアカウントである可能性があります。",
        active: true
      }
    }
  }
}

const submitUserAccount = async (submitData: UserAccountInputForm) => {
  const variables: AddAccountUserByGoogleMutationVariables = {
    authToken: googleAuthToken.value?.toString() ?? "",
    userSettingId: submitData.userSettingId ?? "",
    name: submitData.name ?? "",
  }
  const result = await addAccountUserByGoogleMutate(variables)
  const addUserData = result?.data?.addAccountUserByGoogle

  if (addUserData) {
    await authSet(addUserData.token, addUserData.userSettingId, addUserData.name)
    snackbarState.value = {
      type: "info",
      message: "ユーザを登録しました",
      active: true
    }
    navigateTo("/");
  } else {
    snackbarState.value = {
      type: "error",
      message: "入力したユーザIDが重複してる可能性があります。変更してもエラーとなる場合は再度認証から操作お願いします。",
      active: true
    }
  }
}
</script>

<template>
  <div v-if="googleAuthToken != null">
    <UserAccountInputComponent :submitFunc="submitUserAccount"
      :disabledButton="addAccountUserByGoogleLoading.valueOf()" />
  </div>
  <div v-else>
    <GoogleAuthComponent :afterGoogleAuthExec="afterGoogleAuthExec" :disabledButton="authCodeVerifyLoading.valueOf()" />
  </div>
</template>
