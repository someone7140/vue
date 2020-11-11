<template>
  <div>
    <div class="container text-center">
      <h1 class="m-5 pt-5">お問い合わせ</h1>

      <div class="text-left mx-5">
        <validation-observer v-slot="{ invalid }">
          <div class="form-group">
            <label for="title">件名</label>
            <validation-provider v-slot="{ errors }" rules="required" name="title">
              <input type="text" class="form-control" v-model="title" />
              <ErrorMessageComponent :errors="errors" />
            </validation-provider>
          </div>
          <div class="form-group">
            <label for="selectedCategory">選択してください：</label>
            <validation-provider v-slot="{ errors }" rules="required" name="selectedCategory">
              <select v-model="selectedCategory" class="form-control">
                <option
                  v-for="option in categoryList"
                  :value="option.key"
                  :key="option.key"
                >{{ option.value }}</option>
              </select>
              <ErrorMessageComponent :errors="errors" />
            </validation-provider>
          </div>
          <div class="form-group">
            <label for="contents">内容</label>
            <validation-provider v-slot="{ errors }" rules="required" name="contents">
              <textarea class="form-control" rows="3" v-model="contents" />
              <ErrorMessageComponent :errors="errors" />
            </validation-provider>
          </div>
          <div class="form-group text-right">
            <button class="btn btn-dark text-light" :disabled="invalid" @click="inquirySend">送信</button>
          </div>
        </validation-observer>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import apiMixin from "~/mixins/apiMixin.js";
import commonMixin from "~/mixins/commonMixin.js";
import ErrorMessageComponent from "~/components/common/ErrorMessageComponent.vue";
import ImageIconComponent from "~/components/common/ImageIconComponent.vue";

export default {
  mixins: [apiMixin, commonMixin],
  props: ["postId"],
  components: {
    ErrorMessageComponent,
  },
  computed: {
    ...mapState("masterStore", ["master"]),
  },
  data() {
    return {
      title: undefined,
      selectedCategory: undefined,
      contents: undefined,
      categoryList: [],
    };
  },
  async created() {
    // storeのmaster情報をコンボボックス用にセット
    this.categoryList = this.master.inquiry_category_list;
  },
  methods: {
    ...mapActions("flashMessageStore", ["updateFlashMessageDisp"]),
    async inquirySend() {
      const response = await this.postApi(this.$axios, "common/send_inquiry", {
        send_inquiry: {
          title: this.title,
          inquiry_category: this.selectedCategory,
          contents: this.contents,
        },
      });
      if (response.status == 200) {
        this.updateFlashMessageDisp({
          flashMessageDisp: {
            title: "問合せ完了",
            message: "問合せを送信しました。",
            result: "success",
            watchFlg: false,
          },
        });
        // TOPへ遷移
        this.$router.push({
          path: "/top",
        });
      } else {
        this.updateFlashMessageDisp({
          flashMessageDisp: {
            title: "エラー",
            message:
              "処理中にエラーが発生しました。再度送信してエラーが発生する場合はお問い合わせください。",
            result: "error",
            watchFlg: true,
          },
        });
      }
    },
  },
};
</script>
