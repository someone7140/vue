<template>
  <div>
    <div v-if="isOwnUser">
      <div class="myComment">
        <p>{{ message.message }}</p>
        <div>{{ getDisplayTime(message.send_at) }}</div>
      </div>
    </div>
    <div v-if="!isOwnUser">
      <div class="counterComment">
        <div class="faceicon">
          <profile-image-display
            :imageUrl="counter_user.image_url"
            :gender="counter_user.gender"
            :size="imageSize"
          />
        </div>
        <div class="chatting">
          <div class="says">
            <p>{{ message.message }}</p>
          </div>
          <div>{{ getDisplayTime(message.send_at) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/*左側（相手）のコメント*/
.counterComment {
  width: 100%;
  margin: 10px 0;
  overflow: hidden;
  z-index: -11;
}

.counterComment .faceicon {
  float: left;
  margin-right: -50px;
  width: 40px;
}

.counterComment .faceicon img {
  width: 100%;
  height: auto;
  border-radius: 50%;
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

<script>
import { mapState } from "vuex";
import common_mixin from "~/mixins/common_mixin.js";
import ProfileImageDisplay from "~/components/common/ProfileImageDisplayComponent.vue";

export default {
  mixins: [common_mixin],
  props: ["message", "counter_user"],
  components: {
    ProfileImageDisplay
  },
  data() {
    return {
      imageSize: 40
    };
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),
    getDisplayTime: function() {
      return function(dateTime) {
        return this.getDisplayJpDateTime(dateTime);
      };
    },
    isOwnUser: function() {
      return this.message.send_user_id == this.userInfo.user_id;
    }
  }
};
</script>
