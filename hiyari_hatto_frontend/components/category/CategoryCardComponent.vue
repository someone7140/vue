<template>
  <v-card class="card">
    <v-list-item-title class="card-title ml-4 mt-2">
      {{ displayCategory.name }}
    </v-list-item-title>
    <v-list-item-subtitle class="ml-6 mt-4"
      >{{
        getFormatDateFromDateStr(displayCategory.registerDateTime)
      }}登録</v-list-item-subtitle
    >
    <v-card-actions>
      <v-row class="justify-center mt-1">
        <v-col class="ml-2">
          <CategoryRegisterDialogComponent
            :categoryDetail="displayCategory"
            :reloadCategories="reloadCategories"
          />
        </v-col>
        <v-col>
          <CategoryDeleteDialogComponent
            :categoryDetail="displayCategory"
            :reloadCategories="reloadCategories"
          />
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
import { defineComponent } from "vue";

import CategoryDeleteDialogComponent from "./CategoryDeleteDialogComponent";
import CategoryRegisterDialogComponent from "./CategoryRegisterDialogComponent";
import useDateFunction from "../../customFunction/DateFunctionComponent.vue";

export default defineComponent({
  props: ["displayCategory", "reloadCategories"],
  components: {
    CategoryDeleteDialogComponent,
    CategoryRegisterDialogComponent,
  },
  async setup() {
    const app = getCurrentInstance();
    const displayCategory = app.props.displayCategory;
    const reloadCategories = app.props.reloadCategories;

    const { getFormatDateFromDateStr } = useDateFunction();

    return { displayCategory, reloadCategories, getFormatDateFromDateStr };
  },
});
</script>

<style scoped>
.card {
  height: 150px;
  max-width: 450px;
  width: 100%;
  margin-bottom: 30px;
}
.card-title {
  height: 25px;
  width: 350px;
  font-size: 1.5em;
}
</style>
