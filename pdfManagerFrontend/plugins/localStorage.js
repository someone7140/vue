import createPersistedState from "vuex-persistedstate";

export default ({ store }) => {
  createPersistedState({
    key: "pdf-manager-key",
    storage: window.localStorage,
  })(store);
};
