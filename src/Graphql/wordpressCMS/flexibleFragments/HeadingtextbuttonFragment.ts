import { gql } from "@apollo/client";

export const HeadingTextButtonFragment = gql`
    fragment HeadingTextButtonFragment on FlexibleContentFlexibleContentBlockHeadingTextButtonLayout {
        __typename
        headingTextButtonFields {
            buttonLinkContent {
                target
                title
                url
            }
            buttonStyleOptions
            heading {
                headingTag
                headingText
            }
            text
        }
    }
`;
