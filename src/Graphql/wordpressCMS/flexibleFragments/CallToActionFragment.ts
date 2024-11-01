import { gql } from '@apollo/client';

export const CallToActionFragment = gql`
  fragment CallToActionFragment on FlexibleContentFlexibleContentBlockCallToActionLayout {
    __typename
    ctaFields {
        backgroundImage {
      node {
        
  id
  altText
  mediaItemUrl
  title
  mediaDetails {
    height
    width
  }
  srcSet

      }
    }
      layoutOptions {
        backgroundOptions
      }
      link {
      target
      title
      url
    }
      text
      title
      }
  }
`;
  