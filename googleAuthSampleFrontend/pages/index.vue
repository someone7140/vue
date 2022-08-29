<template>
  <LoginComponent />
</template>

<script>
import { defineComponent, reactive } from "vue";

import LoginComponent from "../components/auth/LoginComponent";

export default defineComponent({
  components: {
    LoginComponent,
  },
});
</script>
