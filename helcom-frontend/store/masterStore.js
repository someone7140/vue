import axios from "axios";

export const state = () => ({
  master: undefined
});

export const mutations = {
  setMasterState(state, payload) {
    state.master = payload.master;
  }
};

export const actions = {
  async updateMasterState({ commit }) {
    const result = await this.$axios
      .$get(process.env.API_DOMAIN + "common/master", {
        withCredentials: true
      })
      .catch(
        () =>
          (result = {
            status: 500
          })
      );
    if (result.status == 200) {
      commit("setMasterState", result);
    }
  },
  async updateMasterStateFromApi({ commit }, payload) {
    commit("setMasterState", payload);
  }
};
