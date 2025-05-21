import { gql } from '@apollo/client';

export const RightSubheadingTwoColTextFragment = gql`
  fragment RightSubheadingTwoColTextFragment on FlexibleContentFlexibleContentBlockRightSubheadingTwoColTextLayout {
    __typename
    rightSubheadingTwoColTextFields {
        subheading
      textFirstColumn
      textSecondColumn
      }
  }
`;
  