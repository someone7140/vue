<template>
  <div>
    <div v-if="getOtherCommentListDisplay">
      <div
        v-for="commentInfo of displayOtherCommentList"
        v-bind:key="commentInfo.index"
        id="commentList"
      >
        <nuxt-link
          v-bind:to="{ name: 'account-otherStudentProfile', params: { otherStudentProfile: commentInfo.user_id } }"
          class="card,commentcard"
        >
          <table>
            <tr>
              <td width="120">
                <profile-image-display
                  :imageUrl="commentInfo.image_url"
                  :gender="commentInfo.gender"
                  :size="imageSize"
                />
              </td>
              <td>
                <b>{{ commentInfo.name }}</b>
                <br />
                {{ commentInfo.year }}&nbsp;&nbsp;{{ commentInfo.department }}
                <br />
                {{ getPrefecture(commentInfo.prefecture_code) }}
              </td>
            </tr>
          </table>
        </nuxt-link>
        <br />
        <textarea readonly cols="35" rows="3" v-model="commentInfo.comment" name="comment" />
        <br />
        更新日時：{{ getDisplayTime(commentInfo.comment_updated_at) }}
      </div>
      <infinite-loading ref="infiniteLoading" spinner="spiral" @infinite="infiniteHandler">
        <span slot="no-more">コメントの結果は以上です</span>
        <span slot="no-results">コメントの結果は以上です</span>
      </infinite-loading>
    </div>
  </div>
</template>
<style>
#commentList {
  z-index: -11;
}
.commentcard {
  z-index: -11;
}
</style>
<script>
import { mapState, mapActions } from "vuex";
import common_mixin from "~/mixins/common_mixin.js";
import ProfileImageDisplay from "~/components/common/ProfileImageDisplayComponent.vue";

export default {
  mixins: [common_mixin],
  components: {
    ProfileImageDisplay
  },
  data() {
    return {
      imageSize: 100
    };
  },
  computed: {
    ...mapState("masterStore", ["masterList"]),
    ...mapState("commentStore", [
      "otherCommentList",
      "displayOtherCommentList"
    ]),
    // バインドするスタイルを生成
    styles() {
      // 固定位置の初期値は50px
      var fixPos = "50px";
      if (this.isSignedIn) {
        fixPos = "66px";
      }
      return {
        "--fixPos": fixPos
      };
    },
    getPrefecture: function() {
      return function(prefectureCode) {
        return this.getDisplayPrefecture(prefectureCode);
      };
    },
    getDisplayTime: function() {
      return function(dateTime) {
        return this.getDisplayJpDateTime(dateTime);
      };
    },
    getOtherCommentListFromStore: function() {
      return this.otherCommentList;
    },
    getOtherCommentListDisplay: function() {
      return this.otherCommentList && this.otherCommentList.length > 0;
    }
  },
  methods: {
    ...mapActions("commentStore", ["updateDisplayOtherCommentList"]),
    infiniteHandler() {
      setTimeout(() => {
        let commentInfoListListLength = this.otherCommentList.length;
        let commentInfoDisplayListLength = this.displayOtherCommentList
          ? this.displayOtherCommentList.length
          : 0;
        // 全件リストと表示リストの件数比較
        if (commentInfoListListLength != commentInfoDisplayListLength) {
          this.updateDisplayCommentList(
            commentInfoListListLength,
            commentInfoDisplayListLength
          );
          this.$refs.infiniteLoading.stateChanger.loaded();
        } else {
          this.$refs.infiniteLoading.stateChanger.complete();
        }
      }, 1000);
    },
    updateDisplayCommentList(
      commentInfoListListLength,
      commentInfoDisplayListLength
    ) {
      let undisplaySize =
        commentInfoListListLength - commentInfoDisplayListLength;
      let updatedDisplay = [];
      if (undisplaySize > 0) {
        let diff = commentInfoListListLength - undisplaySize;
        // 10件ずつ読み込み
        let getDisplaySize = undisplaySize >= 10 ? 10 : undisplaySize;
        let appendDisplayList = this.otherCommentList.slice(
          diff,
          diff + getDisplaySize
        );
        if (commentInfoDisplayListLength > 0) {
          updatedDisplay = this.displayOtherCommentList.concat(
            appendDisplayList
          );
        } else {
          updatedDisplay = appendDisplayList;
        }
      }
      this.updateDisplayOtherCommentList({
        displayOtherCommentList: updatedDisplay
      });
    }
  },
  watch: {
    getOtherCommentListFromStore() {
      // storeのothercommentlistが更新されたらdisplayは0件で初期化
      this.updateDisplayCommentList(this.otherCommentList.length, 0);
    }
  }
};
</script>
