import { gql } from '@apollo/client';

export const HighlightBlockFragment = gql`
  fragment HighlightBlockFragment on FlexibleContentFlexibleContentBlockHighlightBlockLayout {
    __typename
    highlightFields {
        image {
      node {
        
  id
  altText
  mediaItemUrl
  title
  mediaDetails {
    height
    width
  }
  srcSet

      }
    }
      layoutOptions {
        backgroundColorOptions
      imageOptions
      }
      link {
        target
      title
      url
      }
      text
      title
      }
  }
`;
  