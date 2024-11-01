import { gql } from '@apollo/client';

export const ImageTextFragment = gql`
  fragment ImageTextFragment on FlexibleContentFlexibleContentBlockImageTextLayout {
    __typename
    imageTextFields {
        bigImage {
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
        variationsOptions
      }
      smallImage {
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
      textFirst
      textSecond
      }
  }
`;
  