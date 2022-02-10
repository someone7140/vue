<script>
import useAuthFunction from "./AuthFunctionComponent";

export default function usePostCategoryFunction() {
  const $config = useRuntimeConfig();
  const { getTokenFromLocalStorage } = useAuthFunction();

  // カテゴリーの追加
  async function careateCategory(name) {
    const token = getTokenFromLocalStorage(localStorage);
    if (!token) {
      return undefined;
    }
    try {
      const url = $config.API_HOST + "/hiyariHatto/createCategory";
      const params = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ name: name }),
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

  // カテゴリーの編集
  async function editCategory(id, name) {
    const token = getTokenFromLocalStorage(localStorage);
    if (!token) {
      return undefined;
    }
    try {
      const url = $config.API_HOST + "/hiyariHatto/updateCategory";
      const params = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ id: id, name: name }),
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

  // カテゴリーの削除
  async function deleteCategory(id) {
    const token = getTokenFromLocalStorage(localStorage);
    if (!token) {
      return undefined;
    }
    try {
      const url = $config.API_HOST + "/hiyariHatto/deleteCategory";
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

  // カテゴリー取得
  async function getCategories() {
    const token = getTokenFromLocalStorage(localStorage);
    if (!token) {
      return undefined;
    }
    try {
      const url = $config.API_HOST + "/hiyariHatto/listCategory";
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

  return {
    careateCategory,
    editCategory,
    deleteCategory,
    getCategories,
  };
}
</script>
