import { gql } from '@apollo/client';

export const DefaultFragment = gql`
	fragment DefaultFragment on FlexibleContentFlexibleContentBlockDefaultLayout {
		__typename
		contentFields {
            titleHeading {
              headingTag
              headingText
            }
            text
            link {
              url
              title
              target
            }
            layout
            image {
              node {
                ...mediaItem
              }
            }
            
          }
	}
`;
