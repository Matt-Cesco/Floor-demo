import { gql } from "@apollo/client";

export const mediaItem = gql`
  fragment mediaItem on MediaItem {
    id
    altText
    mediaItemUrl
    title
    mimeType
    mediaDetails {
      height
      width
    }
    srcSet
  }
`;
