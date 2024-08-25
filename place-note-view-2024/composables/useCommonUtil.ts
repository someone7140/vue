import type { GetLatLonFromAddressQuery, LatLonResponse } from "~/gql/graphql";
import { getLatLonFromAddressQueryDocument } from "~/query/postPlaceQuery";

export const useCommonUtil = () => {
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

  return { getDisplayDate };
};
