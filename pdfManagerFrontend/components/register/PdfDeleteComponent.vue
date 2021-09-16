<template>
  <div>
    <b-button class="btn-secondary" @click="modalShow">PDF削除</b-button>
    <b-modal hide-footer v-model="modalShowFlag">
      <div>{{ deleteData.title }}を削除します。よろしいですか。</div>
      <div v-if="deleteErrorFlag" class="mt-2 text-danger">
        削除時にエラーが発生しました。再度削除をお試しください。
      </div>
      <b-button
        class="mt-4 btn-warning"
        block
        @click="deletePdf"
        :disabled="isDisableDeleteButton"
        >削除する</b-button
      >
      <b-button class="mt-3" block @click="hideModal"
        >削除せずに閉じる</b-button
      >
    </b-modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import apiMixin from "~/mixins/apiMixin.js";

export default {
  props: ["updateRefreshPdfListTimestamp", "deleteData"],
  mixins: [apiMixin],
  data() {
    return {
      modalShowFlag: false,
      deleteProcessFlag: false,
      deleteErrorFlag: false,
    };
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),
    isDisableDeleteButton() {
      return this.deleteProcessFlag;
    },
  },
  methods: {
    modalShow() {
      this.deleteErrorFlag = false;
      this.deleteProcessFlag = false;
      this.modalShowFlag = true;
    },
    hideModal() {
      this.modalShowFlag = false;
    },
    async deletePdf() {
      this.deleteProcessFlag = true;
      const result = this.postApi(
        "/pdf/delete",
        {
          id: this.deleteData.id,
        },
        this.userInfo.jwtToken
      );
      if (result) {
        this.updateRefreshPdfListTimestamp();
        this.deleteErrorFlag = false;
        this.deleteProcessFlag = false;
        this.modalShowFlag = false;
        this.$bvToast.toast("削除しました", {
          variant: "success",
          solid: true,
        });
      } else {
        this.regsiterErrorFlag = true;
        this.deleteErrorFlag = false;
      }
    },
  },
};
</script>
