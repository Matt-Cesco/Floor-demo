import { gql } from '@apollo/client';

export const SubheadingTwoColTextFragment = gql`
  fragment SubheadingTwoColTextFragment on FlexibleContentFlexibleContentBlockSubheadingTwoColTextLayout {
    __typename
    subheadingTwoColTextFields {
        subheading
      textFirstColumn
      textSecondColumn
      }
  }
`;
  