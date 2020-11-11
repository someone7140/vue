<template>
  <modal
    name="whistle-post-modal-content"
    class="whistle-confirm"
    :width="'300px'"
    :height="'300px'"
    @before-open="beforeModalOpen"
  >
    <p>通報内容を入力の上「通報」ボタンを押してください。</p>
    <br />
    <div class="form-group">
      <label for="introduction">通報内容</label>
      <textarea class="form-control" rows="3" v-model="whistleContents" />
    </div>
    <br />
    <button class="btn btn-dark" @click="postWhistleConfirm" :disabled="!enableWhistleSend">通報</button>&nbsp;&nbsp;&nbsp;
    <button class="btn btn-dark" @click="postWhistleCancel">キャンセル</button>
  </modal>
</template>

<script>
import { mapActions } from "vuex";
import apiMixin from "~/mixins/apiMixin.js";

export default {
  mixins: [apiMixin],
  data() {
    return {
      postId: undefined,
      whistleContents: undefined,
    };
  },
  computed: {
    enableWhistleSend() {
      return this.whistleContents;
    },
  },
  methods: {
    ...mapActions("flashMessageStore", ["updateFlashMessageDisp"]),
    beforeModalOpen(e) {
      this.postId = e.params;
    },
    async postWhistleConfirm() {
      // 通報のAPI
      const result = await this.postApi(this.$axios, "post/post_whistle_send", {
        post_whistle_send: {
          post_id: this.postId,
          contents: this.whistleContents,
        },
      });
      // 通報用のモーダルを非表示
      this.$modal.hide("whistle-post-modal-content");
      if (result.status == 200) {
        this.updateFlashMessageDisp({
          flashMessageDisp: {
            title: "通報完了",
            message: "記事を通報しました。",
            result: "success",
            watchFlg: true,
          },
        });
      } else {
        this.updateFlashMessageDisp({
          flashMessageDisp: {
            title: "エラー",
            message:
              "処理中にエラーが発生しました。再度エラーが発生する場合はお問い合わせください。",
            result: "error",
            watchFlg: true,
          },
        });
      }
      this.whistleContents = undefined;
    },
    postWhistleCancel() {
      // 通報用のモーダルを非表示
      this.whistleContents = undefined;
      this.$modal.hide("whistle-post-modal-content");
    },
  },
};
</script>

<style>
.whistle-confirm {
  text-align: center;
}
</style>
