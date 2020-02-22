export const state = () => ({
  newsList: [],
  displayList: [],
  selectedCategory: undefined
});

export const mutations = {
  setNewsList(state, payload) {
    state.newsList = payload.newsList;
  },
  setDisplayList(state, payload) {
    state.displayList = payload.displayList;
  },
  setSelectedCategory(state, payload) {
    state.selectedCategory = payload.selectedCategory;
  }
};

export const actions = {
  updateNewsList({ commit }, payload) {
    commit("setNewsList", payload);
  },
  updateDisplayList({ commit }, payload) {
    commit("setDisplayList", payload);
  },
  updateSelectedCategory({ commit }, payload) {
    commit("setSelectedCategory", payload);
  }
};
