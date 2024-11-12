import { gql } from '@apollo/client';

export const HeadingtextbuttonFragment = gql`
  fragment HeadingtextbuttonFragment on FlexibleContentFlexibleContentBlockHeadingtextbuttonLayout {
    __typename
    headingTextButtonFields {
        heading {
        headingTag
      headingText
      }
      link {
      target
      title
      url
    }
      text
      }
  }
`;
  