<template>
  <span>
    <span v-if="imgSrc">
      <img class="user-icon rounded-circle" :src="imgSrc" :style="styles" />
    </span>
    <span v-else-if="userInfo.image_url && !otherFlg">
      <img
        class="user-icon rounded-circle"
        :src="userInfo.image_url"
        :style="styles"
      />
    </span>
    <span v-else>
      <img
        class="user-icon rounded-circle"
        :src="defaultUserIcon"
        :style="styles"
      />
    </span>
  </span>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  props: ["imgSrc", "size", "otherFlg"],
  data() {
    return {
      defaultUserIcon: "/frontend/default_user_icon.png"
    };
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),
    styles() {
      return {
        "--size": this.size + "px"
      };
    }
  }
};
</script>

<style scoped>
.user-icon {
  --size: 100px;
  width: var(--size);
  height: var(--size);
}
</style>
