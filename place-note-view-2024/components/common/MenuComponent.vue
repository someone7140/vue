<script setup lang="ts">
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
  href: "/postPlace/add",
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
