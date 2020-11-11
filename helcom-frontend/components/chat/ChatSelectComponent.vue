<template>
  <div>
    <font-awesome-icon icon="door-open" class="fa-5x" />
    <br />
    <br />
    <div class="text-left mx-5">
      <validation-observer v-slot="{ invalid }">
        <div class="form-group">
          <label for="selectedCategory">部屋を選択してください：</label>
          <validation-provider v-slot="{ errors }" rules="required" name="selectedCategory">
            <select v-model="selectedCategory" class="form-control">
              <option
                v-for="option in categoryList"
                :value="option.key"
                :key="option.key"
              >{{ option.value }}</option>
            </select>
            <ErrorMessageComponent :errors="errors" />
          </validation-provider>
        </div>
        <div class="form-group text-right">
          <button
            class="btn btn-dark text-light"
            :disabled="invalid"
            @click="transferGroupChat"
          >グループチャット&raquo;</button>
          <br />
          <br />
          <button
            class="btn btn-dark text-light"
            :disabled="invalid"
            @click="transferPersonalChat"
          >一対一チャット&raquo;</button>
        </div>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import apiMixin from "~/mixins/apiMixin.js";
import ErrorMessageComponent from "~/components/common/ErrorMessageComponent.vue";

export default {
  components: {
    ErrorMessageComponent,
  },
  computed: {
    ...mapState("masterStore", ["master"]),
  },
  mixins: [apiMixin],
  data() {
    return {
      title: undefined,
      selectedCategory: undefined,
      contents: undefined,
      categoryList: [],
    };
  },
  async created() {
    if (!this.master) {
      const response = await this.getReponseApi(this.$axios, "common/master");
      if (response.status == 200) {
        this.updateMasterStateFromApi(response);
      }
    }
    // storeのmaster情報をコンボボックス用にセット
    this.categoryList = this.master.chat_category_list;
  },
  methods: {
    ...mapActions("masterStore", ["updateMasterStateFromApi"]),
    transferGroupChat() {
      this.$router.push({
        path: "/chat/chat_message?type=group&category=" + this.selectedCategory,
      });
    },
    transferPersonalChat() {
      this.$router.push({
        path: "/chat/personal_chat_room?category=" + this.selectedCategory,
      });
    },
  },
};
</script>
