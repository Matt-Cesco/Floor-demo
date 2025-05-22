import { gql } from '@apollo/client';

export const FourAsymetricProjectCardsFragment = gql`
  fragment FourAsymetricProjectCardsFragment on FlexibleContentFlexibleContentBlockFourAsymetricProjectCardsLayout {
    __typename
    fourAsymetricProjectCardsFields {
        headingBlock {
        headingTag
      headingText
      }
      linkBlock {
      target
      title
      url
    }
      project {
        brandDesign
      brandStrategy
      comms
      copywriting
      emailMarketing
      image {
      node {
        
  ...mediaItem

      }
    }
      imageOrVideoOptions
      pr
      projectLink {
      target
      title
      url
    }
      seo
      socialMediaManagement
      video {
      node {
        
  ...mediaItem

      }
    }
      webDesign
      webDevelopment
      }
      showTitleBlock
      }
  }
`;
  