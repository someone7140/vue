/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation GoogleAuthCodeVerify($authCode: String!) {\n    googleAuthCodeVerify(authCode: $authCode) {\n      token\n    }\n  }\n": types.GoogleAuthCodeVerifyDocument,
    "\n  mutation LoginByGoogleAuthCode($authCode: String!) {\n    loginByGoogleAuthCode(authCode: $authCode) {\n      token\n      userSettingId\n      name\n    }\n  }\n": types.LoginByGoogleAuthCodeDocument,
    "\n  mutation AddAccountUserByGoogle(\n    $authToken: String!\n    $userSettingId: String!\n    $name: String!\n  ) {\n    addAccountUserByGoogle(\n      authToken: $authToken\n      userSettingId: $userSettingId\n      name: $name\n    ) {\n      token\n      userSettingId\n      name\n    }\n  }\n": types.AddAccountUserByGoogleDocument,
    "\n  query getAccountUserByToken {\n    getAccountUserByToken {\n      token\n      userSettingId\n      name\n    }\n  }\n": types.GetAccountUserByTokenDocument,
    "\n  query GetMyPostCategories($nameFilter: String) {\n    getMyPostCategories(nameFilter: $nameFilter) {\n      id\n      userSettingId\n      name\n      parentCategoryId\n      displayOrder\n      memo\n    }\n  }\n": types.GetMyPostCategoriesDocument,
    "\n  query GetMyPostCategoryById($idFilter: String!) {\n    getMyPostCategoryById(idFilter: $idFilter) {\n      id\n      userSettingId\n      name\n      parentCategoryId\n      displayOrder\n      memo\n    }\n  }\n": types.GetMyPostCategoryByIdDocument,
    "\n  mutation AddPostCategory(\n    $name: String!\n    $parentCategoryId: String\n    $displayOrder: Int\n    $memo: String\n  ) {\n    addPostCategory(\n      name: $name\n      parentCategoryId: $parentCategoryId\n      displayOrder: $displayOrder\n      memo: $memo\n    )\n  }\n": types.AddPostCategoryDocument,
    "\n  mutation EditPostCategory(\n    $id: String!\n    $name: String!\n    $parentCategoryId: String\n    $displayOrder: Int\n    $memo: String\n  ) {\n    editPostCategory(\n      id: $id\n      name: $name\n      parentCategoryId: $parentCategoryId\n      displayOrder: $displayOrder\n      memo: $memo\n    )\n  }\n": types.EditPostCategoryDocument,
    "\n  mutation DeletePostCategory($id: String!) {\n    deletePostCategory(id: $id)\n  }\n": types.DeletePostCategoryDocument,
    "\n  mutation AddPostPlace(\n    $name: String!\n    $address: String\n    $latLon: LatLon\n    $prefectureCode: String\n    $categoryIdList: [String!]!\n    $detail: String\n    $urlList: [String!]!\n  ) {\n    addPostPlace(\n      name: $name\n      address: $address\n      latLon: $latLon\n      prefectureCode: $prefectureCode\n      categoryIdList: $categoryIdList\n      detail: $detail\n      urlList: $urlList\n    )\n  }\n": types.AddPostPlaceDocument,
    "\n  query GetLatLonFromAddress($address: String!) {\n    getLatLonFromAddress(address: $address) {\n      lat\n      lon\n    }\n  }\n": types.GetLatLonFromAddressDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation GoogleAuthCodeVerify($authCode: String!) {\n    googleAuthCodeVerify(authCode: $authCode) {\n      token\n    }\n  }\n"): (typeof documents)["\n  mutation GoogleAuthCodeVerify($authCode: String!) {\n    googleAuthCodeVerify(authCode: $authCode) {\n      token\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LoginByGoogleAuthCode($authCode: String!) {\n    loginByGoogleAuthCode(authCode: $authCode) {\n      token\n      userSettingId\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation LoginByGoogleAuthCode($authCode: String!) {\n    loginByGoogleAuthCode(authCode: $authCode) {\n      token\n      userSettingId\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddAccountUserByGoogle(\n    $authToken: String!\n    $userSettingId: String!\n    $name: String!\n  ) {\n    addAccountUserByGoogle(\n      authToken: $authToken\n      userSettingId: $userSettingId\n      name: $name\n    ) {\n      token\n      userSettingId\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation AddAccountUserByGoogle(\n    $authToken: String!\n    $userSettingId: String!\n    $name: String!\n  ) {\n    addAccountUserByGoogle(\n      authToken: $authToken\n      userSettingId: $userSettingId\n      name: $name\n    ) {\n      token\n      userSettingId\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getAccountUserByToken {\n    getAccountUserByToken {\n      token\n      userSettingId\n      name\n    }\n  }\n"): (typeof documents)["\n  query getAccountUserByToken {\n    getAccountUserByToken {\n      token\n      userSettingId\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMyPostCategories($nameFilter: String) {\n    getMyPostCategories(nameFilter: $nameFilter) {\n      id\n      userSettingId\n      name\n      parentCategoryId\n      displayOrder\n      memo\n    }\n  }\n"): (typeof documents)["\n  query GetMyPostCategories($nameFilter: String) {\n    getMyPostCategories(nameFilter: $nameFilter) {\n      id\n      userSettingId\n      name\n      parentCategoryId\n      displayOrder\n      memo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMyPostCategoryById($idFilter: String!) {\n    getMyPostCategoryById(idFilter: $idFilter) {\n      id\n      userSettingId\n      name\n      parentCategoryId\n      displayOrder\n      memo\n    }\n  }\n"): (typeof documents)["\n  query GetMyPostCategoryById($idFilter: String!) {\n    getMyPostCategoryById(idFilter: $idFilter) {\n      id\n      userSettingId\n      name\n      parentCategoryId\n      displayOrder\n      memo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddPostCategory(\n    $name: String!\n    $parentCategoryId: String\n    $displayOrder: Int\n    $memo: String\n  ) {\n    addPostCategory(\n      name: $name\n      parentCategoryId: $parentCategoryId\n      displayOrder: $displayOrder\n      memo: $memo\n    )\n  }\n"): (typeof documents)["\n  mutation AddPostCategory(\n    $name: String!\n    $parentCategoryId: String\n    $displayOrder: Int\n    $memo: String\n  ) {\n    addPostCategory(\n      name: $name\n      parentCategoryId: $parentCategoryId\n      displayOrder: $displayOrder\n      memo: $memo\n    )\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation EditPostCategory(\n    $id: String!\n    $name: String!\n    $parentCategoryId: String\n    $displayOrder: Int\n    $memo: String\n  ) {\n    editPostCategory(\n      id: $id\n      name: $name\n      parentCategoryId: $parentCategoryId\n      displayOrder: $displayOrder\n      memo: $memo\n    )\n  }\n"): (typeof documents)["\n  mutation EditPostCategory(\n    $id: String!\n    $name: String!\n    $parentCategoryId: String\n    $displayOrder: Int\n    $memo: String\n  ) {\n    editPostCategory(\n      id: $id\n      name: $name\n      parentCategoryId: $parentCategoryId\n      displayOrder: $displayOrder\n      memo: $memo\n    )\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeletePostCategory($id: String!) {\n    deletePostCategory(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeletePostCategory($id: String!) {\n    deletePostCategory(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddPostPlace(\n    $name: String!\n    $address: String\n    $latLon: LatLon\n    $prefectureCode: String\n    $categoryIdList: [String!]!\n    $detail: String\n    $urlList: [String!]!\n  ) {\n    addPostPlace(\n      name: $name\n      address: $address\n      latLon: $latLon\n      prefectureCode: $prefectureCode\n      categoryIdList: $categoryIdList\n      detail: $detail\n      urlList: $urlList\n    )\n  }\n"): (typeof documents)["\n  mutation AddPostPlace(\n    $name: String!\n    $address: String\n    $latLon: LatLon\n    $prefectureCode: String\n    $categoryIdList: [String!]!\n    $detail: String\n    $urlList: [String!]!\n  ) {\n    addPostPlace(\n      name: $name\n      address: $address\n      latLon: $latLon\n      prefectureCode: $prefectureCode\n      categoryIdList: $categoryIdList\n      detail: $detail\n      urlList: $urlList\n    )\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetLatLonFromAddress($address: String!) {\n    getLatLonFromAddress(address: $address) {\n      lat\n      lon\n    }\n  }\n"): (typeof documents)["\n  query GetLatLonFromAddress($address: String!) {\n    getLatLonFromAddress(address: $address) {\n      lat\n      lon\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;