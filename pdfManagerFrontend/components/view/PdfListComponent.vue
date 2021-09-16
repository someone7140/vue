<template>
  <div class="text-center">
    <div v-if="errorFlag" class="text-danger mt-2">
      登録内容を取得中にエラーが発生しました。
    </div>
    <div v-else>
      <div v-if="isNotEmptyPdfList">
        <virtual-list
          scrollable
          :data-key="'id'"
          :data-sources="pdfList"
          :data-component="pdfInfoComponent"
          :keeps="10"
        />
      </div>
      <div v-else>登録されているPDFはありません。</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import VirtualList from "vue-virtual-scroll-list";
import apiMixin from "~/mixins/apiMixin.js";
import PdfInfoComponent from "~/components/view/PdfInfoComponent.vue";

export default {
  mixins: [apiMixin],
  props: ["refreshPdfListTimestamp", "updateRefreshPdfListTimestamp"],
  components: { "virtual-list": VirtualList },
  data() {
    return {
      pdfInfoComponent: PdfInfoComponent,
      pdfList: [],
      errorFlag: false,
    };
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),
    isNotEmptyPdfList() {
      return this.pdfList?.length > 0;
    },
  },
  methods: {
    async getPdfList() {
      const result = await this.getApi("/pdf/list", this.userInfo.jwtToken);
      if (result) {
        this.pdfList = result.map((r) => {
          return {
            ...r,
            updateRefreshPdfListTimestamp: this.updateRefreshPdfListTimestamp,
          };
        });
      } else {
        this.errorFlag = true;
      }
    },
  },
  async mounted() {
    this.getPdfList();
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    refreshPdfListTimestamp: function (_newTimestamp, _oldTimestamp) {
      this.getPdfList();
    },
  },
};
</script>
