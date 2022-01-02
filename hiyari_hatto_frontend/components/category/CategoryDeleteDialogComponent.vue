<template>
  <v-btn rounded color="grey" @click="showDialog">カテゴリー削除</v-btn>
  <v-dialog v-model="state.showDialog" persistent>
    <div class="justify-center">
      <v-card class="dialogCard" style="width: 350px">
        <b>カテゴリー削除</b>
        <br />
        <div class="text-center mb-4 mt-2">
          カテゴリー「{{ categoryDetail.name }}」を削除します。<br />
          問題なければ削除するボタンを押してください。
        </div>
        <v-card-actions>
          <div class="text-center ml-4">
            <v-btn
              class="ml-12"
              type="submit"
              color="primary"
              @click="boundOnSubmit"
              >削除する</v-btn
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
import usePostCategoryFunction from "../../customFunction/PostCategoryFunctionComponent";

export default defineComponent({
  props: ["categoryDetail", "reloadCategories"],
  setup() {
    const app = getCurrentInstance();
    const root = app.appContext.config.globalProperties;
    const props = app.props;
    const categoryDetail = props.categoryDetail;

    const state = reactive({
      showDialog: false,
    });
    const showDialog = () => {
      state.showDialog = true;
    };
    const hideDialog = () => {
      state.showDialog = false;
    };

    const successDeleteDisplay = () => {
      root.$toast.success("カテゴリーを削除しました");
    };

    const errorDeleteDisplay = () => {
      root.$toast.error("カテゴリーの削除に失敗しました");
    };

    async function onSubmit() {
      const { deleteCategory } = usePostCategoryFunction();
      try {
        const result = await deleteCategory(categoryDetail.id);
        if (result) {
          successDeleteDisplay();
          await props.reloadCategories();
          state.showDialog = false;
        } else {
          errorDeleteDisplay();
        }
      } catch (e) {
        errorDeleteDisplay();
      }
    }
    const boundOnSubmit = onSubmit.bind(this);

    return {
      state,
      categoryDetail,
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
</style>
