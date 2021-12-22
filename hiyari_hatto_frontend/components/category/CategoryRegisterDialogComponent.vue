<template>
  <v-btn rounded color="primary" @click="showDialog">カテゴリー登録</v-btn>
  <v-dialog v-model="state.showDialog" persistent>
    <div class="justify-center">
      <v-card class="dialogCard">
        <b>カテゴリー登録</b>
        <br />
        <br />
        <span class="error">{{ nameError }}</span>
        <v-text-field
          v-model="nameValue"
          label="カテゴリー名"
          class="categryName ml-2"
        ></v-text-field>
        <v-card-actions>
          <div class="text-center">
            <v-btn
              class="ml-12"
              type="submit"
              color="primary"
              @click="boundOnSubmit"
              >登録する</v-btn
            >
            <v-btn class="ml-6" color="#EEEEEE" @click="hideDialog"
              >閉じる</v-btn
            >
          </div>
        </v-card-actions>
        <br />
      </v-card>
    </div>
  </v-dialog>
</template>

<script>
import { defineComponent, getCurrentInstance } from "vue";
import { useField, useForm } from "vee-validate";
import usePostCategoryFunction from "../../customFunction/PostCategoryFunctionComponent";

export default defineComponent({
  props: ["categoryDetail", "reloadCategories"],
  setup() {
    const app = getCurrentInstance();
    const root = app.appContext.config.globalProperties;
    const props = app.props;

    // 入力フォームの設定
    const categoryRegisterSchema = {
      name(value) {
        return value ? true : "カテゴリー名は必須です";
      },
    };
    const formContext = useForm({
      validationSchema: categoryRegisterSchema,
    });
    const { value: name, errorMessage: nameError } = useField("name");
    const nameValue = computed({
      get: () => name.value,
      set: (value) => {
        name.value = value;
      },
    });

    const state = reactive({
      showDialog: false,
    });
    const showDialog = () => {
      state.showDialog = true;
    };
    const hideDialog = () => {
      state.showDialog = false;
      formContext.resetForm();
    };

    const successRegisterDisplay = () => {
      root.$toast.success("カテゴリーを登録しました");
    };

    const errorRegisterDisplay = () => {
      root.$toast.error("カテゴリーの登録に失敗しました");
    };

    async function onSubmit() {
      const varidateResult = await formContext.validate();
      if (varidateResult) {
        const { careateCategory } = usePostCategoryFunction();
        try {
          const result = await careateCategory(name.value);

          if (result) {
            successRegisterDisplay();
            state.showDialog = false;
            await props.reloadCategories();
          } else {
            errorRegisterDisplay();
          }
        } catch (e) {
          console.log(e);
          errorRegisterDisplay();
        }
      }
    }
    const boundOnSubmit = onSubmit.bind(this);
    return {
      nameValue,
      nameError,
      state,
      showDialog,
      hideDialog,
      boundOnSubmit,
    };
  },
});
</script>

<style scoped>
.dialogCard {
  width: 300px;
}
.categryName {
  width: 280px;
}
.error {
  color: red;
}
</style>
