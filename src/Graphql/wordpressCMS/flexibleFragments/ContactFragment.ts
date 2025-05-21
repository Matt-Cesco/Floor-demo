import { gql } from '@apollo/client';

export const ContactFragment = gql`
  fragment ContactFragment on FlexibleContentFlexibleContentBlockContactLayout {
    __typename
    contactFields {
        title
      }
  }
`;
  