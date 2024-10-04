import { ApolloClient, InMemoryCache, ApolloLink, HttpLink, DefaultOptions } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const apiUrl = process.env.NEXT_PUBLIC_CMS_API_URL;

// Check if API URL is defined in the environment variables
if (!apiUrl) {
	throw new Error('CMS API URL is not defined. Please set NEXT_PUBLIC_CMS_API_URL in your environment variables.');
}

// Error handling link
const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors) {
		graphQLErrors.forEach(({ message, locations, path }) => {
			console.error(`[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`);
		});
	}
	if (networkError) {
		console.error(`[Network error]: ${networkError}`);
	}
});

// HTTP link
const httpLink = new HttpLink({ uri: apiUrl });

// Default options for Apollo Client
const defaultOptions: DefaultOptions = {
	watchQuery: {
		fetchPolicy: 'network-only', // Always fetch new data, bypass cache
		errorPolicy: 'ignore', // Ignore errors for partial responses
	},
	query: {
		fetchPolicy: 'network-only', // Always fetch new data, bypass cache
		errorPolicy: 'all', // Return all errors, including network and GraphQL errors
	},
	mutate: {
		errorPolicy: 'all', // Capture errors during mutations
	},
};

// Apollo Client instance with error handling and cache configuration
const cmsClient = new ApolloClient({
	link: ApolloLink.from([errorLink, httpLink]),
	cache: new InMemoryCache(), // In-memory caching strategy
	defaultOptions, // Apply default fetch and error policies
});

export default cmsClient;
