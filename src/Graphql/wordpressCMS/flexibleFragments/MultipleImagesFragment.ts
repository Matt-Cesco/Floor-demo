import { gql } from '@apollo/client';

export const MultipleImagesFragment = gql`
  fragment MultipleImagesFragment on FlexibleContentFlexibleContentBlockMultipleImagesLayout {
    __typename
    imageFields {
        blockImages {
      nodes {
        
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
  