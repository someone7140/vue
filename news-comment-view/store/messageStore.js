export const state = () => ({
  messageUserList: [],
  messageUserDisplayList: [],
  messageList: [],
  messageDisplayList: []
});

export const mutations = {
  setMessageUserList(state, payload) {
    state.messageUserList = payload.messageUserList;
  },
  setMessageUserDisplayList(state, payload) {
    state.messageUserDisplayList = payload.messageUserDisplayList;
  },
  setMessageList(state, payload) {
    state.messageList = payload.messageList;
  },
  setMessageDisplayList(state, payload) {
    state.messageDisplayList = payload.messageDisplayList;
  }
};

export const actions = {
  updateMessageUserList({ commit }, payload) {
    commit("setMessageUserList", payload);
  },
  updateMessageUserDisplayList({ commit }, payload) {
    commit("setMessageUserDisplayList", payload);
  },
  updateMessageList({ commit }, payload) {
    commit("setMessageList", payload);
  },
  updateMessageDisplayList({ commit }, payload) {
    commit("setMessageDisplayList", payload);
  }
};
