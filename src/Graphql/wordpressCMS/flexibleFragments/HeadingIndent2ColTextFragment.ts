import { gql } from '@apollo/client';

export const HeadingIndent2ColTextFragment = gql`
  fragment HeadingIndent2ColTextFragment on FlexibleContentFlexibleContentBlockHeadingIndent2ColTextLayout {
    __typename
    headingIndent2ColTextFields {
        columnIndentation
      content
      textFirstColumn
      textSecondColumn
      }
  }
`;
  