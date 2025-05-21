import { gql } from '@apollo/client';

export const SubheadingOneColTextFragment = gql`
  fragment SubheadingOneColTextFragment on FlexibleContentFlexibleContentBlockSubheadingOneColTextLayout {
    __typename
    subheadingOneColTextFields {
        subheading
      text
      }
  }
`;
  