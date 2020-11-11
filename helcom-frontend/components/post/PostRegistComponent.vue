<template>
  <div>
    <section class="text-left">
      <validation-observer v-slot="{ invalid }">
        <div class="form-group">
          <label for="title">表題</label>
          <validation-provider v-slot="{ errors }" rules="required" name="title">
            <input type="text" class="form-control" v-model="title" />
            <ErrorMessageComponent :errors="errors" />
          </validation-provider>
        </div>
        <div class="form-group">
          <label for="url">記事カテゴリー</label>
          <validation-provider v-slot="{ errors }" rules="required" name="selectedCategory">
            <select v-model="selectedCategory" class="form-control">
              <optgroup v-for="g in categoryList.optGroup" :label="g.label" :key="g.key">
                <option
                  v-for="option in g.childs"
                  :value="option.value"
                  :key="option.value"
                >{{ option.label }}</option>
              </optgroup>
              <option
                v-for="option in categoryList.opt"
                :value="option.value"
                :key="option.value"
              >{{ option.label }}</option>
            </select>
            <ErrorMessageComponent :errors="errors" />
          </validation-provider>
        </div>
        <div class="form-group">
          <label for="url">URL</label>
          <validation-provider v-slot="{ errors }" rules="required" name="url">
            <input type="text" class="form-control" v-model="url" />
            <ErrorMessageComponent :errors="errors" />
          </validation-provider>
        </div>
        <div class="form-group">
          <label for="selectedOpenFlg">公開・非公開</label>
          <validation-provider v-slot="{ errors }" rules="required" name="selectedOpenFlg">
            <select v-model="selectedOpenFlg" class="form-control">
              <option
                v-for="openFlg in openFlgList"
                :value="openFlg.value"
                :key="openFlg.value"
              >{{ openFlg.label }}</option>
            </select>
            <ErrorMessageComponent :errors="errors" />
          </validation-provider>
        </div>
        <div class="form-group text-right">
          <button class="btn btn-dark text-light" :disabled="invalid" @click="postRegist">送信</button>
        </div>
      </validation-observer>
    </section>
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
    ...mapState("userStore", ["userInfo"]),
    ...mapState("masterStore", ["master"]),
  },
  data() {
    return {
      title: undefined,
      selectedCategory: undefined,
      url: undefined,
      selectedOpenFlg: true,
      categoryList: [],
      openFlgList: [
        { label: "公開", value: true },
        { label: "非公開", value: false },
      ],
    };
  },
  async created() {
    if (this.postId) {
      // 投稿IDがあるときは投稿情報を取得する。
      const response = await this.getReponseApi(
        this.$axios,
        "post/refer_own_post/" + this.postId
      );
      if (response.status == 200) {
        const post = response.post_info;
        this.title = post.title;
        this.selectedCategory = post.category;
        this.url = post.url;
        this.selectedOpenFlg = post.open_flg;
      }
    }
    // storeのmaster情報をコンボボックス用にセット
    this.categoryList = this.getNestCategoryList(
      this.master.profile_disease_group_list,
      this.master.post_category_list
    );
  },
  methods: {
    ...mapActions("flashMessageStore", ["updateFlashMessageDisp"]),
    ...mapActions("userStore", ["updateUserInfo", "updateLoginState"]),
    async postRegist() {
      var response = undefined;
      // 編集の時
      if (this.postId) {
        response = await this.postApi(this.$axios, "post/post_edit", {
          post_edit: {
            post_id: this.postId,
            title: this.title,
            url: this.url,
            category: this.selectedCategory,
            open_flg: this.selectedOpenFlg,
          },
        });
      } else {
        // 作成の時
        const postData = {
          post_create: {
            title: this.title,
            url: this.url,
            category: this.selectedCategory,
            open_flg: this.selectedOpenFlg,
          },
        };
        if (this.userInfo.role == "admin") {
          response = await this.postApi(
            this.$axios,
            "post/admin_post_create",
            postData
          );
        } else {
          response = await this.postApi(
            this.$axios,
            "post/post_create",
            postData
          );
        }
      }

      if (response.status == 200) {
        this.updateFlashMessageDisp({
          flashMessageDisp: {
            title: "記事登録完了",
            message: "記事を登録しました。",
            result: "success",
            watchFlg: false,
          },
        });
        // マイページへ遷移
        this.$router.push({
          path: "/profile/profile_mypage?tab_param=postList",
        });
      } else {
        this.updateFlashMessageDisp({
          flashMessageDisp: {
            title: "エラー",
            message:
              "登録処理中にエラーが発生しました。再度登録してエラーが発生する場合はお問い合わせください。",
            result: "error",
            watchFlg: true,
          },
        });
      }
    },
  },
};
</script>
