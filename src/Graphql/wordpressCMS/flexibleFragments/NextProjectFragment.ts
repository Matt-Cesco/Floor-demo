import { gql } from '@apollo/client';

export const NextProjectFragment = gql`
  fragment NextProjectFragment on FlexibleContentFlexibleContentBlockNextProjectLayout {
    __typename
    nextProjectFields {
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
      link {
      target
      title
      url
    }
      topTextLeft
      topTextRight
      }
  }
`;
  