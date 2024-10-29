import { gql } from '@apollo/client';

export const InfoCardSingleFragment = gql`
  fragment InfoCardSingleFragment on FlexibleContentFlexibleContentBlockInfoCardSingleLayout {
    __typename
    infoCardFields {
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
        orientationOptions
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
  