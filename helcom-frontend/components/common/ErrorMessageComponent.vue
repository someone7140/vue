<template>
  <div
    class="alert alert-danger"
    role="alert"
    v-if="errors && errors.length > 0"
  >
    <div v-if="customMessage">
      {{ customMessage }}
    </div>
    <div v-else>
      <div v-for="error of errors" v-bind:key="error.index">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
export default { props: ["errors", "customMessage"] };
</script>
