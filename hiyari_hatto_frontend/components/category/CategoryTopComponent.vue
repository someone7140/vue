<template>
  <div class="d-flex justify-center">
    <div v-if="!state.loadingFlag">
      <div v-if="state.errorFlag">
        <span class="error">カテゴリーが取得できませんでした</span>
      </div>
      <div v-if="!state.errorFlag">
        <div
          style="
            min-width: 350px;
            max-width: 700px;
            position: fixed;
            z-index: 10;
            background-color: white;
            top: 64px;
          "
        >
          <div class="mt-4">
            <CategoryRegisterDialogComponent
              :reloadCategories="reloadCategories"
            />
          </div>
        </div>
        <br />
        <br />
        <br />
        <div v-if="state.zeroFlag">登録されているカテゴリーはありません</div>
        <div v-if="!state.zeroFlag">
          <div
            v-for="displayCategory in state.displayCategories"
            :key="displayCategory.id"
          >
            <CategoryCardComponent
              :displayCategory="displayCategory"
              :reloadCategories="reloadCategories"
            />
          </div>
          <InfiniteLoading
            :displayCategories="state.displayCategories"
            @infinite="load"
          >
            <template #complete>
              <span></span>
            </template>
          </InfiniteLoading>
        </div>
      </div>
    </div>
    <div v-if="state.loadingFlag">
      <loading v-model:active="state.loadingFlag" :can-cancel="false" />
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from "vue";
import InfiniteLoading from "v3-infinite-loading";
import Loading from "vue-loading-overlay";
import "v3-infinite-loading/lib/style.css";

import CategoryCardComponent from "./CategoryCardComponent";
import CategoryRegisterDialogComponent from "./CategoryRegisterDialogComponent";
import useDateFunction from "../../customFunction/DateFunctionComponent";
import usePostCategoryFunction from "../../customFunction/PostCategoryFunctionComponent";

export default defineComponent({
  components: {
    CategoryCardComponent,
    CategoryRegisterDialogComponent,
    InfiniteLoading,
    Loading,
  },
  async setup() {
    const state = reactive({
      zeroFlag: false,
      errorFlag: false,
      loadingFlag: true,
      allCategories: [],
      displayCategories: [],
    });

    const LOADING_COUNT = 10;

    const { getCategories } = usePostCategoryFunction();

    const initCategories = async () => {
      state.allCategories = await getCategories();
      state.loadingFlag = false;

      if (!state.allCategories) {
        state.errorFlag = true;
      } else if (state.allCategories.length === 0) {
        state.zeroFlag = true;
      }
    };

    const getAddDisplayCategory = (startIndex) => {
      const endIndex =
        startIndex + LOADING_COUNT < state.allCategories.length
          ? startIndex + LOADING_COUNT
          : state.allCategories.length;
      return state.allCategories.slice(startIndex, endIndex);
    };

    const reloadCategories = async () => {
      window.location.href = "/category";
    };

    const load = async ($state) => {
      try {
        const addingCategories = getAddDisplayCategory(
          state.displayCategories.length
        );
        state.displayCategories =
          state.displayCategories.concat(addingCategories);
        if (addingCategories.length < LOADING_COUNT) {
          $state.complete();
        } else {
          $state.loaded();
        }
      } catch (error) {
        $state.error();
        state.errorFlag = true;
      }
    };

    const { getFormatDateFromDateStr } = useDateFunction();

    initCategories();

    return {
      state,
      getFormatDateFromDateStr,
      load,
      reloadCategories,
    };
  },
});
</script>

<style scoped>
.error {
  color: red;
}
</style>
