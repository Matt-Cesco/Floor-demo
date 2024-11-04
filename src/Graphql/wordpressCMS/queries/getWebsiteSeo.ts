import { gql } from '@apollo/client';
import cmsClient from '@/Graphql/client/cmsClient';

export const getWebsiteSeo = async () => {
	try {
		const response = await cmsClient.query({
			query: gql`
				query GetWebsiteSeo {
					websiteSEO {
						siteSeo {
							googleTagManager
							googleVerification
							hotJar
						}
					}
				}
			`,
		});

		return response.data.websiteSEO;
	} catch (error: unknown) {
		console.error('Error fetching website SEO:', error);

		// Check if error is an instance of Error before accessing `message`
		if (error instanceof Error) {
			throw new Error(`Failed to fetch website SEO: ${error.message}`);
		} else {
			throw new Error('Failed to fetch website SEO due to an unknown error.');
		}
	}
};
