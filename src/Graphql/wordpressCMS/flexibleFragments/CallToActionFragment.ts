import { gql } from '@apollo/client';

export const CallToActionFragment = gql`
  fragment CallToActionFragment on FlexibleContentFlexibleContentBlockCallToActionLayout {
    __typename
    ctaFields {
        backgroundColorOptions
      buttonLinkContent {
      target
      title
      url
    }
      heading {
        headingTag
      headingText
      }
      }
  }
`;
  