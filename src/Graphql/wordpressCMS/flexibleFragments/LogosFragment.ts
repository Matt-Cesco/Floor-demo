import { gql } from '@apollo/client';

export const LogosFragment = gql`
  fragment LogosFragment on FlexibleContentFlexibleContentBlockLogosLayout {
    __typename
    logoFields {
        logos {
      nodes {
        
  id
  altText
  mediaItemUrl
  title
  mediaDetails {
    height
    width
  }
  srcSet

      }
    }
      text
      title
      }
  }
`;
  