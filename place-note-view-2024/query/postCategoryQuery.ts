import { gql } from "@apollo/client/core";

export const getMyPostCategoriesQueryDocument = gql`
  query GetMyPostCategories($nameFilter: String) {
    getMyPostCategories(nameFilter: $nameFilter) {
      id
      userSettingId
      name
      parentCategoryId
      displayOrder
      memo
    }
  }
`;

export const addPostCategoryMutationDocument = gql`
  mutation AddPostCategory(
    $name: String!
    $parentCategoryId: String
    $displayOrder: Int
    $memo: String
  ) {
    addPostCategory(
      name: $name
      parentCategoryId: $parentCategoryId
      displayOrder: $displayOrder
      memo: $memo
    )
  }
`;
