export const state = () => ({
  userInfo: undefined,
});

export const getters = {
  isLogin(state) {
    return state.userInfo != undefined;
  },
};
export const mutations = {
  setUserInfo(state, payload) {
    state.userInfo = payload;
  },
};

export const actions = {
  updateUserInfo({ commit }, payload) {
    commit("setUserInfo", payload);
  },
};
