import { gql } from '@apollo/client';

export const HeadingSubheadingTwoColTextFragment = gql`
  fragment HeadingSubheadingTwoColTextFragment on FlexibleContentFlexibleContentBlockHeadingSubheadingTwoColTextLayout {
    __typename
    headingSubheadingTwoColTextFields {
        heading {
        headingTag
      headingText
      }
      subheading
      textFirstColumn
      textSecondColumn
      }
  }
`;
  