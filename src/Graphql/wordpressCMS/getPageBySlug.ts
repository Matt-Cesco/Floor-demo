
import { gql } from '@apollo/client';
import cmsClient from '@/Graphql/client/cmsClient';
import { DefaultFragment } from '@/Graphql/wordpressCMS/flexibleFragments/DefaultFragment';

export const getPageBySlug = async (slug: string) => {
    const response = await cmsClient.query({
		query: gql`
            ${DefaultFragment}

            query GetPageBySlug($slug: ID! = "/") {
                page(id: $slug, idType: URI) {
                    title
                    flexibleContent {
                        flexible {  
                            ...DefaultFragment
                        }
                    }
                }
            }
        `,
		
	});

    return response.data.page;
};
