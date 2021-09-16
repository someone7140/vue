<template>
  <div>
    <input
      type="text"
      class="searchWordInput"
      v-model="searchWord"
      placeholder="PDFの検索ワード"
    />
    <button
      class="ml-4 btn btn-primary"
      :disabled="isDisableSearchButton"
      @click="searchPdf"
    >
      検索
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchWord: "",
    };
  },
  computed: {
    isDisableSearchButton() {
      return !this.searchWord;
    },
  },
  methods: {
    searchPdf() {
      window.open(
        "https://www.google.com/search?q=" + this.searchWord + "+filetype:pdf",
        "_blank"
      );
    },
  },
};
</script>

<style>
.searchWordInput {
  width: 250px;
}
</style>
