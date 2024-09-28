// getPageBySlug.ts
import { gql } from '@apollo/client';
import cmsClient from '../client/cmsClient';
import { DefaultFragment } from '../wordpressCMS/flexibleFragments/DefaultFragment';
import { LogosFragment } from '../wordpressCMS/flexibleFragments/LogosFragment';

export const getPageBySlug = async (slug: string) => {
    const response = await cmsClient.query({
        query: gql`
            ${DefaultFragment}
            ${LogosFragment}

            query GetPageBySlug($slug: ID! = "${slug}") {
                page(id: $slug, idType: URI) {
                    title
                    flexibleContent {
                        flexible {
                            ...DefaultFragment
                            ...LogosFragment
                        }
                    }
                }
            }
        `,
    });

    console.log(response);

    return response.data.page;
};
