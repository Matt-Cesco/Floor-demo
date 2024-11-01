import { gql } from '@apollo/client';

export const SelectedWorkFragment = gql`
  fragment SelectedWorkFragment on FlexibleContentFlexibleContentBlockSelectedWorkLayout {
    __typename
    selectedWorkFields {
        heading {
        headingTag
      headingText
      }
      link {
      target
      title
      url
    }
      selectedWorkCards {
        image {
      node {
        
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
      projectNumber
      projectPageLink {
      target
      title
      url
    }
      projectTitle
      servicesProvided
      }
      sideLeftText
      text
      topTextLeft
      topTextRight
      }
  }
`;
  