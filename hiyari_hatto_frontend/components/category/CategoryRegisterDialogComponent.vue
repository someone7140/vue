<template>
  <v-btn rounded color="primary" @click="showDialog">{{
    categoryDetail ? "カテゴリー編集" : "カテゴリー登録"
  }}</v-btn>
  <v-dialog v-model="state.showDialog">
    <div class="justify-center">
      <v-card class="dialogCard">
        <b>{{ categoryDetail ? "カテゴリー編集" : "カテゴリー登録" }}</b>
        <br />
        <br />
        <span class="error">{{ nameError }}</span>
        <v-text-field
          v-model="nameValue"
          label="カテゴリー名"
          class="categryName ml-2"
          data-vv-validate-on="change"
        ></v-text-field>
        <v-card-actions>
          <div class="text-center">
            <v-btn
              class="ml-6"
              type="submit"
              color="#98fb98"
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
import * as yup from "yup";

import usePostCategoryFunction from "../../customFunction/PostCategoryFunctionComponent";

export default defineComponent({
  props: ["categoryDetail", "reloadCategories"],
  setup() {
    const app = getCurrentInstance();
    const root = app.appContext.config.globalProperties;
    const props = app.props;
    const categoryDetail = props.categoryDetail;

    // 入力フォームの設定
    const categoryRegisterSchema = yup.object({
      name: yup.string().required("カテゴリー名は必須項目です"),
    });

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

    if (categoryDetail) {
      name.value = categoryDetail.name;
    }

    async function onSubmit() {
      const varidateResult = await formContext.validate();
      if (varidateResult.valid) {
        const { careateCategory, editCategory } = usePostCategoryFunction();
        try {
          const result = await (categoryDetail
            ? editCategory(categoryDetail.id, name.value)
            : careateCategory(name.value));

          if (result) {
            successRegisterDisplay();
            await props.reloadCategories();
            state.showDialog = false;
          } else {
            errorRegisterDisplay();
          }
        } catch (e) {
          errorRegisterDisplay();
        }
      }
    }
    const boundOnSubmit = onSubmit.bind(this);

    return {
      categoryDetail,
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
