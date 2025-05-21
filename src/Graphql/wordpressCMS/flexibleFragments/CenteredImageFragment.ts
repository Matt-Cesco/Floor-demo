import { gql } from '@apollo/client';

export const CenteredImageFragment = gql`
  fragment CenteredImageFragment on FlexibleContentFlexibleContentBlockCenteredImageLayout {
    __typename
    centeredImageFields {
        image {
      node {
        
  ...mediaItem

      }
    }
      }
  }
`;
  