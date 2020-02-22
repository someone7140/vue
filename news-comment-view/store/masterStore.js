export const state = () => ({
  masterList: undefined
});

export const mutations = {
  setMasterList(state, payload) {
    state.masterList = payload.masterList;
  }
};

export const actions = {
  updateMasterList({ commit }, payload) {
    commit("setMasterList", payload);
  }
};

export const getters = {
  getMasterList(state) {
    return state.masterList;
  }
};
