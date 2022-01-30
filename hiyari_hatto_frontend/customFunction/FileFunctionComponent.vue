<script>
export default function useFileFunction() {
  // GCSのURLから拡張子を取得
  function getExtFromGcsUrl(url) {
    // 「.」の位置を取得
    const dotIndex = url.lastIndexOf(".");
    if (dotIndex < 0) {
      return "";
    }
    // 「?」の位置を取得
    const questionIndex = url.lastIndexOf("?");
    if (questionIndex < 0) {
      return "";
    }
    return url.substring(dotIndex, questionIndex);
  }

  // URLからファイルダウンロード
  async function fileDownloadFromUrl(fileName, fileUrl) {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const newBlob = new Blob([blob]);
      const objUrl = window.URL.createObjectURL(newBlob);
      const link = document.createElement("a");
      link.href = objUrl;
      link.download = fileName;
      link.click();
      // For Firefox it is necessary to delay revoking the ObjectURL.
      setTimeout(() => {
        window.URL.revokeObjectURL(objUrl);
      }, 250);
      return true;
    } catch (_) {
      return false;
    }
  }

  return {
    getExtFromGcsUrl,
    fileDownloadFromUrl,
  };
}
</script>
