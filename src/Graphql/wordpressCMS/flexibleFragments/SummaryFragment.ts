import { gql } from '@apollo/client';

export const SummaryFragment = gql`
  fragment SummaryFragment on FlexibleContentFlexibleContentBlockSummaryLayout {
    __typename
    summaryFields {
        heading {
        headingTag
      headingText
      }
      text
      }
  }
`;
  