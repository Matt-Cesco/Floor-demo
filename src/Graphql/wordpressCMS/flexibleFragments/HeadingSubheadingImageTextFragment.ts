import { gql } from '@apollo/client';

export const HeadingSubheadingImageTextFragment = gql`
  fragment HeadingSubheadingImageTextFragment on FlexibleContentFlexibleContentBlockHeadingSubheadingImageTextLayout {
    __typename
    headingSubheadingImageTextFields {
        heading {
        headingTag
      headingText
      }
      image {
      node {
        
  ...mediaItem

      }
    }
      orientationOptions
      subheading
      text
      video {
      node {
        
  ...mediaItem

      }
    }
      videoOrImageOptions
      }
  }
`;
  