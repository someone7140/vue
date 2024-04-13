interface SnackbarState {
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
