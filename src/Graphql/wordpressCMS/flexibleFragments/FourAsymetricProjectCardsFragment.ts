import { gql } from "@apollo/client";

export const FourAsymetricProjectCardsFragment = gql`
    fragment FourAsymetricProjectCardsFragment on FlexibleContentFlexibleContentBlockFourAsymetricProjectCardsLayout {
        __typename
        fourAsymetricProjectCardsFields {
            headingBlock {
                headingTag
                headingText
            }
            linkBlock {
                target
                title
                url
            }
            project {
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
                projectLink {
                    target
                    title
                    url
                }
                brandDesign
                brandStrategy
                webDesign
                pr
                comms
                webDevelopment
                socialMediaManagement
                emailMarketing
                copywriting
                seo
            }
            showTitleBlock
        }
    }
`;
