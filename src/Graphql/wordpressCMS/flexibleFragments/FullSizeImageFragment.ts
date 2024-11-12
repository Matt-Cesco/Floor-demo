import { gql } from '@apollo/client';

export const FullSizeImageFragment = gql`
  fragment FullSizeImageFragment on FlexibleContentFlexibleContentBlockFullSizeImageLayout {
    __typename
    fullSizeImageFields {
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
      }
  }
`;
  