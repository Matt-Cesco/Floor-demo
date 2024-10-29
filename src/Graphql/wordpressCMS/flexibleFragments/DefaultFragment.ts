import { gql } from '@apollo/client';

export const DefaultFragment = gql`
  fragment DefaultFragment on FlexibleContentFlexibleContentBlockDefaultLayout {
    __typename
    contentFields {
        heading {
        headingTag
      headingText
      }
      image {
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
        imageOptions
      titleColorOptions
      }
      link {
        target
      title
      url
      }
      text
      }
  }
`;
  