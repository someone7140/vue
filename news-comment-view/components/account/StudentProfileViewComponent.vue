<template>
  <div>
    <div id="fixArea" :style="styles">
      <div>プロフィール参照</div>
      <br />
      <div v-if="!isOwnUser">
        <button type="button" @click="backToBefore">前の画面に戻る</button>
      </div>
      <table>
        <tr>
          <td>
            <profile-image-display
              :imageUrl="student.image_url"
              :gender="student.gender"
              :size="imageSize"
            />
          </td>
          <td>
            <b>{{ student.name }}</b>
            <br />
            {{ student.year }}&nbsp;&nbsp;{{ student.department }}
            <br />
            {{ getPrefecture }}
            <br />
            <div v-if="isDisplayDm">
              <button type="button" @click="toMessageScreen">メッセージを送る</button>
            </div>
          </td>
        </tr>
      </table>

      <br />
      <div id="tabs">
        <input type="radio" value="introduction" id="introduction" v-model="tabActive" />
        <label for="introduction">プロフィール詳細</label>

        <input type="radio" value="comment" id="comment" v-model="tabActive" />
        <label for="comment">コメント一覧</label>
      </div>
    </div>
    <div>
      <div v-if="tabActive == 'introduction'" class="detail">
        <h5>自己紹介</h5>
        {{ student.introduction }}
        <h5>資格</h5>
        <span v-for="certification of student.certification" v-bind:key="certification.index">
          <span class="badge badge-success">{{ certification }}</span>&nbsp;
        </span>
        <br />
        <br />
        <h5>興味のある業種・職種</h5>
        <span v-for="interest of student.interest" v-bind:key="interest.index">
          <span class="badge badge-primary">{{ interest }}</span>&nbsp;
        </span>
      </div>
      <div v-if="tabActive == 'comment'" class="detail">
        <div
          v-for="commentWithNews of displayCommentWithNewsList"
          v-bind:key="commentWithNews.index"
        >
          <news-detail-in-comment :news="commentWithNews" />
          <div v-if="isOwnUser">
            <own-comment-component :commentNews="commentWithNews" />
          </div>
          <div v-if="!isOwnUser">
            <textarea
              readonly
              cols="35"
              rows="3"
              v-model="commentWithNews.comments[0].post_comment"
              name="comment"
            />
          </div>
          <br />
        </div>
        <infinite-loading ref="infiniteLoading" spinner="spiral" @infinite="infiniteHandler">
          <span slot="no-more">結果は以上です</span>
          <span slot="no-results">結果は以上です</span>
        </infinite-loading>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import api_mixin from "~/mixins/api_mixin.js";
import common_mixin from "~/mixins/common_mixin.js";
import NewsDetailInComment from "~/components/news/NewsDetailInCommentComponent.vue";
import OwnCommentComponent from "~/components/comment/OwnCommentComponent.vue";
import ProfileImageDisplay from "~/components/common/ProfileImageDisplayComponent.vue";

export default {
  mixins: [api_mixin, common_mixin],
  props: ["student"],
  components: {
    NewsDetailInComment,
    OwnCommentComponent,
    ProfileImageDisplay
  },
  data() {
    return {
      imageSize: 120,
      tabActive: "introduction",
      commentWithNewsList: [],
      displayCommentWithNewsList: []
    };
  },
  computed: {
    ...mapState("masterStore", ["masterList"]),
    ...mapState("userStore", ["userInfo", "isSignedIn"]),
    ...mapState("historyBackStore", ["historyBackFlg"]),
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
    isOwnUser: function() {
      return this.userInfo && this.student.user_id == this.userInfo.user_id;
    },
    isDisplayDm: function() {
      return (
        this.userInfo &&
        this.userInfo.user_category != "student" &&
        !this.isOwnUser
      );
    },
    getPrefecture() {
      return this.getDisplayPrefecture(this.student.prefecture_code);
    },
    getTabActive: function() {
      return this.tabActive;
    }
  },
  methods: {
    ...mapActions("historyBackStore", ["updateHistoryBackFlg"]),
    backToBefore() {
      this.updateHistoryBackFlg({ historyBackFlg: "true" });
      this.$router.go(-1);
    },
    async getCommentInfo() {
      let response = await this.getReponseApi(
        this.$axios,
        this.isOwnUser
          ? "getCommentFilterUser"
          : "getCommentFilterUser?user_id=" + this.student.user_id
      );
      if (response.status == 200 && response.data) {
        this.commentWithNewsList = response.data;
      }
    },
    async created() {
      if (this.historyBackFlg == "true") {
        this.updateHistoryBackFlg({ historyBackFlg: "false" });
      }
    },
    infiniteHandler() {
      setTimeout(() => {
        let commentWithNewsListLength = this.commentWithNewsList.length;
        let displayCommentWithNewsListLength = this.displayCommentWithNewsList
          ? this.displayCommentWithNewsList.length
          : 0;
        // 全件リストと表示リストの件数比較
        if (commentWithNewsListLength != displayCommentWithNewsListLength) {
          this.updateDisplayCommentList(
            commentWithNewsListLength,
            displayCommentWithNewsListLength
          );
          this.$refs.infiniteLoading.stateChanger.loaded();
        } else {
          this.$refs.infiniteLoading.stateChanger.complete();
        }
      }, 1000);
    },
    updateDisplayCommentList(
      commentWithNewsListLength,
      displayCommentWithNewsListLength
    ) {
      let undisplaySize =
        commentWithNewsListLength - displayCommentWithNewsListLength;
      let updatedDisplay = [];
      if (undisplaySize > 0) {
        let diff = commentWithNewsListLength - undisplaySize;
        // 10件ずつ読み込み
        let getDisplaySize = undisplaySize >= 10 ? 10 : undisplaySize;
        let appendDisplayList = this.commentWithNewsList.slice(
          diff,
          diff + getDisplaySize
        );
        if (displayCommentWithNewsListLength > 0) {
          updatedDisplay = this.displayCommentWithNewsList.concat(
            appendDisplayList
          );
        } else {
          updatedDisplay = appendDisplayList;
        }
      }
      this.displayCommentWithNewsList = updatedDisplay;
    },
    toMessageScreen() {
      this.$router.push({
        path: "/message/message_exchange?user_id=" + this.student.user_id
      });
    }
  },
  watch: {
    getTabActive() {
      // タブが切り替わったらdisplayは0件で初期化
      if (this.tabActive == "comment") {
        this.getCommentInfo();
        this.displayCommentWithNewsList = [];
      }
    }
  }
};
</script>
<style scoped>
h5 {
  padding: 0.5em; /*文字周りの余白*/
  color: #ffffff; /*文字色*/
  background: #a9a9a9; /*背景色*/
}
#tabs {
  overflow: hidden;
}
#fixArea {
  /* デフォルトの値を宣言*/
  --fixPos: 50px;

  position: sticky;
  top: var(--fixPos);
  background-color: #ffffff;
}
.detail {
  z-index: -11;
}
#tabs input {
  display: none;
}

#tabs label {
  display: inline-block;
  line-height: 40px;
  width: 150px;
  text-align: center;
  cursor: pointer;
  background: #eee;
  transition: 0.3s;
  border-radius: 10px 10px 0 0;
}

#tabs input:checked + label,
#tabs label:hover {
  background: #56b4be;
  color: #fff;
}
</style>
