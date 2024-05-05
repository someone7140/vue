<script setup lang="ts">

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
      <v-btn type="submit" class="bg-light-blue-darken-1 text-black" @disabled="props.disabledButton">
        登録
      </v-btn>
    </v-sheet>

  </v-form>

</template>
