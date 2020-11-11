<template>
  <modal
    name="delete-post-modal-content"
    class="delete-confirm"
    :width="'300px'"
    :height="'150px'"
    @before-open="beforeModalOpen"
  >
    <p>記事を削除します。問題なければ「削除」ボタンを押してください。</p>
    <button class="btn btn-dark" @click="postDeleteConfirm">削除</button>&nbsp;&nbsp;&nbsp;
    <button class="btn btn-dark" @click="postDeleteCancel">キャンセル</button>
  </modal>
</template>

<script>
import { mapActions } from "vuex";
import apiMixin from "~/mixins/apiMixin.js";

export default {
  mixins: [apiMixin],
  data() {
    return {
      deletePostId: undefined,
    };
  },
  methods: {
    ...mapActions("flashMessageStore", ["updateFlashMessageDisp"]),
    beforeModalOpen(e) {
      this.deletePostId = e.params;
    },
    async postDeleteConfirm() {
      // 削除用のモーダルを非表示
      this.$modal.hide("delete-post-modal-content");
      // 削除のAPI
      const result = await this.postApi(this.$axios, "post/post_delete", {
        post_delete: {
          post_id: this.deletePostId,
        },
      });
      if (result.status == 200) {
        this.updateFlashMessageDisp({
          flashMessageDisp: {
            title: "記事削除完了",
            message: "記事を削除しました。",
            result: "success",
            watchFlg: false,
          },
        });
        // 再読み込み
        location.reload();
      } else {
        this.updateFlashMessageDisp({
          flashMessageDisp: {
            title: "エラー",
            message:
              "削除処理中にエラーが発生しました。再度エラーが発生する場合はお問い合わせください。",
            result: "error",
            watchFlg: true,
          },
        });
      }
    },
    postDeleteCancel() {
      // 削除用のモーダルを非表示
      this.$modal.hide("delete-post-modal-content");
    },
  },
};
</script>

<style>
.delete-confirm {
  text-align: center;
}
</style>
