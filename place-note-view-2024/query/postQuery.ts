import { gql } from "@apollo/client/core";

import { categoryResponseFragment } from "~/query/postCategoryQuery";

export const addPostMutationDocument = gql`
  mutation AddPost(
    $title: String!
    $placeId: String!
    $visitedDate: DateTime!
    $isOpen: Boolean!
    $categoryIdList: [String!]!
    $detail: String
    $urlList: [String!]!
  ) {
    addPost(
      title: $title
      placeId: $placeId
      visitedDate: $visitedDate
      isOpen: $isOpen
      categoryIdList: $categoryIdList
      detail: $detail
      urlList: $urlList
    )
  }
`;

export const postResponseFragment = gql`
  fragment MyPostObj on PostResponse {
    id
    userSettingId
    title
    placeId
    placeName
    placeUrl
    placePrefectureCode
    visitedDate
    isOpen
    categoryIdList
    detail
    urlList {
      urlId
      url
      urlType
      urlInfo {
        title
        imageUrl
        siteName
      }
      embedHtml
    }
  }
`;

export const getMyPostsQueryDocument = gql`
  ${categoryResponseFragment}
  ${postResponseFragment}
  query GetMyPosts($idFilter: String) {
    getMyPosts(idFilter: $idFilter) {
      ...MyPostObj
    }
    getMyPostCategories {
      ...PostCategoryObj
    }
  }
`;
