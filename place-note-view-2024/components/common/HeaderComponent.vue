<script setup lang="ts">

const loginState = useLoginState();
const isMenuDisplay = ref(false)
const changeMenuDisplay = () => {
  isMenuDisplay.value = !(isMenuDisplay.value)
}

</script>

<template>
  <v-app-bar color="teal-lighten-4">
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="changeMenuDisplay"></v-app-bar-nav-icon>
    </template>
    <v-app-bar-title>Placeノート</v-app-bar-title>
    <div v-if="loginState != null" class="mr-2">
      <v-img width="30px" aspect-ratio="1/1" :src="loginState.imageUrl" v-if="loginState.imageUrl"></v-img>
      <v-icon size="x-large" v-if="!loginState.imageUrl">mdi-account</v-icon>
    </div>
    <div v-else></div>
  </v-app-bar>
  <MenuComponent :isMenuDisplay="isMenuDisplay" :changeMenuDisplay="changeMenuDisplay" />
</template>
