export default {
  methods: {
    authCheck(isSignedIn, router) {
      if (!isSignedIn) {
        router.push({ path: "/auth/login" });
      }
    }
  }
};
