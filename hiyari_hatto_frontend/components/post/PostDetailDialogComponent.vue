<template>
  <v-dialog v-model="showDialogFlag" scrollable>
    <div class="justify-center dialogCardDiv">
      <v-card class="dialogCard">
        <div class="mt-3" style="display: flex; justify-content: space-between">
          <div class="ml-3">
            <b>投稿詳細</b>
          </div>
          <div class="mr-3" role="button" @click="hideDialog">
            <v-icon>mdi-close-circle</v-icon>
          </div>
        </div>
        <br />
        <v-card-text style="height: 550px">
          <div>
            <span>タイトル</span>
            <br />
            <span class="mt-2" style="font-size: 1.3em">
              {{ postDetail.title }}
            </span>
          </div>
          <div v-if="postDetail.occurDateTime" class="mt-4">
            <span class="mt-4">発生日時</span>
            <br />
            <span class="mt-2" style="font-size: 1.3em">
              {{ getFormatDateFromDateStr(postDetail.occurDateTime) }}
            </span>
          </div>
          <div v-if="displayCategories" class="mt-4">
            <span>カテゴリー</span>
            <br />
            <span class="mt-2" style="font-size: 1.3em">
              {{ displayCategories }}
            </span>
          </div>
          <div v-if="postDetail.detail" class="mt-4">
            <span class="mt-4">詳細</span>
            <br />
            <span class="mt-2 detail">
              {{ postDetail.detail }}
            </span>
          </div>
          <div
            v-if="
              postDetail.referenceUrls && postDetail.referenceUrls.length > 0
            "
            class="mt-4"
          >
            <span class="mt-4">参考URL</span>
            <div
              class="mt-2"
              v-for="referenceUrl in postDetail.referenceUrls"
              :key="referenceUrl.id"
            >
              <a
                :href="referenceUrl.url"
                target="_blank"
                style="font-size: 1.3em"
              >
                {{ referenceUrl.siteName }}
              </a>
            </div>
          </div>
          <div
            v-if="
              postDetail.referenceFiles && postDetail.referenceFiles.length > 0
            "
            class="mt-4"
          >
            <span class="mt-4">添付ファイル</span>
            <div
              class="mt-2"
              v-for="referenceFile in postDetail.referenceFiles"
              :key="referenceFile.id"
            >
              <PostFileDownloadComponent :referenceFile="referenceFile" />
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </v-dialog>
</template>

<script>
import { defineComponent, getCurrentInstance } from "vue";

import useDateFunction from "../../customFunction/DateFunctionComponent.vue";
import PostFileDownloadComponent from "./PostFileDownloadComponent";

export default defineComponent({
  props: ["postDetail", "displayCategories", "showDialogFlag", "hideDialog"],
  components: {
    PostFileDownloadComponent,
  },
  setup() {
    const app = getCurrentInstance();
    const props = app.props;
    const postDetail = props.postDetail;
    const displayCategories = props.displayCategories;
    const showDialogFlag = props.showDialogFlag;
    const hideDialog = props.hideDialog;

    const { getFormatDateFromDateStr } = useDateFunction();

    return {
      getFormatDateFromDateStr,
      postDetail,
      displayCategories,
      showDialogFlag,
      hideDialog,
    };
  },
});
</script>

<style scoped>
.dialogCardDiv {
  position: absolute;
  top: -250px;
  right: -30px;
}
.dialogCard {
  width: 300px;
  overflow-y: scroll;
}
.detail {
  font-size: 1.3em;
  white-space: pre-wrap;
}
</style>
