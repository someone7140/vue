<template>
  <div v-if="position">
    <FlashMessage :position="position"></FlashMessage>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      position: undefined
    };
  },
  computed: {
    ...mapState("flashMessageStore", ["flashMessageDisp"]),
    getFlashMessageStore: function() {
      return this.flashMessageDisp;
    }
  },
  mounted() {
    this.updateFlashMessage();
  },
  methods: {
    ...mapActions("flashMessageStore", ["updateFlashMessageDisp"]),
    updateFlashMessage() {
      if (this.flashMessageDisp) {
        this.position = this.flashMessageDisp.position;
        if (this.flashMessageDisp.result == "success") {
          this.flashMessage.success({
            title: this.flashMessageDisp.title,
            message: this.flashMessageDisp.message,
            time: 5000
          });
        } else if (this.flashMessageDisp.result == "error") {
          this.flashMessage.error({
            title: this.flashMessageDisp.title,
            message: this.flashMessageDisp.message,
            time: 5000
          });
        }
        this.updateFlashMessageDisp({ flashMessageDisp: undefined });
      }
    }
  },
  watch: {
    getFlashMessageStore() {
      if (this.flashMessageDisp && this.flashMessageDisp.watchFlg) {
        this.updateFlashMessage();
      }
    }
  }
};
</script>
