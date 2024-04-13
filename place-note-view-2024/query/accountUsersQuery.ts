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
