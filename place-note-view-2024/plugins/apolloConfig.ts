import { from, ApolloLink } from "@apollo/client/core";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { provideApolloClient } from "@vue/apollo-composable";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

export default defineNuxtPlugin((app) => {
  const envVars = useRuntimeConfig();
  // 型のエラーを出さないために一旦anyにする
  const { $apollo } = useNuxtApp();
  const apollo: any = $apollo;

  const errorLink = onError((err) => {
    app.callHook("vue:error", err, null, "apollo error"); // must be called bc `@nuxtjs/apollo` will not do it anymore
  });

  const authLink = setContext(async (_, { headers }) => {
    const { getToken } = useApollo(); //get you token from Nuxt/Apollo helper
    const token = await getToken();
    return {
      headers: {
        ...headers,
        "Apollo-Require-Preflight": "true",
        Authorization: `Bearer ${token}`,
      },
    };
  });

  // create an customLink as example for an custom manual link
  const customLink = new ApolloLink((operation, forward) => {
    return forward(operation).map((data) => {
      return data;
    });
  });

  // Default httpLink (main communication for apollo) use createUploadLink function from apollo-upload-client
  const httpLink = createUploadLink({
    uri: envVars.public.apiEndpoint,
    useGETForQueries: true,
  });

  apollo.defaultClient.setLink(
    from([errorLink, authLink, customLink, httpLink])
  );

  provideApolloClient(apollo.defaultClient);
});
