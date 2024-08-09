/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: Date; output: Date; }
};

export type AccountUserResponse = {
  __typename?: 'AccountUserResponse';
  name: Scalars['String']['output'];
  token: Scalars['String']['output'];
  userSettingId: Scalars['String']['output'];
};

export type GoogleAuthCodeVerifyResponse = {
  __typename?: 'GoogleAuthCodeVerifyResponse';
  token: Scalars['String']['output'];
};

export type LatLonInput = {
  lat: Scalars['Float']['input'];
  lon: Scalars['Float']['input'];
};

export type LatLonResponse = {
  __typename?: 'LatLonResponse';
  lat: Scalars['Float']['output'];
  lon: Scalars['Float']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addAccountUserByGoogle: AccountUserResponse;
  addPost: Scalars['Boolean']['output'];
  addPostCategory: Scalars['Boolean']['output'];
  addPostPlace: Scalars['String']['output'];
  deletePostCategory: Scalars['Boolean']['output'];
  deletePostPlace: Scalars['Boolean']['output'];
  editPostCategory: Scalars['Boolean']['output'];
  editPostPlace: Scalars['Boolean']['output'];
  googleAuthCodeVerify: GoogleAuthCodeVerifyResponse;
  loginByGoogleAuthCode: AccountUserResponse;
};


export type MutationAddAccountUserByGoogleArgs = {
  authToken: Scalars['String']['input'];
  name: Scalars['String']['input'];
  userSettingId: Scalars['String']['input'];
};


export type MutationAddPostArgs = {
  categoryIdList: Array<Scalars['String']['input']>;
  detail?: InputMaybe<Scalars['String']['input']>;
  isOpen: Scalars['Boolean']['input'];
  placeId: Scalars['String']['input'];
  title: Scalars['String']['input'];
  urlList: Array<Scalars['String']['input']>;
  visitedDate: Scalars['DateTime']['input'];
};


