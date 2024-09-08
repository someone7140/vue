<script setup lang="ts">
import { POST_PLACE_ADD_AFTER_PAGE } from '~/components/postPlace/const/postPlaceConst';

const loginState = useLoginState();
const snackbarState = useSnackbarState();

const props = defineProps({
  isMenuDisplay: {
    type: Boolean,
    default: false
  },
  changeMenuDisplay: {
    type: Function,
    default: () => { }
  },
})

const topMenu = {
  title: "Top",
  href: "/",
}

const loginMenu = {
  title: "ログイン",
  href: "/userAccount/login",
}

const accountUserAddMenu = {
  title: "会員登録",
  href: "/userAccount/registerAuth",
}

const logoutMenu = {
  title: "ログアウト",
  href: "/",
  isActive: (_: any) => { return false }
}

const categoryList = {
  title: "カテゴリー一覧",
  href: "/postCategory/list",
}

const categoryAdd = {
  title: "カテゴリー追加",
  href: "/postCategory/add",
}

const placeList = {
  title: "場所一覧",
  href: "/postPlace/list",
}

const placeAdd = {
  title: "場所追加",
  href: `/postPlace/add?addAfter=${POST_PLACE_ADD_AFTER_PAGE.PlaceList}`,
}

const postAdd = {
  title: "投稿追加",
  href: "/post/add_select",
}

const myPostList = {
  title: "登録した投稿一覧",
  href: "/post/my_post_list",
}

const userAccountEdit = {
  title: "ユーザ設定変更",
  href: "/userAccount/edit",
}

const notLoginMenuList = [
  topMenu,
  loginMenu,
  accountUserAddMenu
]

const loginMenuList = [
  topMenu,
  {
    title: "カテゴリー管理", child: [
      categoryList, categoryAdd
    ],
  },
  {
    title: "場所管理", child: [
      placeList, placeAdd
    ],
  },
  {
    title: "投稿管理", child: [
      postAdd, myPostList
    ],
  },
  {
    title: "アカウント設定", child: [
      userAccountEdit
    ],
  },
  logoutMenu
]

const onItemClick = async (event: any, item: any, node: any) => {
  if (item.title === logoutMenu.title) {
    await authDelete()
    snackbarState.value = {
      type: "info",
      message: "ログインしました",
      active: true
    }
  }
  if (item.href) {
    props.changeMenuDisplay(false)
  }
}

</script>

<template>
  <v-navigation-drawer v-model="props.isMenuDisplay" temporary>
    <div class="mt-3">
      <sidebar-menu :menu="loginState ? loginMenuList : notLoginMenuList" :hideToggle="true"
        :onItemClick="onItemClick" />
    </div>
  </v-navigation-drawer>

</template>
