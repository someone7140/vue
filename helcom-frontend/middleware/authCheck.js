export default function({ redirect, store }) {
  const isSignedIn = store.state.userStore.isSignedIn;
  if (!isSignedIn) {
    redirect("/auth/login");
  }
}
