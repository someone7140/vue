<template>
  <div class="container">
    <div class="row">
      <div class="titleBlock">
        {{ omitWord(source.title, 23, "…") }}
        <div class="mt-2">
          <PdfThumbnailComponent
            :id="getInitialData.id"
            :fileUrl="getInitialData.url"
          />
        </div>
      </div>
      <div class="buttonBlock">
        <div class="mt-2">
          <PdfRegisterComponent
            :updateRefreshPdfListTimestamp="
              source.updateRefreshPdfListTimestamp
            "
            :initialData="getInitialData"
          />
        </div>
        <div class="mt-3">
          <PdfDeleteComponent
            :updateRefreshPdfListTimestamp="
              source.updateRefreshPdfListTimestamp
            "
            :deleteData="getInitialData"
          />
        </div>
      </div>
    </div>
    <div class="hrBlock">
      <hr class="hr" />
    </div>
  </div>
</template>

<script>
import PdfDeleteComponent from "~/components/register/PdfDeleteComponent.vue";
import PdfRegisterComponent from "~/components/register/PdfRegisterComponent.vue";
import PdfThumbnailComponent from "~/components/view/PdfThumbnailComponent.vue";

export default {
  components: {
    PdfDeleteComponent,
    PdfRegisterComponent,
    PdfThumbnailComponent,
  },
  props: ["index", "source"],
  computed: {
    getInitialData() {
      return {
        id: this.source?.id,
        title: this.source?.title,
        url: this.source?.url,
      };
    },
  },
  methods: {
    omitWord(text, len, ellipsis) {
      return text.length >= len
        ? text.slice(0, len - ellipsis.length) + ellipsis
        : text;
    },
  },
};
</script>

<style>
.container {
  position: relative;
  max-width: 400px;
  min-height: 150px;
  max-height: 280px;
}
.hrBlock {
  margin-top: 100px;
}
.buttonBlock {
  margin-left: 35px;
}
.titleBlock {
  width: 200px;
}
.hr {
  width: 100%;
}
</style>
