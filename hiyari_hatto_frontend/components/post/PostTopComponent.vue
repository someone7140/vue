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
        <template v-if="state.zeroFlag">
          <br />
          <br />
          <br />登録されている投稿はありません</template
        >
        <div v-if="!state.zeroFlag">
          <br />
          <br />
          <br />
          <div v-for="displayPost in state.displayPosts" :key="displayPost.id">
            <PostCardComponent
              :displayPost="displayPost"
              :reloadPosts="reloadPosts"
              :categories="state.categories"
            />
          </div>
          <InfiniteLoading :displayPosts="state.displayPosts" @infinite="load">
            <template #complete>
              <span></span>
            </template>
          </InfiniteLoading>
        </div>
      </template>
    </template>
    <template v-if="state.loadingFlag">
      <loading v-model:active="state.loadingFlag" :can-cancel="false" />
    </template>
  </div>
</template>

<script>
import { defineComponent, reactive } from "vue";
import InfiniteLoading from "v3-infinite-loading";
import Loading from "vue-loading-overlay";
import "v3-infinite-loading/lib/style.css";

import PostCardComponent from "./PostCardComponent";
import PostRegisterDialogComponent from "./PostRegisterDialogComponent";
import usePostFunction from "../../customFunction/PostFunctionComponent";
import usePostCategoryFunction from "../../customFunction/PostCategoryFunctionComponent";

export default defineComponent({
  components: {
    InfiniteLoading,
    Loading,
    PostCardComponent,
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
    const { getPosts } = usePostFunction();

    const LOADING_COUNT = 10;

    const initPost = async () => {
      state.categories = await getCategories();
      state.allPosts = await getPosts();
      if (!state.allPosts || !state.categories) {
        state.errorFlag = true;
      } else if (state.allPosts.length === 0) {
        state.zeroFlag = true;
        state.errorFlag = false;
      } else {
        state.errorFlag = false;
      }
      state.loadingFlag = false;
    };

    const getAddDisplayPost = (startIndex) => {
      const endIndex =
        startIndex + LOADING_COUNT < state.allPosts.length
          ? startIndex + LOADING_COUNT
          : state.allPosts.length;
      return state.allPosts.slice(startIndex, endIndex);
    };

    const load = async ($state) => {
      try {
        const addingPosts = getAddDisplayPost(state.displayPosts.length);
        state.displayPosts = state.displayPosts.concat(addingPosts);
        if (addingPosts.length < LOADING_COUNT) {
          $state.complete();
        } else {
          $state.loaded();
        }
      } catch (error) {
        $state.error();
        state.errorFlag = true;
      }
    };

    const reloadPosts = async () => {
      window.location.href = "/";
    };

    await initPost();
    return {
      state,
      reloadPosts,
      load,
    };
  },
});
</script>

<style scoped>
.error {
  color: red;
}
</style>
