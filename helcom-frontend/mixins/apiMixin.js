export default {
  methods: {
    getApiDomain() {
      return process.env.API_DOMAIN;
    },
    getReponseApi(axios, path) {
      var result = undefined;
      result = axios
        .$get(this.getApiDomain() + path, {
          withCredentials: true
        })
        .catch(
          () =>
            (result = {
              status: 500
            })
        );
      return result;
    },
    postApi(axios, path, request, setHeader) {
      var result = undefined;
      var postData = JSON.stringify(request);
      var requestHeader = { "Content-Type": "application/json" };
      if (setHeader == "multipart/form-data") {
        postData = request;
        requestHeader = { "Content-Type": "multipart/form-data" };
      }
      result = axios
        .$post(this.getApiDomain() + path, postData, {
          headers: requestHeader,
          withCredentials: true
        })
        .catch(
          () =>
            (result = {
              status: 500
            })
        );
      return result;
    }
  }
};
