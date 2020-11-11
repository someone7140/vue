export const state = () => ({
  roomInfo: undefined
});

export const mutations = {
  setRoomInfo(state, payload) {
    state.roomInfo = payload ? payload.roomInfo : undefined;
  }
};

export const actions = {
  updateRoomInfo({ commit }, payload) {
    commit("setRoomInfo", payload);
  }
};

export const getters = {
  getRoomInfo(state) {
    return state.roomInfo;
  }
};
