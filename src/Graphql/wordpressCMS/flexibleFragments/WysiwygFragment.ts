import { gql } from '@apollo/client';

export const WysiwygFragment = gql`
	fragment WysiwygFragment on FlexibleContentFlexibleContentBlockWysiwygLayout {
		__typename
		content {
			fieldGroupName
		}
	}
`;
