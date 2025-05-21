import { gql } from '@apollo/client';

export const StastsRgbaFragment = gql`
  fragment StastsRgbaFragment on FlexibleContentFlexibleContentBlockStastsRgbaLayout {
    __typename
    statsRgbaFields {
        statsList {
        statNumberRgba
      statText
      }
      }
  }
`;
  