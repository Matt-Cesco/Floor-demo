import { gql } from '@apollo/client';

export const RgbaBgTextOverImageFragment = gql`
  fragment RgbaBgTextOverImageFragment on FlexibleContentFlexibleContentBlockRgbaBgTextOverImageLayout {
    __typename
    rgbaBgTextOverImageFields {
        image {
      node {
        
  ...mediaItem

      }
    }
      spacingBottomOptions
      spacingTopOptions
      text
      }
  }
`;
  