import { gql } from '@apollo/client';

export const ImageOnVerticalButtonHoverFragment = gql`
  fragment ImageOnVerticalButtonHoverFragment on FlexibleContentFlexibleContentBlockImageOnVerticalButtonHoverLayout {
    __typename
    imageOnVerticalButtonHoverFields {
        rows {
        image {
      node {
        
  ...mediaItem

      }
    }
      link {
      target
      title
      url
    }
      titleColor
      }
      }
  }
`;
  