export type MutationAddPostCategoryArgs = {
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  memo?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  parentCategoryId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationAddPostPlaceArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  categoryIdList: Array<Scalars['String']['input']>;
  detail?: InputMaybe<Scalars['String']['input']>;
  latLon?: InputMaybe<LatLonInput>;
  name: Scalars['String']['input'];
  prefectureCode?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeletePostCategoryArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeletePostPlaceArgs = {
  id: Scalars['String']['input'];
};


export type MutationEditPostCategoryArgs = {
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['String']['input'];
  memo?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  parentCategoryId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationEditPostPlaceArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  categoryIdList: Array<Scalars['String']['input']>;
  detail?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  latLon?: InputMaybe<LatLonInput>;
  name: Scalars['String']['input'];
  prefectureCode?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};


export type MutationGoogleAuthCodeVerifyArgs = {
  authCode: Scalars['String']['input'];
};


export type MutationLoginByGoogleAuthCodeArgs = {
  authCode: Scalars['String']['input'];
};

export type PostCategoryResponse = {
  __typename?: 'PostCategoryResponse';
  displayOrder?: Maybe<Scalars['Int']['output']>;
  id: Scalars['String']['output'];
  memo?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  parentCategoryId?: Maybe<Scalars['String']['output']>;
  userSettingId: Scalars['String']['output'];
};

export type PostPlaceResponse = {
  __typename?: 'PostPlaceResponse';
  address?: Maybe<Scalars['String']['output']>;
  categoryIdList: Array<Scalars['String']['output']>;
  detail?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  latLon?: Maybe<LatLonResponse>;
  name: Scalars['String']['output'];
  prefectureCode?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  userSettingId: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getAccountUserByToken: AccountUserResponse;
  getLatLonFromAddress?: Maybe<LatLonResponse>;
  getMyPostCategories: Array<PostCategoryResponse>;
  getMyPostCategoryById: PostCategoryResponse;
  getPostPlaces: Array<PostPlaceResponse>;
};


export type QueryGetLatLonFromAddressArgs = {
  address: Scalars['String']['input'];
};


export type QueryGetMyPostCategoriesArgs = {
  nameFilter?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetMyPostCategoryByIdArgs = {
  idFilter: Scalars['String']['input'];
};


export type QueryGetPostPlacesArgs = {
  categoryFilter?: InputMaybe<Scalars['String']['input']>;
  idFilter?: InputMaybe<Scalars['String']['input']>;
  nameFilter?: InputMaybe<Scalars['String']['input']>;
};

export type GoogleAuthCodeVerifyMutationVariables = Exact<{
  authCode: Scalars['String']['input'];
}>;


export type GoogleAuthCodeVerifyMutation = { __typename?: 'Mutation', googleAuthCodeVerify: { __typename?: 'GoogleAuthCodeVerifyResponse', token: string } };

export type LoginByGoogleAuthCodeMutationVariables = Exact<{
  authCode: Scalars['String']['input'];
}>;


export type LoginByGoogleAuthCodeMutation = { __typename?: 'Mutation', loginByGoogleAuthCode: { __typename?: 'AccountUserResponse', token: string, userSettingId: string, name: string } };

export type AddAccountUserByGoogleMutationVariables = Exact<{
  authToken: Scalars['String']['input'];
  userSettingId: Scalars['String']['input'];
  name: Scalars['String']['input'];
}>;


export type AddAccountUserByGoogleMutation = { __typename?: 'Mutation', addAccountUserByGoogle: { __typename?: 'AccountUserResponse', token: string, userSettingId: string, name: string } };

export type GetAccountUserByTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAccountUserByTokenQuery = { __typename?: 'Query', getAccountUserByToken: { __typename?: 'AccountUserResponse', token: string, userSettingId: string, name: string } };

export type PostCategoryObjFragment = { __typename?: 'PostCategoryResponse', id: string, userSettingId: string, name: string, parentCategoryId?: string | null, displayOrder?: number | null, memo?: string | null };

export type GetMyPostCategoriesQueryVariables = Exact<{
  nameFilter?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetMyPostCategoriesQuery = { __typename?: 'Query', getMyPostCategories: Array<{ __typename?: 'PostCategoryResponse', id: string, userSettingId: string, name: string, parentCategoryId?: string | null, displayOrder?: number | null, memo?: string | null }> };

export type GetMyPostCategoryByIdQueryVariables = Exact<{
  idFilter: Scalars['String']['input'];
}>;


export type GetMyPostCategoryByIdQuery = { __typename?: 'Query', getMyPostCategoryById: { __typename?: 'PostCategoryResponse', id: string, userSettingId: string, name: string, parentCategoryId?: string | null, displayOrder?: number | null, memo?: string | null } };

export type AddPostCategoryMutationVariables = Exact<{
  name: Scalars['String']['input'];
  parentCategoryId?: InputMaybe<Scalars['String']['input']>;
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  memo?: InputMaybe<Scalars['String']['input']>;
}>;


export type AddPostCategoryMutation = { __typename?: 'Mutation', addPostCategory: boolean };

export type EditPostCategoryMutationVariables = Exact<{
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  parentCategoryId?: InputMaybe<Scalars['String']['input']>;
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  memo?: InputMaybe<Scalars['String']['input']>;
}>;


export type EditPostCategoryMutation = { __typename?: 'Mutation', editPostCategory: boolean };

export type DeletePostCategoryMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeletePostCategoryMutation = { __typename?: 'Mutation', deletePostCategory: boolean };

export type AddPostPlaceMutationVariables = Exact<{
  name: Scalars['String']['input'];
  address?: InputMaybe<Scalars['String']['input']>;
  latLon?: InputMaybe<LatLonInput>;
  prefectureCode?: InputMaybe<Scalars['String']['input']>;
  categoryIdList: Array<Scalars['String']['input']> | Scalars['String']['input'];
  detail?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
}>;


export type AddPostPlaceMutation = { __typename?: 'Mutation', addPostPlace: string };

export type GetLatLonFromAddressQueryVariables = Exact<{
  address: Scalars['String']['input'];
}>;


export type GetLatLonFromAddressQuery = { __typename?: 'Query', getLatLonFromAddress?: { __typename?: 'LatLonResponse', lat: number, lon: number } | null };

export type GetPostPlacesAndCategoriesQueryVariables = Exact<{
  idFilter?: InputMaybe<Scalars['String']['input']>;
  categoryFilter?: InputMaybe<Scalars['String']['input']>;
  nameFilter?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetPostPlacesAndCategoriesQuery = { __typename?: 'Query', getPostPlaces: Array<{ __typename?: 'PostPlaceResponse', id: string, name: string, userSettingId: string, address?: string | null, prefectureCode?: string | null, categoryIdList: Array<string>, detail?: string | null, url?: string | null, latLon?: { __typename?: 'LatLonResponse', lat: number, lon: number } | null }>, getMyPostCategories: Array<{ __typename?: 'PostCategoryResponse', id: string, userSettingId: string, name: string, parentCategoryId?: string | null, displayOrder?: number | null, memo?: string | null }> };

export type EditPostPlaceMutationVariables = Exact<{
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  address?: InputMaybe<Scalars['String']['input']>;
  latLon?: InputMaybe<LatLonInput>;
  prefectureCode?: InputMaybe<Scalars['String']['input']>;
  categoryIdList: Array<Scalars['String']['input']> | Scalars['String']['input'];
  detail?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
}>;


export type EditPostPlaceMutation = { __typename?: 'Mutation', editPostPlace: boolean };

export type DeletePostPlaceMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeletePostPlaceMutation = { __typename?: 'Mutation', deletePostPlace: boolean };

export type AddPostMutationVariables = Exact<{
  title: Scalars['String']['input'];
  placeId: Scalars['String']['input'];
  visitedDate: Scalars['DateTime']['input'];
  isOpen: Scalars['Boolean']['input'];
  categoryIdList: Array<Scalars['String']['input']> | Scalars['String']['input'];
  detail?: InputMaybe<Scalars['String']['input']>;
  urlList: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type AddPostMutation = { __typename?: 'Mutation', addPost: boolean };

export const PostCategoryObjFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostCategoryObj"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PostCategoryResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userSettingId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"parentCategoryId"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"memo"}}]}}]} as unknown as DocumentNode<PostCategoryObjFragment, unknown>;
export const GoogleAuthCodeVerifyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GoogleAuthCodeVerify"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"authCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"googleAuthCodeVerify"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"authCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"authCode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<GoogleAuthCodeVerifyMutation, GoogleAuthCodeVerifyMutationVariables>;
export const LoginByGoogleAuthCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginByGoogleAuthCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"authCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginByGoogleAuthCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"authCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"authCode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"userSettingId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<LoginByGoogleAuthCodeMutation, LoginByGoogleAuthCodeMutationVariables>;
export const AddAccountUserByGoogleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddAccountUserByGoogle"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"authToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userSettingId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addAccountUserByGoogle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"authToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"authToken"}}},{"kind":"Argument","name":{"kind":"Name","value":"userSettingId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userSettingId"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"userSettingId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<AddAccountUserByGoogleMutation, AddAccountUserByGoogleMutationVariables>;
export const GetAccountUserByTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAccountUserByToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAccountUserByToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"userSettingId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetAccountUserByTokenQuery, GetAccountUserByTokenQueryVariables>;
export const GetMyPostCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyPostCategories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"nameFilter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMyPostCategories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"nameFilter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nameFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostCategoryObj"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostCategoryObj"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PostCategoryResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userSettingId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"parentCategoryId"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"memo"}}]}}]} as unknown as DocumentNode<GetMyPostCategoriesQuery, GetMyPostCategoriesQueryVariables>;
export const GetMyPostCategoryByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyPostCategoryById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"idFilter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMyPostCategoryById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"idFilter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"idFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostCategoryObj"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostCategoryObj"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PostCategoryResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userSettingId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"parentCategoryId"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"memo"}}]}}]} as unknown as DocumentNode<GetMyPostCategoryByIdQuery, GetMyPostCategoryByIdQueryVariables>;
export const AddPostCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddPostCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"parentCategoryId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"displayOrder"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"memo"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addPostCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"parentCategoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"parentCategoryId"}}},{"kind":"Argument","name":{"kind":"Name","value":"displayOrder"},"value":{"kind":"Variable","name":{"kind":"Name","value":"displayOrder"}}},{"kind":"Argument","name":{"kind":"Name","value":"memo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"memo"}}}]}]}}]} as unknown as DocumentNode<AddPostCategoryMutation, AddPostCategoryMutationVariables>;
export const EditPostCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EditPostCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"parentCategoryId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"displayOrder"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"memo"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editPostCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"parentCategoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"parentCategoryId"}}},{"kind":"Argument","name":{"kind":"Name","value":"displayOrder"},"value":{"kind":"Variable","name":{"kind":"Name","value":"displayOrder"}}},{"kind":"Argument","name":{"kind":"Name","value":"memo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"memo"}}}]}]}}]} as unknown as DocumentNode<EditPostCategoryMutation, EditPostCategoryMutationVariables>;
export const DeletePostCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePostCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePostCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeletePostCategoryMutation, DeletePostCategoryMutationVariables>;
export const AddPostPlaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddPostPlace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"latLon"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"LatLonInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"prefectureCode"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryIdList"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"detail"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"url"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addPostPlace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}},{"kind":"Argument","name":{"kind":"Name","value":"latLon"},"value":{"kind":"Variable","name":{"kind":"Name","value":"latLon"}}},{"kind":"Argument","name":{"kind":"Name","value":"prefectureCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"prefectureCode"}}},{"kind":"Argument","name":{"kind":"Name","value":"categoryIdList"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryIdList"}}},{"kind":"Argument","name":{"kind":"Name","value":"detail"},"value":{"kind":"Variable","name":{"kind":"Name","value":"detail"}}},{"kind":"Argument","name":{"kind":"Name","value":"url"},"value":{"kind":"Variable","name":{"kind":"Name","value":"url"}}}]}]}}]} as unknown as DocumentNode<AddPostPlaceMutation, AddPostPlaceMutationVariables>;
export const GetLatLonFromAddressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLatLonFromAddress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getLatLonFromAddress"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lon"}}]}}]}}]} as unknown as DocumentNode<GetLatLonFromAddressQuery, GetLatLonFromAddressQueryVariables>;
export const GetPostPlacesAndCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPostPlacesAndCategories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"idFilter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryFilter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"nameFilter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPostPlaces"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"idFilter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"idFilter"}}},{"kind":"Argument","name":{"kind":"Name","value":"categoryFilter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryFilter"}}},{"kind":"Argument","name":{"kind":"Name","value":"nameFilter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nameFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"userSettingId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"latLon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"prefectureCode"}},{"kind":"Field","name":{"kind":"Name","value":"categoryIdList"}},{"kind":"Field","name":{"kind":"Name","value":"detail"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"getMyPostCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostCategoryObj"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostCategoryObj"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PostCategoryResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userSettingId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"parentCategoryId"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"memo"}}]}}]} as unknown as DocumentNode<GetPostPlacesAndCategoriesQuery, GetPostPlacesAndCategoriesQueryVariables>;
export const EditPostPlaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EditPostPlace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"latLon"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"LatLonInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"prefectureCode"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryIdList"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"detail"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"url"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editPostPlace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}},{"kind":"Argument","name":{"kind":"Name","value":"latLon"},"value":{"kind":"Variable","name":{"kind":"Name","value":"latLon"}}},{"kind":"Argument","name":{"kind":"Name","value":"prefectureCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"prefectureCode"}}},{"kind":"Argument","name":{"kind":"Name","value":"categoryIdList"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryIdList"}}},{"kind":"Argument","name":{"kind":"Name","value":"detail"},"value":{"kind":"Variable","name":{"kind":"Name","value":"detail"}}},{"kind":"Argument","name":{"kind":"Name","value":"url"},"value":{"kind":"Variable","name":{"kind":"Name","value":"url"}}}]}]}}]} as unknown as DocumentNode<EditPostPlaceMutation, EditPostPlaceMutationVariables>;
export const DeletePostPlaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePostPlace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePostPlace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeletePostPlaceMutation, DeletePostPlaceMutationVariables>;
export const AddPostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddPost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"placeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"visitedDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isOpen"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryIdList"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"detail"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"urlList"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"placeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"placeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"visitedDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"visitedDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"isOpen"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isOpen"}}},{"kind":"Argument","name":{"kind":"Name","value":"categoryIdList"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryIdList"}}},{"kind":"Argument","name":{"kind":"Name","value":"detail"},"value":{"kind":"Variable","name":{"kind":"Name","value":"detail"}}},{"kind":"Argument","name":{"kind":"Name","value":"urlList"},"value":{"kind":"Variable","name":{"kind":"Name","value":"urlList"}}}]}]}}]} as unknown as DocumentNode<AddPostMutation, AddPostMutationVariables>;