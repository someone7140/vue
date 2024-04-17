import { gql } from "@apollo/client/core";

export const googleAuthCodeVerifyMutationDocument = gql`
  mutation GoogleAuthCodeVerify($authCode: String!) {
    googleAuthCodeVerify(authCode: $authCode) {
      token
    }
  }
`;

export const loginByGoogleAuthCodeMutationDocument = gql`
  mutation LoginByGoogleAuthCode($authCode: String!) {
    loginByGoogleAuthCode(authCode: $authCode) {
      token
      userSettingId
      name
    }
  }
`;

export const addAccountUserByGoogleMutationDocument = gql`
  mutation AddAccountUserByGoogle(
    $authToken: String!
    $userSettingId: String!
    $name: String!
  ) {
    addAccountUserByGoogle(
      authToken: $authToken
      userSettingId: $userSettingId
      name: $name
    ) {
      token
      userSettingId
      name
    }
  }
`;

export const getAccountUserByTokenQueryDocument = gql`
  query getAccountUserByToken {
    getAccountUserByToken {
      token
      userSettingId
      name
    }
  }
`;
