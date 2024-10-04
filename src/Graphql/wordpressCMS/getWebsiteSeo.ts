import { gql } from '@apollo/client';
import cmsClient from '@/Graphql/client/cmsClient';

export const getWebsiteSeo = async () => {
	try {
		let response = await cmsClient.query({
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
	} catch (error) {
		console.error('Error fetching website seo:', error);
		return null;
	}
};