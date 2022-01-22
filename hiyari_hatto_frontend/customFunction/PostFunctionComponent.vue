<script>
export default function usePostFunction() {
  const $config = useRuntimeConfig();

  // 投稿の追加
  async function careatePost(
    title,
    categories,
    urls,
    files,
    detail,
    occurDateTime
  ) {
    const token = localStorage.getItem("authToken");
    if (!token) {
      return undefined;
    }
    try {
      // フォームデータのセット
      const postData = new FormData();
      postData.append("title", title);
      if (categories) {
        categories.forEach((categoryId) => {
          postData.append("categoryIds[]", categoryId);
        });
      }
      if (urls) {
        urls.forEach((url, i) => {
          postData.append(
            "referenceUrls[" + i + "].siteName",
            url.value.siteName
          );
          postData.append("referenceUrls[" + i + "].url", url.value.url);
        });
      }
      if (files) {
        files.forEach((file) => {
          postData.append("referenceFileTitles[]", file.value.fileName);
          postData.append("referenceFiles[]", file.value.file[0]);
        });
      }
      if (detail) {
        postData.append("detail", detail);
      }
      if (occurDateTime) {
        postData.append("occurDateTime", formatDateForPost(occurDateTime));
      }
      // 送信
      const url = $config.API_HOST + "/hiyariHatto/createPost";
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
        body: postData,
      };
      delete params.headers["Content-Type"];

      const res = await fetch(url, params);
      if (res.ok) {
        return true;
      }
    } catch (_) {
      return undefined;
    }
    return undefined;
  }

  function formatDateForPost(inputDate) {
    return inputDate.toISOString();
  }

  return {
    careatePost,
  };
}
</script>
