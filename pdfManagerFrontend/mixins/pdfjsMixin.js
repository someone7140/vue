export default {
  methods: {
    async getPdfFormUrl(fileUrl) {
      // eslint-disable-next-line no-undef
      const pdfjsLib = require("pdfjs-dist");
      // eslint-disable-next-line no-undef
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.js`;
      const worker = new pdfjsLib.PDFWorker();

      // URLからPDF取得
      return await pdfjsLib
        .getDocument({
          url: fileUrl,
          worker: worker,
        })
        .promise.then((pdf) => pdf);
    },
  },
};
