import Vue from "vue";
// 使用する機能
import {
  ValidationProvider,
  ValidationObserver,
  localize,
  extend
} from "vee-validate";

// エラーメッセージの日本語化用
import ja from "vee-validate/dist/locale/ja.json";

// 使用するvalidate rule
import { required, min, email, alpha_dash } from "vee-validate/dist/rules";
extend("required", {
  ...required,
  message: "入力必須の項目です"
});
extend("email", {
  ...email,
  message: "メールアドレスの形式で入力してください"
});
extend("min", {
  ...min,
  message: "入力文字数が足りません"
});
extend("alpha_dash", {
  ...alpha_dash,
  message: "半角英数字で入力してください"
});
extend("passwordReInput", {
  params: ["target"],
  validate(value, { target }) {
    return value === target;
  },
  message: "上のパスワード欄と同様のものを入力して下さい"
});

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
localize("ja", ja);
