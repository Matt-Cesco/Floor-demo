import { gql } from '@apollo/client';

export const BigCenterHeadingFragment = gql`
  fragment BigCenterHeadingFragment on FlexibleContentFlexibleContentBlockBigCenterHeadingLayout {
    __typename
    bigCenterHeadingFields {
        text
      }
  }
`;
  