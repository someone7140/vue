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

export const getMyPostCategoryByIdQueryDocument = gql`
  query GetMyPostCategoryById($idFilter: String!) {
    getMyPostCategoryById(idFilter: $idFilter) {
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

export const editPostCategoryMutationDocument = gql`
  mutation EditPostCategory(
    $id: String!
    $name: String!
    $parentCategoryId: String
    $displayOrder: Int
    $memo: String
  ) {
    editPostCategory(
      id: $id
      name: $name
      parentCategoryId: $parentCategoryId
      displayOrder: $displayOrder
      memo: $memo
    )
  }
`;

export const deletePostCategoryMutationDocument = gql`
  mutation DeletePostCategory($id: String!) {
    deletePostCategory(id: $id)
  }
`;
