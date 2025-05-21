import { gql } from "@apollo/client";
import cmsClient from "@/Graphql/client/cmsClient";

// need to fix this one
export const getInsightSeo = async (slug: string) => {
    let response = await cmsClient.query({
        query: gql`
            query GetACFPageBySlug($slug: ID!) {
                page(id: $slug, idType: URI) {
                    id
                    title
                    slug
                    seo {
                        canonical
                        metaDesc
                        metaRobotsNofollow
                        metaRobotsNoindex
                        title
                        schema {
                            raw
                        }
                        breadcrumbs {
                            text
                            url
                        }
                        opengraphDescription
                        opengraphTitle
                        opengraphUrl
                        opengraphImage {
                            link
                        }
                    }
                }
            }
        `,
        variables: {
            slug,
        },
    });

    return response.data.page;
};
