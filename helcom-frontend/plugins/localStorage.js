import createPersistedState from "vuex-persistedstate";

export default ({ store }) => {
  createPersistedState({
    key: "helcom-key",
    storage: window.sessionStorage
  })(store);
};
