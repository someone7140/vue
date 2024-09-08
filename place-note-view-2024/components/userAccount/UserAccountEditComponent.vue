<script setup lang="ts">
import type { EditAccountUserMutation, EditAccountUserMutationVariables } from '~/gql/graphql';
import { editAccountUserMutationDocument } from '~/query/accountUsersQuery';

const loginState = useLoginState();
const snackbarState = useSnackbarState();

const { mutate: editAccountUserMutate, loading: editAccountUserLoading } = useMutation<EditAccountUserMutation>(editAccountUserMutationDocument, {
  errorPolicy: 'all',
})

const submitEditUserAccount = async (submitData: UserAccountInputForm) => {
  const variables: EditAccountUserMutationVariables = {
    userSettingId: submitData.userSettingId ?? "",
    name: submitData.name ?? "",
    file: submitData.imageFile
  }
  const result = await editAccountUserMutate(variables)
  const editUserData = result?.data?.editAccountUser

  if (editUserData) {
    await authSet(editUserData.token, editUserData.userSettingId, editUserData.name, editUserData.imageUrl)
    snackbarState.value = {
      type: "info",
      message: "ユーザ情報を更新しました",
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
  <UserAccountInputComponent :submitFunc="submitEditUserAccount" :disabledButton="editAccountUserLoading.valueOf()"
    :initialUserInfo="loginState" />
</template>
