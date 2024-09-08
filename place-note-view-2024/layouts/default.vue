<script setup lang="ts">
import type { GetAccountUserByTokenQuery } from '~/gql/graphql';
import { getAccountUserByTokenQueryDocument } from '~/query/accountUsersQuery';

const { getToken } = useApollo()
const loginState = useLoginState();

const loading = ref(true)
const { load: getAccountUserByTokenLazyQuery } = useLazyQuery<GetAccountUserByTokenQuery>(getAccountUserByTokenQueryDocument)

onMounted(async () => {
  if (!(loginState.value)) {
    const authToken = await getToken()
    // トークンでユーザ認証を行う
    if (authToken) {
      try {
        const result = await getAccountUserByTokenLazyQuery();
        if (result) {
          const userInfo = result.getAccountUserByToken;
          authSet(authToken, userInfo.userSettingId, userInfo.name, userInfo.imageUrl)
        }
      } catch (e) {
        authDelete()
      }
    }
  }
  loading.value = false
})
</script>

<template>
  <v-app>
    <div v-show="loading">
      Loading..
    </div>
    <div v-show="!loading">
      <HeaderComponent />
      <div class="wrapper">
        <div>
          <div>
            <slot />
          </div>

        </div>
      </div>
    </div>
    <SnackbarComponent />
  </v-app>
</template>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  margin-top: 80px;

  div {
    max-width: 95%;
    min-width: 300px;

    div {
      display: flex;
      justify-content: start;
      margin-left: 12px;
      width: 100%;
    }
  }
}
</style>