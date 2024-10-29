import { gql } from '@apollo/client';

export const InfiniteServicesCarouselFragment = gql`
  fragment InfiniteServicesCarouselFragment on FlexibleContentFlexibleContentBlockInfiniteServicesCarouselLayout {
    __typename
    infiniteServicesCarouselFields {
        serviceTitleAndImage {
        heading {
        headingTag
      headingText
      }
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
      }
      }
  }
`;
  