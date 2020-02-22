export default {
  methods: {
    getNowDateTime() {
      let now = new Date();
      return this.getDisplayJpDateTime(now.toISOString());
    },
    getDisplayJpDate(dateStr) {
      let dt = new Date(dateStr);
      return (
        dt.getFullYear() +
        "年" +
        (dt.getMonth() + 1) +
        "月" +
        dt.getDate() +
        "日"
      );
    },
    getDisplayJpDateTime(dateStr) {
      let dt = new Date(dateStr);
      return (
        dt.getFullYear() +
        "年" +
        (dt.getMonth() + 1) +
        "月" +
        dt.getDate() +
        "日" +
        dt.getHours() +
        "時" +
        dt.getMinutes() +
        "分" +
        dt.getSeconds() +
        "秒"
      );
    },
    getDisplayCategory(categoryKey) {
      let masterList = this.$store.getters["masterStore/getMasterList"];
      if (masterList) {
        let category = masterList.news_category.find(c => {
          return c.key == categoryKey;
        });
        return category ? category.value : categoryKey;
      } else {
        return categoryKey;
      }
    },
    getDisplayPrefecture(prefectureKey) {
      let masterList = this.$store.getters["masterStore/getMasterList"];
      if (masterList) {
        let prefecture = masterList.prefecture.find(c => {
          return c.key == prefectureKey;
        });
        return prefecture ? prefecture.value : prefectureKey;
      } else {
        return prefectureKey;
      }
    }
  }
};
