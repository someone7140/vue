<template>
  <div class="card post-card">
    <div class="card-header back-header-footer">
      <h5 class="text-center">{{ post.title }}&nbsp;</h5>
      <div class="post-reference text-center">
        {{ postCategoryname }}&nbsp;{{ postRegistDate }}
      </div>
    </div>
    <div v-if="post.ogp">
      <img class="card-img-top post-card-img" :src="post.ogp.image_url" />
    </div>
    <div class="card-body">
      <div v-if="post.ogp">
        <h5 class="card-title">{{ post.ogp.site_name }}</h5>
        <p class="card-text">{{ post.ogp.description }}</p>
      </div>
      <div v-else>{{ post.url }}</div>
      <br />
      <button class="btn btn-dark" @click="postTransfer">記事を読む</button>
      <div v-if="userCategory == 'own'">
        <br />
        <button class="btn btn-dark" @click="postEdit">記事を編集</button
        >&nbsp;&nbsp;&nbsp;
        <button class="btn btn-dark" @click="postDelete">記事を削除</button>
      </div>
    </div>
    <div class="card-footer post-footer back-header-footer">
      <div v-if="userCategory == 'user'" class="post-footer-left">
        <nuxt-link :to="userUrl" target="_blank">
          <ImageIconComponent
            :imgSrc="post.user_image_url"
            :size="iconSize"
            :otherFlg="'true'"
          />
        </nuxt-link>
        &nbsp;&nbsp;&nbsp;&nbsp;{{ post.user_name }}
      </div>
      <div class="post-reference post-footer-right">
        アクセス数：{{ post.access_count }}&nbsp;&nbsp;
        <div v-if="userCategory == 'own'">
          <br />
          <span v-if="post.open_flg">公開中</span>
          <span v-else>非公開</span>
        </div>
        <div v-if="displayWhistleBtn">
          <br />
          <button class="btn btn-dark btn-sm whistlebtn" @click="postWhistle">
            記事を通報する
          </button>
        </div>
      </div>
    </div>
    <PostContentsDeleteModalComponent />
    <PostContentsWhistleModalComponent />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import apiMixin from "~/mixins/apiMixin.js";
import commonMixin from "~/mixins/commonMixin.js";
import ImageIconComponent from "~/components/common/ImageIconComponent.vue";
import PostContentsDeleteModalComponent from "~/components/post/PostContentsDeleteModalComponent";
import PostContentsWhistleModalComponent from "~/components/post/PostContentsWhistleModalComponent";

export default {
  mixins: [apiMixin, commonMixin],
  props: ["post", "userCategory"],
  components: {
    ImageIconComponent,
    PostContentsDeleteModalComponent
  },
  computed: {
    ...mapState("masterStore", ["master"]),
    ...mapState("userStore", ["userInfo"]),
    displayWhistleBtn() {
      return (
        this.userInfo.user_id != this.post.user_id &&
        (this.userCategory == "user" || this.userCategory == "other")
      );
    }
  },
  data() {
    return {
      ogp: undefined,
      postCategoryname: undefined,
      postRegistDate: undefined,
      userUrl: undefined,
      iconSize: 50
    };
  },
  async created() {
    // 削除用のモーダルを非表示
    this.$modal.hide("delete-post-modal-content");
    // 記事表示に必要な情報のセット
    this.postCategoryname = this.master.post_category_list.find(
      m => m.key == this.post.category
    ).value;
    this.postRegistDate = this.getDisplayJpDateTime(
      new Date(this.post.created_at)
    );
    this.userUrl = "/profile/profile_refer?user_id=" + this.post.user_id;
  },
  methods: {
    ...mapActions("flashMessageStore", ["updateFlashMessageDisp"]),
    async postTransfer() {
      // 別タブで記事を開く
      window.open(this.post.url, "_blank");
      // 踏んだユーザ数のカウント
      await this.postApi(this.$axios, "post/post_user_count", {
        post_user_count: {
          post_id: this.post.post_id
        }
      });
    },
    postEdit() {
      // 記事編集画面へ遷移
      this.$router.push({
        path: "/post/post_edit?post_id=" + this.post.post_id
      });
    },
    postDelete() {
      // 削除用のモーダルを表示
      this.$modal.show("delete-post-modal-content", this.post.post_id);
    },
    postWhistle() {
      // 通報用のモーダルを表示
      this.$modal.show("whistle-post-modal-content", this.post.post_id);
    }
  }
};
</script>

<style>
.post-card {
  max-width: 500px;
  margin: 0 auto;
}
.post-reference {
  font-size: 8pt;
  color: gray;
}
.post-footer {
  position: relative;
  height: 70px;
}
.post-footer-left {
  position: absolute;
  left: 5;
}
.post-footer-right {
  position: absolute;
  right: 0;
}
.post-card-img {
  height: 200px;
}
.whistlebtn {
  height: 20px;
  width: 88px;
  font-size: 3pt;
}
.back-header-footer {
  background: #f5deb3;
}
</style>
