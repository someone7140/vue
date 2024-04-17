<script setup lang="ts">
import { userAccountInput, type UserAccountInputForm } from '~/composables/form/userAccountInput';

const props = defineProps({
  submitFunc: {
    type: Function,
    default: (_: UserAccountInputForm) => { }
  },
  disabledButton: {
    type: Boolean,
    default: false
  }
})

const userAccountInputFormState = ref<UserAccountInputForm>({})
const { requiredValidation } = userAccountInput()

const submitUserAccount = () => {
  props.submitFunc(userAccountInputFormState.value)
}

</script>

<template>
  <v-form validate-on="submit" @submit.prevent="submitUserAccount">
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
      <v-btn type="submit" class="bg-light-blue-darken-1 text-black" @disabled="props.disabledButton">
        登録
      </v-btn>
    </v-sheet>

  </v-form>

</template>
