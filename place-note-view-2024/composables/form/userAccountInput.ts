export interface UserAccountInputForm {
  userSettingId?: string;
  name?: string;
}

export const userAccountInput = () => {
  const requiredValidation = (value: string) => !!value || "入力は必須です";
  return { requiredValidation };
};
