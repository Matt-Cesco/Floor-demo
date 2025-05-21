import { gql } from '@apollo/client';

export const ImageRgbaHeadingButtonFragment = gql`
  fragment ImageRgbaHeadingButtonFragment on FlexibleContentFlexibleContentBlockImageRgbaHeadingButtonLayout {
    __typename
    imageRgbaHeadingButtonFields {
        buttonLinkContent {
      target
      title
      url
    }
      buttonStyleOptions
      heading {
        headingTag
      headingText
      }
      image {
      node {
        
  ...mediaItem

      }
    }
      layoutOptions {
        orientationOptions
      }
      spacingBottomOptions
      spacingTopOptions
      }
  }
`;
  