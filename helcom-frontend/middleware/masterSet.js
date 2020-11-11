export default function({ _, store }) {
  const master = store.state.masterStore.master;
  if (!master) {
    // masterがセットされていない場合は更新
    store.dispatch("masterStore/updateMasterState");
  }
}
