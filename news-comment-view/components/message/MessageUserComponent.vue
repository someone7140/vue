<template>
  <div>
    <span :class="getCardClass">
      <table>
        <tr>
          <td width="100">
            <nuxt-link v-bind:to="{ name: getProfileLinkPath, params: getProfileLinkParam }">
              <profile-image-display
                :imageUrl="messageUser.image_url"
                :gender="messageUser.gender"
                :size="imageSize"
              />
            </nuxt-link>
          </td>
          <td>
            <nuxt-link
              v-bind:to="{ name: messageExchangePath, query: {user_id: this.messageUser.user_id} }"
            >
              <span>
                {{ messageUser.name }}
                <br />
                {{ messageUser.recent_message }}
                <br />
                {{ getDisplayTime(messageUser.recent_message_date) }}
              </span>
            </nuxt-link>
          </td>
        </tr>
      </table>
    </span>
  </div>
</template>

<script>
import common_mixin from "~/mixins/common_mixin.js";
import ProfileImageDisplay from "~/components/common/ProfileImageDisplayComponent.vue";

export default {
  mixins: [common_mixin],
  props: ["messageUser"],
  components: {
    ProfileImageDisplay
  },
  data() {
    return {
      imageSize: 120,
      messageExchangePath: "message-message_exchange"
    };
  },
  computed: {
    getProfileLinkPath: function() {
      if (this.messageUser.user_category == "student") {
        return "account-otherStudentProfile";
      } else {
        return "company-otherCompanyProfile";
      }
    },
    getProfileLinkParam: function() {
      if (this.messageUser.user_category == "student") {
        return { otherStudentProfile: this.messageUser.user_id };
      } else {
        return { otherCompanyProfile: this.messageUser.user_id };
      }
    },
    getDisplayTime: function() {
      return function(dateTime) {
        return this.getDisplayJpDateTime(dateTime);
      };
    },
    getCardClass: function() {
      if (this.messageUser.un_read_flg) {
        return "card bg-light";
      } else {
        return "card";
      }
    }
  }
};
</script>
