<script setup lang="ts">

const props = defineProps({
  submitFunc: {
    type: Function,
    default: (_: UserAccountInputForm) => { }
  },
  disabledButton: {
    type: Boolean,
    default: false
  },
  initialUserInfo: {
    type: Object as () => UserLoginState,
    default: undefined
  }
})

const userAccountInputFormState = ref<UserAccountInputForm>(props.initialUserInfo ? { valid: false, userSettingId: props.initialUserInfo.userSettingId, name: props.initialUserInfo.name } : { valid: false })
const { requiredValidation } = commonInput()

const submitUserAccount = () => {
  if (userAccountInputFormState.value.valid) {
    props.submitFunc(userAccountInputFormState.value)
  }

}

</script>

<template>
  <v-form v-model="userAccountInputFormState.valid" validate-on="blur" @submit.prevent="submitUserAccount">
    <v-sheet min-width="300px">
      <v-text-field v-model="userAccountInputFormState.userSettingId" :rules="[requiredValidation]">
        <template v-slot:label>
          ユーザID<span class="text-red"> *</span>
        </template>
      </v-text-field>
      <v-text-field v-model="userAccountInputFormState.name" :rules="[requiredValidation]">
        <template v-slot:label>
          名前<span class="text-red"> *</span>
        </template>
      </v-text-field>
      <v-file-input label="アイコン画像" v-model="userAccountInputFormState.imageFile" max-width="310px"></v-file-input>
      <v-img width="70%" aspect-ratio="16/9" :src="initialUserInfo?.imageUrl"
        v-if="initialUserInfo?.imageUrl && !userAccountInputFormState.imageFile" class="mt-2 mb-2"></v-img>
      <div class="d-flex justify-center ga-2">
        <v-btn type="submit" class="bg-light-blue-darken-1 text-black" @disabled="props.disabledButton">
          登録
        </v-btn>
        <div v-if="props.disabledButton">
          <LoadingComponent />
        </div>
      </div>
    </v-sheet>

  </v-form>

</template>
