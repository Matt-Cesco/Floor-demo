import { gql } from "@apollo/client";
import cmsClient from "@/Graphql/client/cmsClient";
import { mediaItem } from "@/Graphql/wordpressCMS/fragments/mediaItem";

export const getBannerBySlug = async (slug: string) => {
    const response = await cmsClient.query({
        query: gql`
            ${mediaItem}
            query GetBannerBySlug($slug: ID!) {
                page(id: $slug, idType: URI) {
                    id
                    title
                    banner {
                        __typename
                        bannerFields {
                            bannerOptions
                            title
                            imageSizeOptions
                            imageOrVideoOptions
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
                            showBrand
                            showDesign
                            showDigital
                            showPr
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
