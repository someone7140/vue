<script>
export default function useAuthFunction() {
  const $config = useRuntimeConfig();
  const TOKEN_NAME = "authToken";

  // トークンからユーザ情報を取得
  async function getUserFromToken(localStorage) {
    const token = getTokenFromLocalStorage(localStorage);
    if (!token) {
      return undefined;
    }
    // APIでのtokenの検証
    try {
      const url = $config.API_HOST + "/user/loginCheckByToken";
      const params = {
        method: "POST",
        headers: {
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

  // 認証コードからユーザ情報を取得して保存
  async function getUserFromAuthCode(authCode, localStorage) {
    // APIでの認証コードの検証
    try {
      const url = $config.API_HOST + "/user/loginByAccountCode";
      const params = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accountCode: authCode }),
      };
      const res = await fetch(url, params);
      if (res.ok) {
        const user = await res.json();
        localStorage.setItem(TOKEN_NAME, user.token);
        return user;
      }
    } catch (_) {
      return undefined;
    }
    return undefined;
  }

  // LocalStorageからトークン取得
  function getTokenFromLocalStorage(localStorage) {
    return localStorage.getItem(TOKEN_NAME);
  }

  // トークン削除
  async function deleteToken(localStorage) {
    localStorage.setItem(TOKEN_NAME, undefined);
  }

  return {
    deleteToken,
    getUserFromToken,
    getUserFromAuthCode,
    getTokenFromLocalStorage,
  };
}
</script>
