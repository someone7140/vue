export const state = () => ({
  isSignedIn: false,
  userInfo: undefined
});

export const mutations = {
  setLoginState(state, payload) {
    state.isSignedIn = payload.isSignedIn;
  },
  setUserInfo(state, payload) {
    state.userInfo = payload ? payload.userInfo : undefined;
  }
};

export const actions = {
  updateLoginState({ commit }, payload) {
    commit("setLoginState", payload);
  },
  updateUserInfo({ commit }, payload) {
    commit("setUserInfo", payload);
  }
};
