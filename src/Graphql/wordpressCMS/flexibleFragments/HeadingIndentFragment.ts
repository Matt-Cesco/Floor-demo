import { gql } from '@apollo/client';

export const HeadingIndentFragment = gql`
  fragment HeadingIndentFragment on FlexibleContentFlexibleContentBlockHeadingIndentLayout {
    __typename
    headingIndentFields {
        columnIndentation
      content
      }
  }
`;
  