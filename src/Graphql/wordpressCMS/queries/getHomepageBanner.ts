import { gql } from '@apollo/client';
import cmsClient from '@/Graphql/client/cmsClient';

export const getHomepageBanner = async () => {
	const response = await cmsClient.query({
		query: gql`
			query GetHomepageBanner($slug: ID! = "/") {
				page(id: $slug, idType: URI) {
					id
					title
					bannerHomepage {
						bannerHomepageFields {
							__typename
							titleFirstLine
							titleSecondLine
							titleThirdLine
							bottomText
						}
					}
				}
			}
		`,
	});

	return response.data.page;
};
