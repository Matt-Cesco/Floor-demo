import { gql } from '@apollo/client';

export const ImageOrVideoFragment = gql`
  fragment ImageOrVideoFragment on FlexibleContentFlexibleContentBlockImageOrVideoLayout {
    __typename
    imageOrVideoFields {
        image {
      node {
        
  ...mediaItem

      }
    }
      spacingBottomOptions
      spacingTopOptions
      video {
      node {
        
  ...mediaItem

      }
    }
      videoOrImageOptions
      widthOptions
      }
  }
`;
  