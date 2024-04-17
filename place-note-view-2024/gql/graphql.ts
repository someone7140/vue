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

export type PlaceNoteMutation = {
  __typename?: 'PlaceNoteMutation';
  addAccountUserByGoogle: AccountUserResponse;
  googleAuthCodeVerify: GoogleAuthCodeVerifyResponse;
  loginByGoogleAuthCode: AccountUserResponse;
};


export type PlaceNoteMutationAddAccountUserByGoogleArgs = {
  authToken: Scalars['String']['input'];
  name: Scalars['String']['input'];
  userSettingId: Scalars['String']['input'];
};


export type PlaceNoteMutationGoogleAuthCodeVerifyArgs = {
  authCode: Scalars['String']['input'];
};


export type PlaceNoteMutationLoginByGoogleAuthCodeArgs = {
  authCode: Scalars['String']['input'];
};

export type PlaceNoteQuery = {
  __typename?: 'PlaceNoteQuery';
  getAccountUserByToken: AccountUserResponse;
};

export type GoogleAuthCodeVerifyMutationVariables = Exact<{
  authCode: Scalars['String']['input'];
}>;


export type GoogleAuthCodeVerifyMutation = { __typename?: 'PlaceNoteMutation', googleAuthCodeVerify: { __typename?: 'GoogleAuthCodeVerifyResponse', token: string } };

export type LoginByGoogleAuthCodeMutationVariables = Exact<{
  authCode: Scalars['String']['input'];
}>;


export type LoginByGoogleAuthCodeMutation = { __typename?: 'PlaceNoteMutation', loginByGoogleAuthCode: { __typename?: 'AccountUserResponse', token: string, userSettingId: string, name: string } };

export type AddAccountUserByGoogleMutationVariables = Exact<{
  authToken: Scalars['String']['input'];
  userSettingId: Scalars['String']['input'];
  name: Scalars['String']['input'];
}>;


export type AddAccountUserByGoogleMutation = { __typename?: 'PlaceNoteMutation', addAccountUserByGoogle: { __typename?: 'AccountUserResponse', token: string, userSettingId: string, name: string } };

export type GetAccountUserByTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAccountUserByTokenQuery = { __typename?: 'PlaceNoteQuery', getAccountUserByToken: { __typename?: 'AccountUserResponse', token: string, userSettingId: string, name: string } };


export const GoogleAuthCodeVerifyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GoogleAuthCodeVerify"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"authCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"googleAuthCodeVerify"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"authCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"authCode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<GoogleAuthCodeVerifyMutation, GoogleAuthCodeVerifyMutationVariables>;
export const LoginByGoogleAuthCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginByGoogleAuthCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"authCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginByGoogleAuthCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"authCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"authCode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"userSettingId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<LoginByGoogleAuthCodeMutation, LoginByGoogleAuthCodeMutationVariables>;
export const AddAccountUserByGoogleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddAccountUserByGoogle"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"authToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userSettingId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addAccountUserByGoogle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"authToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"authToken"}}},{"kind":"Argument","name":{"kind":"Name","value":"userSettingId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userSettingId"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"userSettingId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<AddAccountUserByGoogleMutation, AddAccountUserByGoogleMutationVariables>;
export const GetAccountUserByTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAccountUserByToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAccountUserByToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"userSettingId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetAccountUserByTokenQuery, GetAccountUserByTokenQueryVariables>;