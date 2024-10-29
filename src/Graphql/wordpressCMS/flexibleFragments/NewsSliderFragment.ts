import { gql } from '@apollo/client';

export const NewsSliderFragment = gql`
  fragment NewsSliderFragment on FlexibleContentFlexibleContentBlockNewsSliderLayout {
    __typename
    newsFields {
        link {
        target
      title
      url
      }
      title
      }
  }
`;
  