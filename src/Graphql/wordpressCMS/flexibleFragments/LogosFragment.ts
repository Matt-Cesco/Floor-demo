import { gql } from '@apollo/client';

export const LogosFragment = gql`
	fragment LogosFragment on FlexibleContentFlexibleContentBlockLogosLayout {
		__typename
          logoFields {
            text
            title
            logos {
              edges {
                node {
                  ...mediaItem
                }
              }
            }
          }
	}
`;