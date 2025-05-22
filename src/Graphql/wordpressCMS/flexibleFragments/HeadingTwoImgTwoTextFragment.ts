import { gql } from '@apollo/client';

export const HeadingTwoImgTwoTextFragment = gql`
  fragment HeadingTwoImgTwoTextFragment on FlexibleContentFlexibleContentBlockHeadingTwoImgTwoTextLayout {
    __typename
    headingTwoImgTwoTextFields {
        firstImage {
      node {
        
  ...mediaItem

      }
    }
      firstTextCol
      secondImage {
      node {
        
  ...mediaItem

      }
    }
      secondTextCol
      title
      topText
      }
  }
`;
  