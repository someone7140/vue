<template>
  <div class="d-flex justify-center">
    <template v-if="!state.loadingFlag">
      <template v-if="state.errorFlag">
        <span class="error">投稿が取得できませんでした</span>
      </template>
      <template v-if="!state.errorFlag">
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
          <div class="mt-4" style="width: 100%">
            <PostRegisterDialogComponent
              :reloadPosts="reloadPosts"
              :categories="state.categories"
            />
          </div>
        </div>
        <br />
        <br />
        <br />
        <div v-if="state.zeroFlag">登録されている投稿はありません</div>
        <div v-if="!state.zeroFlag"></div>
      </template>
    </template>
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

import PostRegisterDialogComponent from "./PostRegisterDialogComponent";
import usePostCategoryFunction from "../../customFunction/PostCategoryFunctionComponent";

export default defineComponent({
  components: {
    InfiniteLoading,
    Loading,
    PostRegisterDialogComponent,
  },
  async setup() {
    const state = reactive({
      zeroFlag: false,
      errorFlag: false,
      loadingFlag: false,
      categories: [],
      allPosts: [],
      displayPosts: [],
    });

    const { getCategories } = usePostCategoryFunction();

    const initPost = async () => {
      state.categories = await getCategories();
      state.loadingFlag = false;
    };

    const reloadPosts = async () => {
      window.location.href = "/";
    };

    await initPost();
    return {
      state,
      reloadPosts,
    };
  },
});
</script>
