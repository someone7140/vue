import type { LatLon } from "~/gql/graphql";

export interface PostPlaceInputForm {
  valid?: boolean;
  name?: string;
  address?: string;
  categoryIdList?: string[];
  detail?: string;
  urlList?: string[];
}
