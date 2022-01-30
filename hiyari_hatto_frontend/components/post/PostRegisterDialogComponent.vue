<template>
  <v-btn rounded color="primary" @click="showDialog">{{
    postDetail ? "投稿編集" : "投稿登録"
  }}</v-btn>
  <v-dialog v-model="state.showDialog" scrollable>
    <div class="justify-center dialogCardDiv">
      <v-card class="dialogCard">
        <div class="mt-3" style="display: flex; justify-content: space-between">
          <div class="ml-3">
            <b>{{ postDetail ? "投稿編集" : "投稿登録" }}</b>
          </div>
          <div class="mr-3" role="button" @click="hideDialog">
            <v-icon>mdi-close-circle</v-icon>
          </div>
        </div>
        <br />
        <v-card-text style="height: 550px">
          <span class="error">{{ titleError }}</span>
          <v-text-field
            v-model="titleValue"
            label="タイトル"
            data-vv-validate-on="change"
            style="width: 280px"
          ></v-text-field>
          <Multiselect
            v-model="categoriesValue"
            :options="categoryOptions"
            mode="tags"
            placeholder="カテゴリー選択"
          />
          <br />
          <br />
          <v-textarea
            label="詳細"
            v-model="detailValue"
            style="width: 280px"
            rows="3"
            auto-grow
          ></v-textarea>
          <span>
            参考URL
            <v-btn
              class="ml-2 mb-1"
              icon
              width="20"
              height="20"
              color="indigo"
              @click="pushUrlExec"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <fieldset v-for="(field, idx) in urlFields" :key="idx">
              <br />
              <ErrorMessage
                :name="`referenceUrls[${idx}].siteName`"
                class="error"
              />
              <Field
                :id="`siteName_${idx}`"
                :name="`referenceUrls[${idx}].siteName`"
                v-slot="{ field }"
              >
                <v-text-field
                  v-bind="field"
                  label="サイト名"
                  style="width: 270px"
                ></v-text-field>
              </Field>
              <ErrorMessage :name="`referenceUrls[${idx}].url`" class="error" />
              <Field
                :id="`referenceUrls_${idx}`"
                :name="`referenceUrls[${idx}].url`"
                v-slot="{ field }"
              >
                <v-text-field
                  v-bind="field"
                  label="URL"
                  style="width: 270px"
                ></v-text-field
              ></Field>
              <v-btn
                class="ml-2 mb-1"
                icon
                width="20"
                height="20"
                color="indigo"
                @click="
                  () => {
                    removeUrlExec(idx);
                  }
                "
              >
                <v-icon>mdi-minus</v-icon>
              </v-btn>
            </fieldset>
          </span>
          <br />
          <br />
          <span>
            添付ファイル
            <v-btn
              class="ml-2 mb-1"
              icon
              width="20"
              height="20"
              color="indigo"
              @click="pushFileExec"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <fieldset v-for="(field, idx) in fileFields" :key="idx">
              <br />
              <ErrorMessage
                :name="`referenceFiles[${idx}].fileName`"
                class="error"
              />
              <Field
                :id="`fileName_${idx}`"
                :name="`referenceFiles[${idx}].fileName`"
                style="width: 270px"
                v-slot="{ field }"
              >
                <v-text-field
                  v-bind="field"
                  label="ファイル名"
                  style="width: 270px"
                ></v-text-field>
              </Field>
              <ErrorMessage
                :name="`referenceFiles[${idx}].file`"
                class="error"
              />
              <Field
                :id="`file_${idx}`"
                :name="`referenceFiles[${idx}].file`"
                v-slot="{ handleChange }"
              >
                <input
                  type="file"
                  style="width: 270px"
                  @change="handleChange"
                />
              </Field>
              <br />
              <br />
              <v-btn
                class="ml-2 mb-1"
                icon
                width="20"
                height="20"
                color="indigo"
                @click="
                  () => {
                    removeFileExec(idx);
                  }
                "
              >
                <v-icon>mdi-minus</v-icon>
              </v-btn>
            </fieldset>
          </span>
          <br />
          <br />
          発生日時
          <v-date-picker v-model="occurDateTimeValue" mode="dateTime" />
          <br />
          <br />
          <div class="text-center">
            <v-btn type="submit" color="#98fb98" @click="boundOnSubmit"
              >登録する</v-btn
            >
            <v-btn class="ml-6" color="#EEEEEE" @click="hideDialog"
              >閉じる</v-btn
            >
          </div>
          <br />
        </v-card-text>
      </v-card>
    </div>
  </v-dialog>
</template>

