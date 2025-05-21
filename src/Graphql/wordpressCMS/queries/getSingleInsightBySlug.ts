import { gql } from "@apollo/client";
import cmsClient from "@/Graphql/client/cmsClient";
import { mediaItem } from "@/Graphql/wordpressCMS/fragments/mediaItem";

function buildGetSingleInsightQuery() {
    return gql`
        ${mediaItem}
        query GetSingleInsight($slug: ID!) {
            insight(id: $slug, idType: URI) {
                id
                title
                date
                featuredImage {
                    node {
                        ...mediaItem
                    }
                }
                bannerInsights {
                    bannerInsightsFields {
                        author {
                            nodes {
                                ... on TeamMember {
                                    id
                                    title
                                    featuredImage {
                                        node {
                                            ...mediaItem
                                        }
                                    }
                                }
                            }
                        }
                        readingTime
                    }
                }
            }
        }
    `;
}

export async function getSingleInsightBySlug(slug: string) {
    try {
        const QUERY = buildGetSingleInsightQuery();
        const response = await cmsClient.query({
            query: QUERY,
            variables: { slug },
        });

        if (response.errors?.length) {
            console.error("GraphQL Errors:", response.errors);
            throw new Error(response.errors[0].message);
        }

        const insightItem = response.data?.insight;
        if (!insightItem) {
            console.error(`No data returned for slug "${slug}".`);
            return null;
        }

        return insightItem;
    } catch (error) {
        console.error("Error fetching single insight by slug:", { slug, error });
        return null;
    }
}
