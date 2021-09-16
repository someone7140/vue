export default {
  methods: {
    async accessTokenCheck(userStoreInfo, updateUserInfo) {
      if (userStoreInfo?.jwtToken) {
        const nowTime = new Date().getTime();
        if (nowTime > userStoreInfo.accessTokenExpireTime) {
          const result = await this.$axios
            .$post(
              // eslint-disable-next-line no-undef
              process.env.API_DOMAIN + "/user/updateToken",
              {},
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + userStoreInfo.jwtToken,
                },
                withCredentials: true,
              }
            )
            .catch(() => {
              updateUserInfo(undefined);
            });
          updateUserInfo(result);
        }
      }
    },
  },
};
