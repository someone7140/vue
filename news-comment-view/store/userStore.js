export const state = () => ({
  isSignedIn: false,
  userInfo: undefined,
  unReadMessageFlg: false
});

export const mutations = {
  setLoginState(state, payload) {
    state.isSignedIn = payload.isSignedIn;
  },
  setUserInfo(state, payload) {
    state.userInfo = payload.userInfo;
  },
  setUnReadMessageFlg(state, payload) {
    state.unReadMessageFlg = payload.unReadMessageFlg;
  }
};

export const actions = {
  updateLoginState({ commit }, payload) {
    commit("setLoginState", payload);
  },
  updateUserInfo({ commit }, payload) {
    commit("setUserInfo", payload);
  },
  updateUnReadMessageFlg({ commit }, payload) {
    commit("setUnReadMessageFlg", payload);
  }
};
