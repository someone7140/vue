export const state = () => ({
  otherCommentList: [],
  displayOtherCommentList: []
});

export const mutations = {
  setOtherCommentList(state, payload) {
    state.otherCommentList = payload.otherCommentList;
  },
  setDisplayOtherCommentList(state, payload) {
    state.displayOtherCommentList = payload.displayOtherCommentList;
  }
};

export const actions = {
  updateOtherCommentList({ commit }, payload) {
    commit("setOtherCommentList", payload);
  },
  updateDisplayOtherCommentList({ commit }, payload) {
    commit("setDisplayOtherCommentList", payload);
  }
};
