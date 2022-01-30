<script>
export default function useCommonFunction() {
  // 文字列を短縮表示する
  const omitWord = (text, len, ellipsis) => {
    if (text) {
      return text.length >= len
        ? text.slice(0, len - ellipsis.length) + ellipsis
        : text;
    }
    return "";
  };

  return {
    omitWord,
  };
}
</script>
