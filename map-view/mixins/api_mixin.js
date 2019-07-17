import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('user', ['apiToken'])
  },
  methods: {
    getAuthHeader() {
      return { headers: { 'Authorization': 'Bearer ' + this.apiToken } };
    }
  }
}
