import { ApolloClient, InMemoryCache, DefaultOptions } from '@apollo/client';

const apiUrl = process.env.NEXT_PUBLIC_CMS_API_URL;

// Check if API URL is defined in the environment variables
if (!apiUrl) {
	throw new Error('CMS API URL is not defined. Please set NEXT_PUBLIC_CMS_API_URL in your environment variables.');
}

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
    //ssrMode: true,
	uri: apiUrl, // API URL fetched from environment variable
	cache: new InMemoryCache(), // In-memory caching strategy
	defaultOptions, // Apply default fetch and error policies
});

export default cmsClient;
