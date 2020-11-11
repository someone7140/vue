export default {
  methods: {
    // 日付文字列から表示用の日付を取得
    getDisplayJpDateTime(dt) {
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
    // カテゴリーをグループ化して返す
    getNestCategoryList(groupList, categoryList) {
      return {
        optGroup: groupList
          .filter(g => {
            return categoryList.some(c => c.group == g.key);
          })
          .map(g => {
            return {
              key: g.key,
              label: g.value,
              childs: categoryList
                .filter(c => {
                  return c.group == g.key;
                })
                .map(c => {
                  return {
                    label: c.value,
                    value: c.key
                  };
                })
            };
          }),
        opt: categoryList
          .filter(c => {
            return !groupList.some(g => c.group == g.key);
          })
          .map(c => {
            return {
              label: c.value,
              value: c.key
            };
          })
      };
    },
    // ランダム文字列の生成
    generateRamdomToken(length) {
      // 生成する文字列に含める文字セット
      var c = "abcdefghijklmnopqrstuvwxyz0123456789";

      var cl = c.length;
      var r = "";
      for (var i = 0; i < length; i++) {
        r += c[Math.floor(Math.random() * cl)];
      }
      return r;
    }
  }
};
