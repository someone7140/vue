export const state = () => ({
  isSignedIn: false,
  name: "",
  apiToken: ""
});

export const mutations = {
  setSignInState(state, payload){
    state.isSignedIn = payload.isSignedIn;
    state.name = payload.name;
    state.apiToken = payload.apiToken;
  }
}

export const actions = {
  updateSignInState({ commit }, payload) {
    commit('setSignInState', payload);
  }
}
