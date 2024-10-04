import { gql } from '@apollo/client';

export const SimpleFragment = gql`
	fragment SimpleFragment on FlexibleContentFlexibleContentBlockSimpleLayout {
		__typename
		simpleFields {
			heading {
				headingTag
				headingText
			}
			text
		}
	}
`;
