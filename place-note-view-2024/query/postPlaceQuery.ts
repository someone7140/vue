import { gql } from "@apollo/client/core";

import { categoryResponseFragment } from "~/query/postCategoryQuery";

export const addPostPlaceMutationDocument = gql`
  mutation AddPostPlace(
    $name: String!
    $address: String
    $latLon: LatLonInput
    $prefectureCode: String
    $categoryIdList: [String!]!
    $detail: String
    $url: String
  ) {
    addPostPlace(
      name: $name
      address: $address
      latLon: $latLon
      prefectureCode: $prefectureCode
      categoryIdList: $categoryIdList
      detail: $detail
      url: $url
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

export const getPostPlacesAndCategoriesQueryDocument = gql`
  ${categoryResponseFragment}
  query GetPostPlacesAndCategories(
    $idFilter: String
    $categoryFilter: String
    $nameFilter: String
  ) {
    getPostPlaces(
      idFilter: $idFilter
      categoryFilter: $categoryFilter
      nameFilter: $nameFilter
    ) {
      id
      name
      userSettingId
      address
      latLon {
        lat
        lon
      }
      prefectureCode
      categoryIdList
      detail
      url
    }
    getMyPostCategories {
      ...PostCategoryObj
    }
  }
`;

export const editPostPlaceMutationDocument = gql`
  mutation EditPostPlace(
    $id: String!
    $name: String!
    $address: String
    $latLon: LatLonInput
    $prefectureCode: String
    $categoryIdList: [String!]!
    $detail: String
    $url: String
  ) {
    editPostPlace(
      id: $id
      name: $name
      address: $address
      latLon: $latLon
      prefectureCode: $prefectureCode
      categoryIdList: $categoryIdList
      detail: $detail
      url: $url
    )
  }
`;

export const deletePostPlaceMutationDocument = gql`
  mutation DeletePostPlace($id: String!) {
    deletePostPlace(id: $id)
  }
`;
