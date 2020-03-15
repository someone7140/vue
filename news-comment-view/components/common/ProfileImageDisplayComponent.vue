<template>
  <div>
    <span v-if="imageUrl">
      <img :src="imageUrl" class="profile" :style="styles" />
    </span>
    <span v-if="!imageUrl">
      <img src="~assets/default_icon.png" class="profile" :style="styles" />
    </span>
  </div>
</template>
<script>
export default {
  props: ["imageUrl", "gender", "size"],
  computed: {
    // バインドするスタイルを生成
    styles() {
      // 枠の色の初期値は黒
      var color = "#000000";
      if (this.gender == "man") {
        // 男性の場合は青
        color = "#00008b";
      } else if (this.gender == "woman") {
        // 女性の場合はオレンジ
        color = "#ffa500";
      }
      return {
        "--color": color,
        "--size": this.size + "px"
      };
    }
  }
};
</script>
<style scoped>
img.profile {
  /* デフォルトの値を宣言*/
  --color: #000000;
  --size: 100px;

  border-radius: 50%; /* 角丸半径を50%にする(=円形にする) */
  border-style: solid;
  border-color: var(--color);
  width: var(--size);
  height: var(--size);
}
</style>
