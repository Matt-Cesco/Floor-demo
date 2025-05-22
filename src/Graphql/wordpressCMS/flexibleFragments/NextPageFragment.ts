import { gql } from '@apollo/client';

export const NextPageFragment = gql`
  fragment NextPageFragment on FlexibleContentFlexibleContentBlockNextPageLayout {
    __typename
    nextPageFields {
        projectLink {
      target
      title
      url
    }
      }
  }
`;
  