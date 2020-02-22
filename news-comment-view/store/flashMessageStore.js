export const state = () => ({
  flashMessageDisp: undefined
});

export const mutations = {
  setFlashMessageDisp(state, payload) {
    state.flashMessageDisp = payload.flashMessageDisp;
  }
};

export const actions = {
  updateFlashMessageDisp({ commit }, payload) {
    commit("setFlashMessageDisp", payload);
  }
};
