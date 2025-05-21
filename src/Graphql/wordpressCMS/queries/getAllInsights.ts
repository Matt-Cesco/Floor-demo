import { gql } from "@apollo/client";
import cmsClient from "@/Graphql/client/cmsClient";
import { mediaItem } from "@/Graphql/wordpressCMS/fragments/mediaItem";

export async function getAllInsights() {
    const query = gql`
        ${mediaItem}
        query GetAllInsights {
            insights(first: 100) {
                edges {
                    node {
                        id
                        title
                        slug
                        uri
                        date
                        featuredImage {
                            node {
                                ...mediaItem
                            }
                        }
                        bannerInsights {
                            bannerInsightsFields {
                                readingTime
                            }
                        }
                    }
                }
            }
        }
    `;

    const response = await cmsClient.query({ query });

    return response.data.insights.edges.map(({ node }: any) => ({
        title: node.title,
        slug: node.slug,
        uri: node.uri,
        date: node.date,
        featuredImage: node.featuredImage,
        readingTime: node.bannerInsights.bannerInsightsFields.readingTime
    }));
}
