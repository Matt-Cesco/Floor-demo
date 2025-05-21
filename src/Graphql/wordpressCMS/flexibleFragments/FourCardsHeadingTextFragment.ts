import { gql } from '@apollo/client';

export const FourCardsHeadingTextFragment = gql`
  fragment FourCardsHeadingTextFragment on FlexibleContentFlexibleContentBlockFourCardsHeadingTextLayout {
    __typename
    fourCardsHeadingTextFields {
        cards {
        heading {
        headingTag
      headingText
      }
      text
      }
      headingBlock {
        headingTag
      headingText
      }
      }
  }
`;
  