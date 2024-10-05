import { gql } from '@apollo/client';
import cmsClient from '@/Graphql/client/cmsClient';

export const getThemeOptions = async () => {
	try {
		const response = await cmsClient.query({
			query: gql`
				query GetThemeOptions {
					themeOptions {
						themeOptionsFields {
							address
							email
							footerText
						}
					}
				}
			`,
		});

		return response.data.themeOptions;
	} catch (error: unknown) {
		console.error('Error fetching theme options:', error);

		// Check if error is an instance of Error before accessing `message`
		if (error instanceof Error) {
			throw new Error(`Failed to fetch theme options: ${error.message}`);
		} else {
			throw new Error('Failed to fetch theme options due to an unknown error.');
		}
	}
};

