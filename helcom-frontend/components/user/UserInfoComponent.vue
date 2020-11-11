<template>
  <div class="form-group text-center">
    <tabs
      :tabs="tabs"
      :current-tab="currentTab"
      :wrapper-class="'tabs'"
      :tab-class="'tabs__item'"
      :tab-active-class="'tabs__item_active'"
      :line-class="'tabs__active-line'"
      @onClick="handleClick"
    />
    <br />
    <br />
    <div v-if="currentTab === 'profile'">
      <ProfileReferComponent :ownReferFlg="ownReferFlg" :userId="userId" />
    </div>
    <div v-if="currentTab === 'postList'">
      <PostListComponent
        :userCategory="userCategory"
        :userId="userId"
        :displayUnit="postDisplayUnit"
      />
    </div>
  </div>
</template>

<script>
import PostListComponent from "~/components/post/PostListComponent.vue";
import ProfileReferComponent from "~/components/profile/ProfileReferComponent.vue";

export default {
  components: {
    PostListComponent,
    ProfileReferComponent,
  },
  props: ["ownReferFlg", "userId", "tabParam"],
  data() {
    return {
      tabs: [
        { title: "プロフィール", value: "profile" },
        { title: "投稿記事一覧", value: "postList" },
      ],
      currentTab: "profile",
      userCategory: undefined,
      postDisplayUnit: 10,
    };
  },
  created() {
    if (this.ownReferFlg) {
      this.userCategory = "own";
    } else {
      this.userCategory = "other";
    }
    if (this.tabParam) {
      this.currentTab = this.tabParam;
    }
  },
  methods: {
    handleClick(newTab) {
      this.currentTab = newTab;
    },
  },
};
</script>

<style>
.tabs {
  position: relative;
  margin: 0 auto;
}

.tabs__item {
  display: inline-block;
  margin: 0 20px;
  padding: 10px;
  padding-bottom: 8px;
  font-size: 16px;
  letter-spacing: 0.8px;
  color: gray;
  text-decoration: none;
  border: none;
  background-color: transparent;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition: all 0.25s;
}

.tabs__item_active {
  color: black;
}

.tabs__item:hover {
  border-bottom: 2px solid gray;
  color: black;
}

.tabs__item:focus {
  outline: none;
  border-bottom: 2px solid gray;
  color: black;
}

.tabs__item:first-child {
  margin-left: 0;
}

.tabs__item:last-child {
  margin-right: 0;
}

.tabs__active-line {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background-color: black;
  transition: transform 0.4s ease, width 0.4s ease;
}
</style>
