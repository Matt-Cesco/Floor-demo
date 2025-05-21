import { gql } from '@apollo/client';

export const ImageTextButtonFragment = gql`
  fragment ImageTextButtonFragment on FlexibleContentFlexibleContentBlockImageTextButtonLayout {
    __typename
    imageTextButtonFields {
        buttonLinkContent {
      target
      title
      url
    }
      buttonStyleOptions
      image {
      node {
        
  ...mediaItem

      }
    }
      layoutOptions {
        orientationOptions
      }
      text
      }
  }
`;
  