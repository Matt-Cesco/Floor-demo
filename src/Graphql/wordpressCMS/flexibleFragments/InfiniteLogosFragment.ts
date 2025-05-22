import { gql } from '@apollo/client';

export const InfiniteLogosFragment = gql`
  fragment InfiniteLogosFragment on FlexibleContentFlexibleContentBlockInfiniteLogosLayout {
    __typename
    infiniteLogosFields {
        logos {
      nodes {
        
  ...mediaItem

      }
    }
      }
  }
`;
  