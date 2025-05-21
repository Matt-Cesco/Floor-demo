import { gql } from '@apollo/client';

export const ImageOnTextHoverFragment = gql`
  fragment ImageOnTextHoverFragment on FlexibleContentFlexibleContentBlockImageOnTextHoverLayout {
    __typename
    imageOnTextHoverFields {
        heading {
        headingTag
      headingText
      }
      rows {
        department
      fullName
      image {
      node {
        
  ...mediaItem

      }
    }
      text
      }
      }
  }
`;
  