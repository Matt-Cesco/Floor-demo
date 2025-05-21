import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
  DefaultOptions,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const apiUrl = process.env.NEXT_PUBLIC_CMS_API_URL;

if (!apiUrl) {
  throw new Error(
    "CMS API URL is not defined. Please set NEXT_PUBLIC_CMS_API_URL in your environment variables.",
  );
}

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`,
      );
    });
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

const httpLink = new HttpLink({ uri: apiUrl });

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "network-only",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "network-only",
    errorPolicy: "all",
  },
  mutate: {
    errorPolicy: "all",
  },
};

const cmsClient = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions,
});

export default cmsClient;
