<template>
  <span
    class="referenceFile"
    role="button"
    @click="
      () => {
        fileClick(referenceFile.title, referenceFile.fileUrl);
      }
    "
  >
    {{ getFileName(referenceFile.title, referenceFile.fileUrl) }}
  </span>
  <div class="mt-1" v-if="state.fileDownloading">
    <loading v-model:active="state.fileDownloading" :can-cancel="false" />
  </div>
  <div class="mt-1" v-if="state.fileDownloadError">
    <span class="error">ファイルがダウンロードできませんでした</span>
  </div>
</template>

<script>
import { defineComponent, getCurrentInstance } from "vue";
import Loading from "vue-loading-overlay";

import useFileFunction from "../../customFunction/FileFunctionComponent.vue";

export default defineComponent({
  props: ["referenceFile"],
  components: {
    Loading,
  },
  setup() {
    const app = getCurrentInstance();
    const props = app.props;
    const referenceFile = props.referenceFile;

    const { getExtFromGcsUrl, fileDownloadFromUrl } = useFileFunction();

    const state = reactive({
      fileDownloading: false,
      fileDownloadError: false,
    });

    function getFileName(title, fileUrl) {
      return title + getExtFromGcsUrl(fileUrl);
    }

    async function fileClick(title, fileUrl) {
      const downloadFileName = title + getExtFromGcsUrl(fileUrl);
      state.fileDownloading = true;
      const successFlag = await fileDownloadFromUrl(downloadFileName, fileUrl);

      state.fileDownloading = false;
      state.fileDownloadError = !successFlag;
    }

    return {
      state,
      fileClick,
      getFileName,
      referenceFile,
    };
  },
});
</script>

<style scoped>
.referenceFile {
  font-size: 1.3em;
  color: #0645ad;
  text-decoration: underline;
}
.error {
  color: red;
}
</style>
