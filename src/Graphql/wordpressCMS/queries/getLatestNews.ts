import { gql } from "@apollo/client";
import cmsClient from "@/Graphql/client/cmsClient";
import { mediaItem } from "@/Graphql/wordpressCMS/fragments/mediaItem";
import ILatestNewsBlock from "@/Components/FlexibleBlocks/LatestNewsBlock/ILatestNewsBlock";

export const getLatestNews = async (): Promise<ILatestNewsBlock["insights"]["edges"]> => {
    const response = await cmsClient.query({
        query: gql`
            ${mediaItem}
            query getLatestNews {
                insights(last: 5) {
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
        `,
    });

    return response.data.insights.edges;
};
