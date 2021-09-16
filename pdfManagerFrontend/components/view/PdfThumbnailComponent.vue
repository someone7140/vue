<template>
  <div>
    <div v-if="errorFlag">PDFが取得できませんでした</div>
    <div v-else>
      <div v-if="loadingFlag" class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <div v-else>
        <canvas :id="id" />
      </div>
    </div>
  </div>
</template>

<script>
import pdfjsMixin from "~/mixins/pdfjsMixin.js";

export default {
  props: ["id", "fileUrl"],
  mixins: [pdfjsMixin],
  data() {
    return {
      loadingFlag: false,
      errorFlag: false,
    };
  },
  async mounted() {
    const CANVAS_WIDTH = 180;
    const CANVAS_HEIGHT = 230;

    try {
      this.errorFlag = false;
      this.loadingFlag = true;

      // PDFの1ページ目を取得
      const pdf = this.getPdfFormUrl(this.fileUrl);
      const page = await pdf?.getPage(1);

      if (page) {
        let viewport = page.getViewport({ scale: 1.0 });
        viewport = page.getViewport({ scale: CANVAS_WIDTH / viewport.width });

        const canvas = document.getElementById(this.id);
        canvas.height = CANVAS_HEIGHT;
        canvas.width = CANVAS_WIDTH;

        const context = canvas.getContext("2d");
        await page.render({ canvasContext: context, viewport: viewport });
      } else {
        this.errorFlag = true;
      }
      this.loadingFlag = false;
    } catch (e) {
      this.errorFlag = true;
      this.loadingFlag = false;
    }
  },
};
</script>
