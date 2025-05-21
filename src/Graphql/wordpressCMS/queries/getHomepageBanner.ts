import { gql } from "@apollo/client";
import cmsClient from "@/Graphql/client/cmsClient";
import { mediaItem } from "@/Graphql/wordpressCMS/fragments/mediaItem";

export const getHomepageBanner = async () => {
    const response = await cmsClient.query({
        query: gql`
            ${mediaItem}
            query GetHomepageBanner($slug: ID! = "/") {
                page(id: $slug, idType: URI) {
                    id
                    homepageBanner {
                        homepageBannerFields {
                            topBigTitle
                            h1
                            bannerOptions
                            image {
                                node {
                                    ...mediaItem
                                }
                            }
                            video {
                                node {
                                    ...mediaItem
                                }
                            }
                        }
                    }
                }
            }
        `,
    });
    return response.data.page;
};
