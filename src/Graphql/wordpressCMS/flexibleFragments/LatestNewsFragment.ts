import { gql } from '@apollo/client';

export const LatestNewsFragment = gql`
  fragment LatestNewsFragment on FlexibleContentFlexibleContentBlockLatestNewsLayout {
    __typename
    latestNewsFields {
        optionalTitle
      }
  }
`;
  