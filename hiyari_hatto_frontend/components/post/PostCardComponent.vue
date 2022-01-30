<template>
  <v-card class="card">
    <v-list-item-title
      class="card-title ml-4 mt-2"
      role="button"
      @click="titleClick"
    >
      {{ displayPost.title }}
    </v-list-item-title>
    <v-list-item-subtitle class="ml-6 mt-4"
      ><span v-if="displayPost?.occurDateTime"
        >{{ getFormatDateFromDateStr(displayPost?.occurDateTime) }}発生</span
      >
      <br />
      <span v-if="displayCategories">
        {{ displayCategories }}
        <br
      /></span>
    </v-list-item-subtitle>
    <v-card-text>
      <span class="detail">
        {{ omitWord(displayPost.detail, 100, "…") }}
      </span>
    </v-card-text>
  </v-card>
  <template v-if="state.showDetailDialogFlag">
    <PostDetailDialogComponent
      :postDetail="displayPost"
      :displayCategories="displayCategories"
      :showDialogFlag="state.showDetailDialogFlag"
      :hideDialog="hideDialog"
    />
  </template>
</template>

<script>
import { defineComponent, reactive } from "vue";

import PostDetailDialogComponent from "./PostDetailDialogComponent";
import useCommonFunction from "../../customFunction/CommonFunctionComponent.vue";
import useDateFunction from "../../customFunction/DateFunctionComponent.vue";

export default defineComponent({
  props: ["displayPost", "reloadPosts", "categories"],
  components: { PostDetailDialogComponent },
  async setup() {
    const app = getCurrentInstance();
    const displayPost = app.props.displayPost;
    const reloadPosts = app.props.reloadPosts;
    const categories = app.props.categories;

    const state = reactive({
      showDetailDialogFlag: false,
    });

    const displayCategories = displayPost
      ? displayPost.categoryIds
          .map((id) => {
            return categories?.find((c) => {
              return c.id == id;
            })?.name;
          })
          .filter((c) => c)
          .join("、")
      : "";

    const { omitWord } = useCommonFunction();
    const { getFormatDateFromDateStr } = useDateFunction();

    function titleClick() {
      state.showDetailDialogFlag = true;
    }

    function hideDialog() {
      state.showDetailDialogFlag = false;
    }

    return {
      state,
      displayPost,
      displayCategories,
      reloadPosts,
      getFormatDateFromDateStr,
      omitWord,
      titleClick,
      hideDialog,
    };
  },
});
</script>

<style scoped>
.card {
  min-height: 150px;
  margin-bottom: 30px;
  max-width: 450px;
  width: 100%;
}
.card-title {
  height: 25px;
  font-size: 1.5em;
  max-width: 450px;
  width: 350px;
  color: #0645ad;
  text-decoration: underline;
}
.detail {
  white-space: pre-wrap;
}
</style>
