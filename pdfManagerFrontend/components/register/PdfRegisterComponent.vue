<template>
  <div>
    <b-button class="btn-success" @click="modalShow"
      >PDF {{ getButtonName }}</b-button
    >
    <b-modal hide-footer v-model="modalShowFlag">
      タイトル
      <div>
        <input
          type="text"
          class="mt-2 inputPdf"
          v-model="title"
          placeholder="PDFのタイトル"
        />
      </div>
      URL
      <div>
        <input
          type="text"
          class="mt-2 inputPdf"
          v-model="url"
          placeholder="PDFのURL"
        />
      </div>
      <div v-if="regsiterErrorFlag" class="mt-2 text-danger">
        {{
          getButtonName
        }}時にエラーが発生しました。URLを確認の上、再度登録をお試しください。
      </div>
      <b-button
        class="mt-4 btn-success"
        block
        @click="registerPdf"
        :disabled="isDisableRegisterButton"
        >{{ getButtonName }}する</b-button
      >
      <b-button class="mt-3" block @click="hideModal"
        >{{ getButtonName }}せずに閉じる</b-button
      >
    </b-modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import apiMixin from "~/mixins/apiMixin.js";

export default {
  props: ["updateRefreshPdfListTimestamp", "initialData"],
  mixins: [apiMixin],
  data() {
    return {
      modalShowFlag: false,
      url: "",
      title: "",
      regsiterProcessFlag: false,
      regsiterErrorFlag: false,
    };
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),
    isDisableRegisterButton() {
      return !this.url || !this.title || this.regsiterProcessFlag;
    },
    getButtonName() {
      return this.isNewRegister ? "登録" : "編集";
    },
    isNewRegister() {
      return !this.initialData?.id;
    },
  },
  methods: {
    modalShow() {
      this.regsiterErrorFlag = false;
      this.regsiterProcessFlag = false;
      this.url = this.initialData?.url;
      this.title = this.initialData?.title;
      this.modalShowFlag = true;
    },
    hideModal() {
      this.modalShowFlag = false;
    },
    async registerPdf() {
      this.regsiterProcessFlag = true;
      const result = (await this.isNewRegister)
        ? this.postApi(
            "/pdf/add",
            {
              title: this.title,
              url: this.url,
            },
            this.userInfo.jwtToken
          )
        : this.postApi(
            "/pdf/update",
            {
              id: this.initialData?.id,
              title: this.title,
              url: this.url,
            },
            this.userInfo.jwtToken
          );
      if (result) {
        this.updateRefreshPdfListTimestamp();
        this.regsiterErrorFlag = false;
        this.regsiterProcessFlag = false;
        this.modalShowFlag = false;
        this.$bvToast.toast(this.getButtonName + "しました", {
          variant: "success",
          solid: true,
        });
      } else {
        this.regsiterErrorFlag = true;
        this.regsiterProcessFlag = false;
      }
    },
  },
};
</script>

<style>
.inputPdf {
  width: 300px;
}
</style>
