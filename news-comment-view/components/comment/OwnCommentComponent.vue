<template>
  <div>
    <div v-if="isDidplayCommentInput">
      <textarea
        cols="35"
        rows="3"
        v-model="ownComment"
        name="ownComment"
        placeholder="500文字以内でコメントを入力してください"
      />
      <div v-if="!ownCommentUpdatedAt">
        <button type="button" @click="addComment" :disabled="errorCommentInput">コメントを追加する</button>
      </div>
      <div v-if="ownCommentUpdatedAt">
        <button type="button" @click="editComment" :disabled="errorCommentInput">コメントを変更する</button>&nbsp;
        <button type="button" @click="deleteComment">コメントを削除する</button>
        <br />
        更新日時：{{ ownCommentUpdatedAt }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import api_mixin from "~/mixins/api_mixin.js";
import common_mixin from "~/mixins/common_mixin.js";

export default {
  mixins: [api_mixin, common_mixin],
  props: ["news", "commentNews"],
  data() {
    return {
      url: undefined,
      title: undefined,
      imageUrl: undefined,
      description: undefined,
      provider: undefined,
      category: undefined,
      datePublished: undefined,
      ownComment: undefined,
      ownCommentUpdatedAt: undefined
    };
  },
  computed: {
    ...mapState("userStore", ["userInfo", "isSignedIn"]),
    errorCommentInput: function() {
      return (
        !this.ownComment ||
        this.ownComment.length == 0 ||
        this.ownComment.length > 500
      );
    },
    isDidplayCommentInput: function() {
      return (
        this.isSignedIn &&
        this.userInfo.user_category == "student" &&
        (this.news || this.commentNews)
      );
    }
  },
  async created() {
    if (this.isSignedIn && this.news && !this.commentNews) {
      let response = await this.postApi(this.$axios, "getCommentByUrlAndUser", {
        comment_byurl: {
          url: this.news.url
        }
      });
      this.url = this.news.url;
      this.title = this.news.title;
      this.imageUrl = this.news.image_url;
      this.description = this.news.description;
      this.provider = this.news.provider;
      this.category = this.news.category;
      this.datePublished = this.news.date_published;
      if (response.status == 200 && response.data) {
        this.ownComment = response.data.post_comment;
        this.ownCommentUpdatedAt = this.getDisplayJpDateTime(
          response.data.updated_at
        );
      }
    } else if (this.isSignedIn && this.commentNews) {
      this.ownComment = this.commentNews.comments[0].post_comment;
      this.ownCommentUpdatedAt = this.getDisplayJpDateTime(
        this.commentNews.comments[0].updated_at
      );
      this.url = this.commentNews.url;
      this.title = this.commentNews.title;
      this.imageUrl = this.commentNews.image_url;
      this.description = this.commentNews.description;
      this.provider = this.commentNews.provider;
      this.category = this.commentNews.category;
      this.datePublished = this.commentNews.date_published;
    }
  },
  methods: {
    ...mapActions("flashMessageStore", ["updateFlashMessageDisp"]),
    async addComment() {
      let response = await this.postApi(this.$axios, "registComment", {
        comment_add: {
          url: this.url,
          category: this.category,
          date_published: this.datePublished,
          title: this.title,
          image_url: this.imageUrl,
          description: this.description,
          provider: this.provider,
          post_comment: this.ownComment
        }
      });
      if (response.status == 200) {
        this.ownComment = this.ownComment;
        this.ownCommentUpdatedAt = this.getNowDateTime();
        this.updateFlashMessageDisp({
          flashMessageDisp: {
            title: "登録完了",
            message: "コメントを登録しました",
            position: "right bottom",
            result: "success",
            watchFlg: true
          }
        });
      } else {
        this.errorFlash();
      }
    },
    async editComment() {
      let response = await this.postApi(this.$axios, "registComment", {
        comment_add: {
          url: this.url,
          post_comment: this.ownComment
        }
      });
      if (response.status == 200) {
        this.ownComment = this.ownComment;
        this.ownCommentUpdatedAt = this.getNowDateTime();
        this.updateFlashMessageDisp({
          flashMessageDisp: {
            title: "登録完了",
            message: "コメントを登録しました",
            position: "right bottom",
            result: "success",
            watchFlg: true
          }
        });
      } else {
        this.errorFlash();
      }
    },
    async deleteComment() {
      if (confirm("コメントを削除してよろしいですか？")) {
        let response = await this.postApi(this.$axios, "deleteComment", {
          comment_delete: {
            url: this.url
          }
        });
        if (response.status == 200) {
          this.ownComment = undefined;
          this.ownCommentUpdatedAt = undefined;
          this.updateFlashMessageDisp({
            flashMessageDisp: {
              title: "削除完了",
              message: "コメントを削除しました",
              position: "right bottom",
              result: "success",
              watchFlg: true
            }
          });
        } else {
          this.errorFlash();
        }
      }
    },
    errorFlash() {
      this.updateFlashMessageDisp({
        flashMessageDisp: {
          title: "エラー",
          message: "コメント登録時にエラーが発生しました",
          position: "right bottom",
          result: "error",
          watchFlg: true
        }
      });
    }
  }
};
</script>
