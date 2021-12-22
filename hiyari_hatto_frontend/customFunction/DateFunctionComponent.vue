<script>
import dayjs from "dayjs";
dayjs.locale("ja");

export default function useDateFunction() {
  // 文字列の日付をformatして返す
  function getFormatDateFromDateStr(dateStr) {
    return dayjs(dateStr).format("YYYY/MM/DD HH:mm:ss");
  }

  return {
    getFormatDateFromDateStr,
  };
}
</script>
