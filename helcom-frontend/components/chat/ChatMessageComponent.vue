<template>
  <div>
    <div v-if="messageObj.tyoe == 'error'">
      <div class="chatting">
        <div class="says error">
          <p>{{ messageObj.contents }}</p>
        </div>
      </div>
    </div>
    <div v-else>
      <div v-if="isOwnUser">
        <div class="myComment">
          <p>{{ messageObj.contents }}</p>
          <div>{{ displayDate }}</div>
        </div>
      </div>
      <div v-else>
        <div class="chatting">
          <div class="says">
            <p>{{ messageObj.contents }}</p>
          </div>
        </div>
        <div v-if="messageObj.user_id">
          <nuxt-link :to="userUrl" target="_blank">
            <ImageIconComponent :imgSrc="messageObj.image_url" :size="iconSize" :otherFlg="'true'" />
          </nuxt-link>
          &nbsp;&nbsp;{{ messageObj.user_name }}
        </div>
        <div v-else>退会済みユーザ</div>
        <div>{{ displayDate }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import commonMixin from "~/mixins/commonMixin.js";
import ImageIconComponent from "~/components/common/ImageIconComponent.vue";

export default {
  mixins: [commonMixin],
  props: ["messageObj"],
  components: {
    ImageIconComponent,
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),
    isOwnUser() {
      return this.messageObj.user_id == this.userInfo.user_id;
    },
  },
  data() {
    return {
      displayDate: undefined,
      userUrl: undefined,
      iconSize: 50,
    };
  },
  created() {
    this.displayDate = this.getDisplayJpDateTime(
      new Date(this.messageObj.created_at)
    );
    this.userUrl = "/profile/profile_refer?user_id=" + this.messageObj.user_id;
  },
  mounted() {
    if (this.messageObj.scroll) {
      // メッセージを読み込んだら最下段に移動させる
      const el = document.getElementById("scrollEnd");
      if (el) {
        el.scrollIntoView();
      }
    }
  },
};
</script>
<style>
/*左側（相手）のコメント*/
.counterComment {
  width: 100%;
  margin: 10px 0;
  overflow: hidden;
  z-index: -11;
}
.counterComment .chatting {
  width: 100%;
  text-align: left;
  z-index: -11;
}
.says {
  display: inline-block;
  position: relative;
  margin: 0 0 0 50px;
  padding: 10px;
  max-width: 250px;
  border-radius: 12px;
  background: #edf1ee;
  z-index: -11;
}
.says:after {
  content: "";
  display: inline-block;
  position: absolute;
  top: 3px;
  left: -19px;
  border: 8px solid transparent;
  border-right: 18px solid #edf1ee;
  -webkit-transform: rotate(35deg);
  transform: rotate(35deg);
  z-index: -11;
}
.says p {
  margin: 0;
  padding: 0;
  z-index: -11;
  white-space: pre-wrap;
}
.error {
  background: #ffcc99;
}
.error:after {
  background: #ffcc99;
}

/*右側（自分）の緑コメント*/
.myComment {
  margin: 10px 0;
  text-align: right;
  z-index: -11;
}
.myComment p {
  display: inline-block;
  position: relative;
  margin: 0 10px 0 0;
  padding: 8px;
  max-width: 250px;
  border-radius: 12px;
  background: #30e852;
  font-size: 15px;
  z-index: -11;
  white-space: pre-wrap;
  text-align: left;
}

.myComment p:after {
  content: "";
  position: absolute;
  top: 3px;
  right: -19px;
  border: 8px solid transparent;
  border-left: 18px solid #30e852;
  -webkit-transform: rotate(-35deg);
  transform: rotate(-35deg);
  z-index: -11;
}
</style>
