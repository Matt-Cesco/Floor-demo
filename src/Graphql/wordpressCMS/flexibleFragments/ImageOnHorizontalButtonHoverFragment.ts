import { gql } from '@apollo/client';

export const ImageOnHorizontalButtonHoverFragment = gql`
  fragment ImageOnHorizontalButtonHoverFragment on FlexibleContentFlexibleContentBlockImageOnHorizontalButtonHoverLayout {
    __typename
    imageOnHorizontalButtonHoverFields {
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
  