import { gql } from "@apollo/client";
import cmsClient from "@/Graphql/client/cmsClient";
import { mediaItem } from "../fragments/mediaItem";

export const getThemeOptions = async () => {
    try {
        const response = await cmsClient.query({
            query: gql`
                ${mediaItem}
                query GetThemeOptions {
                    themeOptions {
                        id
                        themeOptionsFields {
                            logo {
                                node {
                                    ...mediaItem
                                }
                            }
                            logoWhite {
                                node {
                                    ...mediaItem
                                }
                            }
                            icon {
                                node {
                                    ...mediaItem
                                }
                            }
                            menuLinks {
                                pageLink {
                                    target
                                    title
                                    url
                                }
                            }
                            building
                            address
                            cityPostcode
                            phone
                            email
                            socialIcons {
                                iconImage {
                                    node {
                                        ...mediaItem
                                    }
                                }
                                link
                                socialName
                            }
                            footerLinksFirstCol {
                                linkFirstCol {
                                    target
                                    title
                                    url
                                }
                            }
                            footerLinksSecondCol {
                                linkSecondCol {
                                    target
                                    title
                                    url
                                }
                            }
                            footerLinksThirdCol {
                                linkThirdCol {
                                    target
                                    title
                                    url
                                }
                            }
                        }
                    }
                }
            `,
        });

        return response.data.themeOptions.themeOptionsFields;
    } catch (error: unknown) {
        console.error("Error fetching theme options:", error);

        if (error instanceof Error) {
            throw new Error(`Failed to fetch theme options: ${error.message}`);
        } else {
            throw new Error("Failed to fetch theme options due to an unknown error.");
        }
    }
};
