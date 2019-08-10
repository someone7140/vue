import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('user', ['apiToken'])
  },
  methods: {
    getAuthHeader(headersObj) {
      let authHeader = 'Bearer ' + this.apiToken
      if (headersObj) {
        headersObj.headers['Authorization'] = authHeader;
        return headersObj
      } else {
        return { headers: {'Authorization' : authHeader} };
      }
    },
    getContentHeader() {
      return { headers: {'Content-Type': 'multipart/form-data'} };
    },
  }
}
