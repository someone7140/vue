export const state = () => ({
  historyBackFlg: "false"
});

export const mutations = {
  setHistoryBackFlg(state, payload) {
    state.historyBackFlg = payload.historyBackFlg;
  }
};

export const actions = {
  updateHistoryBackFlg({ commit }, payload) {
    commit("setHistoryBackFlg", payload);
  }
};
