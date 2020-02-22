export default {
  methods: {
    emailCheck(email) {
      if (!email || email.match(/.+@.+\..+/) == null) {
        return false;
      } else {
        return true;
      }
    }
  }
};
