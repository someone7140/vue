export const state = () => ({
  isSignedIn: false,
  name: ""
});

export const mutations = {
  setSignInState(state, payload){
    state.isSignedIn = payload.isSignedIn;
    state.name = payload.name;
  }
}

export const actions = {
  updateSignInState({ commit }, payload) {
    commit('setSignInState', payload);
  }
}
