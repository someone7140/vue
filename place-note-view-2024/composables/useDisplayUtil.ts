export const useDisplayUtil = () => {
  // 日付を文字列にして返す
  const getDisplayDate = (dateInput?: Date) => {
    if (!dateInput) {
      return "";
    }
    const weekDay = ["日", "月", "火", "水", "木", "金", "土"];
    return `${dateInput.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })}(${weekDay[dateInput.getDay()]})`;
  };

  // スクリプトを非同期で読み込む
  const loadScriptAsync = async (
    doc: Document,
    scriptUrl: string,
    sleepMilliTime: number
  ) => {
    const head = doc.getElementsByTagName("head")[0] as HTMLElement;
    const script = doc.createElement("script");
    script.src = scriptUrl;
    script.async = true;
    script.type = "text/javascript";
    head.appendChild(script);
    await new Promise((resolve) => setTimeout(resolve, sleepMilliTime));
  };

  return { getDisplayDate, loadScriptAsync };
};