<script>
import { defineComponent, getCurrentInstance } from "vue";
import {
  useField,
  useFieldArray,
  useForm,
  ErrorMessage,
  Field,
} from "vee-validate";
import * as yup from "yup";
import Multiselect from "@vueform/multiselect";
import usePostFunction from "../../customFunction/PostFunctionComponent";

export default defineComponent({
  props: ["postDetail", "reloadPosts", "categories"],
  components: {
    ErrorMessage,
    Field,
    Multiselect,
  },
  setup() {
    const app = getCurrentInstance();
    const root = app.appContext.config.globalProperties;
    const props = app.props;
    const postDetail = props.postDetail;

    const categoryOptions = props.categories.map((c) => {
      return {
        label: c.name,
        value: c.id,
      };
    });

    // 入力フォームの設定
    const postRegisterSchema = yup.object({
      title: yup.string().required("タイトルは必須項目です"),
      referenceUrls: yup
        .array()
        .of(
          yup.object().shape({
            siteName: yup.string().required("サイト名を入力してください"),
            url: yup.string().required("urlを入力してください"),
          })
        )
        .strict(),
      referenceFiles: yup
        .array()
        .of(
          yup.object().shape({
            fileName: yup.string().required("ファイル名を入力してください"),
            file: yup
              .array()
              .required("ファイルを選択してください")
              .min(1, "ファイルを選択してください"),
          })
        )
        .strict(),
    });
    const formContext = useForm({
      validationSchema: postRegisterSchema,
    });
    // タイトル
    const { value: title, errorMessage: titleError } = useField("title");
    const titleValue = computed({
      get: () => title.value,
      set: (value) => {
        title.value = value;
      },
    });
    // カテゴリー選択
    const { value: categories } = useField("categories");
    const categoriesValue = computed({
      get: () => categories.value,
      set: (value) => {
        categories.value = value;
      },
    });
    // url
    const {
      remove: removeUrl,
      push: pushUrl,
      fields: urlFields,
    } = useFieldArray("referenceUrls");
    // 添付ファイル
    const {
      remove: removeFile,
      push: pushFile,
      fields: fileFields,
    } = useFieldArray("referenceFiles");
    // 詳細
    const { value: detail } = useField("detail");
    const detailValue = computed({
      get: () => detail.value,
      set: (value) => {
        detail.value = value;
      },
    });
    // 発生日時
    const { value: occurDateTime } = useField("occurDateTime");
    const occurDateTimeValue = computed({
      get: () => occurDateTime.value,
      set: (value) => {
        occurDateTime.value = value;
      },
    });

    const state = reactive({
      showDialog: false,
    });
    const showDialog = () => {
      state.showDialog = true;
    };
    const hideDialog = () => {
      state.showDialog = false;
      formContext.resetForm();
    };

    const pushUrlExec = () => {
      pushUrl({ siteName: "", url: "" });
    };

    const removeUrlExec = (idx) => {
      removeUrl(idx);
    };

    const pushFileExec = () => {
      pushFile({ fileName: "", file: undefined });
    };

    const removeFileExec = (idx) => {
      removeFile(idx);
    };

    const successRegisterDisplay = () => {
      root.$toast.success("投稿を登録しました");
    };

    const errorRegisterDisplay = () => {
      root.$toast.error("投稿の登録に失敗しました");
    };

    async function onSubmit() {
      const varidateResult = await formContext.validate();
      if (varidateResult.valid) {
        try {
          const { careatePost } = usePostFunction();
          const result = await careatePost(
            titleValue.value,
            categoriesValue.value,
            urlFields.value,
            fileFields.value,
            detailValue.value,
            occurDateTimeValue.value
          );
          if (result) {
            successRegisterDisplay();
            await props.reloadPosts();
            state.showDialog = false;
          } else {
            errorRegisterDisplay();
          }
        } catch (e) {
          errorRegisterDisplay();
        }
      }
    }
    const boundOnSubmit = onSubmit.bind(this);

    return {
      postDetail,
      categoryOptions,
      titleValue,
      titleError,
      categoriesValue,
      detailValue,
      urlFields,
      pushUrlExec,
      removeUrlExec,
      fileFields,
      pushFileExec,
      removeFileExec,
      occurDateTimeValue,
      state,
      showDialog,
      hideDialog,
      boundOnSubmit,
    };
  },
});
</script>

<style scoped>
.dialogCardDiv {
  position: absolute;
  top: -250px;
  right: -30px;
}
.dialogCard {
  width: 300px;
  overflow-y: scroll;
}
.error {
  color: red;
}
</style>

<style src="@vueform/multiselect/themes/default.css"></style>
