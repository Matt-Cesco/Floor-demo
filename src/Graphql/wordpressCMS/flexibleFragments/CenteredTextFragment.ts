import { gql } from '@apollo/client';

export const CenteredTextFragment = gql`
  fragment CenteredTextFragment on FlexibleContentFlexibleContentBlockCenteredTextLayout {
    __typename
    centeredTextFields {
        text
      }
  }
`;
  