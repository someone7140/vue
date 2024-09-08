export interface SnackbarState {
  type?: string;
  message?: string;
  active: boolean;
}

export const useSnackbarState = () => {
  return useState<SnackbarState>("snackbar", () => {
    return {
      active: false,
    };
  });
};

export interface UserLoginState {
  userSettingId: string;
  name: string;
  imageUrl?: string | null;
}

export const useLoginState = () => {
  return useState<UserLoginState | undefined>("userLogin", () => {
    return undefined;
  });
};

export const authSet = async (
  token: string,
  userSettingId: string,
  name: string,
  imageUrl?: string | null
) => {
  const loginState = useLoginState();
  const { onLogin } = useApollo();

  await onLogin(token);
  loginState.value = {
    userSettingId: userSettingId,
    name: name,
    imageUrl: imageUrl,
  };
};

export const authDelete = async () => {
  const loginState = useLoginState();
  const { onLogout } = useApollo();

  await onLogout();
  loginState.value = undefined;
};
