<script>
import useAuthFunction from "./AuthFunctionComponent";

export default function usePostFunction() {
  const $config = useRuntimeConfig();
  const { getTokenFromLocalStorage } = useAuthFunction();

  // 投稿の追加
  async function careatePost(
    title,
    categories,
    urls,
    files,
    detail,
    occurDateTime
  ) {
    const token = getTokenFromLocalStorage(localStorage);
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
  }

  // 投稿の更新
  async function updatePost(
    id,
    title,
    categories,
    urls,
    files,
    detail,
    occurDateTime
  ) {
    const token = getTokenFromLocalStorage(localStorage);
    if (!token) {
      return undefined;
    }
    try {
      // フォームデータのセット
      const postData = new FormData();
      postData.append("id", id);
      postData.append("title", title);
      if (categories) {
        categories.forEach((categoryId) => {
          postData.append("categoryIds[]", categoryId);
        });
      }
      if (urls) {
        urls.forEach((url, i) => {
          const urlValue = url.value;
          postData.append(
            "referenceUrls[" + i + "].siteName",
            urlValue.siteName
          );
          postData.append("referenceUrls[" + i + "].url", urlValue.url);
          if (urlValue.registeredId) {
            postData.append(
              "referenceUrls[" + i + "].id",
              urlValue.registeredId
            );
          }
        });
      }
      if (files) {
        files.forEach((file, i) => {
          const fileValue = file.value;
          postData.append(
            "referenceFileInfos[" + i + "].title",
            fileValue.fileName
          );
          if (!fileValue.registeredId) {
            postData.append("referenceFiles[]", fileValue.file[0]);
          } else {
            postData.append(
              "referenceFileInfos[" + i + "].id",
              fileValue.registeredId
            );
            if (fileValue.fileUpdateFlag) {
              postData.append(
                "referenceFileInfos[" + i + "].fileUpdateFlag",
                fileValue.fileUpdateFlag
              );
            }
          }
        });
      }
      if (detail) {
        postData.append("detail", detail);
      }
      if (occurDateTime) {
        postData.append("occurDateTime", formatDateForPost(occurDateTime));
      }
      // 送信
      const url = $config.API_HOST + "/hiyariHatto/updatePost";
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
  }

  // 投稿一覧取得
  async function getPosts() {
    const token = getTokenFromLocalStorage(localStorage);
    if (!token) {
      return undefined;
    }
    try {
      const url = $config.API_HOST + "/hiyariHatto/listPost";
      const params = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      const res = await fetch(url, params);
      if (res.ok) {
        return await res.json();
      }
    } catch (_) {
      return undefined;
    }
    return undefined;
  }

  // 投稿の削除
  async function deletePost(id) {
    const token = getTokenFromLocalStorage(localStorage);
    if (!token) {
      return undefined;
    }
    try {
      const url = $config.API_HOST + "/hiyariHatto/deletePost";
      const params = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ id: id }),
      };
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
    updatePost,
    deletePost,
    getPosts,
  };
}
</script>
