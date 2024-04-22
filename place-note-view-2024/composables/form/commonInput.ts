export const commonInput = () => {
  const requiredValidation = (value: string) => !!value || "入力は必須です";
  const numberValidation = (value: string) =>
    !value || !Number.isNaN(parseInt(value)) || "数値を入力してください";
  return { requiredValidation, numberValidation };
};
