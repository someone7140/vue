import type { GetLatLonFromAddressQuery, LatLonResponse } from "~/gql/graphql";
import { getLatLonFromAddressQueryDocument } from "~/query/postPlaceQuery";

interface AddressInfo {
  latLon: LatLonResponse;
  prefectureCode?: string;
}

export const useGeolocationService = () => {
  const { load: getLatLonFromAddressLazyQuery } =
    useLazyQuery<GetLatLonFromAddressQuery>(getLatLonFromAddressQueryDocument, {
      errorPolicy: "all",
    });

  // 緯度・経度を項目として持つ型を受け取る
  const getPrefectureCodeFromLatLon = async (latLon: LatLonResponse) => {
    const muniCd = await getMuniCdFromLatLon(latLon);
    if (!muniCd) {
      return undefined;
    }

    return getPrefectureCodeFromMuniCd(muniCd);
  };

  // 緯度・経度からmuniCdを取得
  const getMuniCdFromLatLon = async (latLon: LatLonResponse) => {
    type LonLatToAddress = {
      results?: {
        muniCd: string;
        lv01Nm: string;
      };
    };

    const response = await fetch(
      `https://mreversegeocoder.gsi.go.jp/reverse-geocoder/LonLatToAddress?lat=${latLon.lat}&lon=${latLon.lon}`
    );
    if (!response.ok) {
      return undefined;
    }

    const lonLatToAddress: LonLatToAddress = await response.json();
    return lonLatToAddress.results?.muniCd;
  };

  // muniCdから都道府県コードを取得
  const getPrefectureCodeFromMuniCd = (muniCdInput: string) => {
    // 先頭が0の場合は除去
    const muniCd =
      muniCdInput.substring(0, 1) === "0" ? muniCdInput.slice(1) : muniCdInput;
    // muni.jsの一覧を元にしたリストから中身を取得
    const muniContents = MUNI_LIST.MUNI_ARRAY[muniCd];
    if (!muniContents) {
      return undefined;
    }

    // カンマ区切りの一番最初の値が都道府県コード
    return muniContents.split(",")[0];
  };

  // 住所をもとに付帯情報を取得
  const getAddressInfo = async (
    address: string
  ): Promise<AddressInfo | undefined> => {
    let latLon: LatLonResponse | undefined = undefined;
    try {
      // 緯度経度を取得
      const result = await getLatLonFromAddressLazyQuery(null, { address });
      if (result) {
        latLon = result.getLatLonFromAddress ?? undefined;
      }
    } catch (e) {
      //何もしない
    }

    if (!latLon) {
      return undefined;
    }

    const prefectureCode = await getPrefectureCodeFromLatLon(latLon);

    return {
      latLon,
      prefectureCode,
    };
  };
  return { getAddressInfo };
};
