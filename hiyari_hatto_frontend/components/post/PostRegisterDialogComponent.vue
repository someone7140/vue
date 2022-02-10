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
            <fieldset v-for="(urlField, idx) in urlFields" :key="idx">
              <br />
              <ErrorMessage
                :name="`referenceUrls[${idx}].siteName`"
                class="error"
              />
              <Field
                :id="`siteName_${idx}.siteName.id`"
                :name="`referenceUrls[${idx}].siteName`"
                v-slot="{ field }"
              >
                <v-text-field
                  v-bind="field"
                  label="サイト名"
                  style="width: 270px"
                  v-model="urlField.value.siteName"
                ></v-text-field>
              </Field>
              <ErrorMessage :name="`referenceUrls[${idx}].url`" class="error" />
              <Field
                :id="`referenceUrls_${idx}.url.id`"
                :name="`referenceUrls[${idx}].url`"
                v-slot="{ field }"
              >
                <v-text-field
                  v-bind="field"
                  label="URL"
                  style="width: 270px"
                  v-model="urlField.value.url"
                ></v-text-field
              ></Field>
              <span v-show="false">
                <Field
                  :id="`referenceUrls_${idx}.registeredId.id`"
                  :name="`referenceUrls[${idx}].registeredId`"
                ></Field>
              </span>
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
            <fieldset v-for="(fileField, idx) in fileFields" :key="idx">
              <br />
              <ErrorMessage
                :name="`referenceFiles[${idx}].fileName`"
                class="error"
              />
              <Field
                :id="`fileName_${idx}.fileName.id`"
                :name="`referenceFiles[${idx}].fileName`"
                style="width: 270px"
                v-slot="{ field }"
              >
                <v-text-field
                  v-bind="field"
                  label="ファイル名"
                  style="width: 270px"
                  v-model="fileField.value.fileName"
                ></v-text-field>
              </Field>
              <ErrorMessage
                :name="`referenceFiles[${idx}].file`"
                class="error"
              />
              <Field
                :id="`file_${idx}.file.id`"
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
              <div
                v-if="
                  !fileField.value.fileUpdateFlag &&
                  fileField.value.registeredId
                "
              >
                <PostFileDownloadComponent
                  :referenceFile="{
                    title: fileField.value.registeredFileName,
                    fileUrl: fileField.value.registeredFileUrl,
                  }"
                />
              </div>
              <span v-show="false">
                <Field
                  :id="`referenceFiles_${idx}`"
                  :name="`referenceFiles[${idx}].registeredId`"
                ></Field>
              </span>
              <span v-show="false">
                <Field
                  :id="`referenceFiles_${idx}`"
                  :name="`referenceFiles[${idx}].fileUpdateFlag`"
                ></Field>
              </span>
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

    function validateFileUpload(file) {
      const referenceFile = this.from[0].value;
      // IDが既に登録されていて変更がない場合はtrue
      if (referenceFile.registeredId && !referenceFile.fileUpdateFlag) {
        if (file && file.length > 0) {
          const idx = fileFields.value.findIndex(
            (f) => f.value.registeredId == referenceFile.registeredId
          );
          console.log(fileFields.value);
          console.log(idx);
          updateFile(idx, { ...referenceFile, fileUpdateFlag: "true" });
        }
        return true;
      } else {
        if (file && file.length > 0) {
          return true;
        }
        return false;
      }
    }

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
              .test(
                "file-upload-check",
                "ファイルを登録してください",
                validateFileUpload
              ),
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
      replace: replaceUrl,
    } = useFieldArray("referenceUrls");
    // 添付ファイル
    const {
      remove: removeFile,
      push: pushFile,
      fields: fileFields,
      update: updateFile,
      replace: replaceFile,
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

    const pushUrlExec = () => {
      pushUrl({ id: undefined, siteName: "", url: "" });
    };

    const removeUrlExec = (idx) => {
      removeUrl(idx);
    };

    const pushFileExec = () => {
      pushFile({
        fileName: "",
        file: undefined,
        registeredId: undefined,
        registeredFileUrl: undefined,
        registeredFileName: undefined,
      });
    };

    const removeFileExec = (idx) => {
      removeFile(idx);
    };

    const successRegisterDisplay = () => {
      if (!postDetail) {
        root.$toast.success("投稿を登録しました");
      } else {
        root.$toast.success("投稿を更新しました");
      }
    };

    const errorRegisterDisplay = () => {
      root.$toast.error("投稿の登録に失敗しました");
    };

    const initDisplay = () => {
      // 編集時の初期表示設定
      if (postDetail) {
        title.value = postDetail.title;
        categories.value = postDetail.categoryIds;
        detail.value = postDetail.detail;
        occurDateTime.value = postDetail.occurDateTime;

        replaceUrl(
          postDetail.referenceUrls.map((referenceUrl) => {
            return {
              registeredId: referenceUrl.id,
              siteName: referenceUrl.siteName,
              url: referenceUrl.url,
            };
          })
        );
        replaceFile(
          postDetail.referenceFiles.map((referenceFile) => {
            return {
              registeredId: referenceFile.id,
              fileName: referenceFile.title,
              registeredFileUrl: referenceFile.fileUrl,
              registeredFileName: referenceFile.title,
              file: undefined,
            };
          })
        );
      }
    };

    const showDialog = () => {
      state.showDialog = true;
    };
    const hideDialog = async () => {
      state.showDialog = false;
      formContext.resetForm();
      if (postDetail) {
        const _sleep = (ms) =>
          new Promise((resolve) => setTimeout(resolve, ms));
        await _sleep(1000);
        initDisplay();
      }
    };

    async function onSubmit() {
      const varidateResult = await formContext.validate();
      if (varidateResult.valid) {
        if (!postDetail) {
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
          } catch (_) {
            errorRegisterDisplay();
          }
        } else {
          try {
            const { updatePost } = usePostFunction();
            const result = await updatePost(
              postDetail.id,
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
          } catch (_) {
            errorRegisterDisplay();
          }
        }
      }
    }
    const boundOnSubmit = onSubmit.bind(this);

    initDisplay();
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
