import { gql } from '@apollo/client';

export const SubheadingRowsFragment = gql`
  fragment SubheadingRowsFragment on FlexibleContentFlexibleContentBlockSubheadingRowsLayout {
    __typename
    subheadingRowsTextFields {
        rows {
        heading {
        headingTag
      headingText
      }
      text
      }
      subheading
      }
  }
`;
  