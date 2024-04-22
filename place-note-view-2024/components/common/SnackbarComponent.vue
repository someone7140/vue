<script setup lang="ts">
const snackbarState = useSnackbarState();
const textColor = ref(snackbarState.value?.type === "error" ? "text-red-darken-1" : "text-white")

watch(snackbarState, () => {
  textColor.value = snackbarState.value?.type === "error" ? "text-red-darken-1" : "text-white"
})

</script>

<template>
  <v-snackbar v-model="snackbarState.active" :timeout="4000" color="purple-lighten-4">
    <div :class="textColor">
      {{ snackbarState?.message }}
    </div>
    <template v-slot:actions>
      <v-btn color="grey-lighten-4" variant="text" @click="snackbarState.active = false">
        閉じる
      </v-btn>
    </template>
  </v-snackbar>
</template>
