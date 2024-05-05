import { gql } from "@apollo/client/core";

export const addPostPlaceMutationDocument = gql`
  mutation AddPostPlace(
    $name: String!
    $address: String
    $latLon: LatLon
    $prefectureCode: String
    $categoryIdList: [String!]!
    $detail: String
    $urlList: [String!]!
  ) {
    addPostPlace(
      name: $name
      address: $address
      latLon: $latLon
      prefectureCode: $prefectureCode
      categoryIdList: $categoryIdList
      detail: $detail
      urlList: $urlList
    )
  }
`;

export const getLatLonFromAddressQueryDocument = gql`
  query GetLatLonFromAddress($address: String!) {
    getLatLonFromAddress(address: $address) {
      lat
      lon
    }
  }
`;
