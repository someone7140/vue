export default {
  methods: {
    async postApi(path, request, token) {
      const settingHeaders = token
        ? {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          }
        : { "Content-Type": "application/json" };
      const result = await this.$axios
        .$post(
          // eslint-disable-next-line no-undef
          process.env.API_DOMAIN + path,
          request,
          {
            headers: settingHeaders,
            withCredentials: true,
          }
        )
        .catch(() => {
          return undefined;
        });
      return result;
    },
    async getApi(path, token) {
      const settingHeaders = token
        ? {
            Authorization: "Bearer " + token,
          }
        : {};
      const result = await this.$axios
        .$get(
          // eslint-disable-next-line no-undef
          process.env.API_DOMAIN + path,
          {
            headers: settingHeaders,
            withCredentials: true,
          }
        )
        .catch(() => {
          return undefined;
        });
      return result;
    },
  },
};
