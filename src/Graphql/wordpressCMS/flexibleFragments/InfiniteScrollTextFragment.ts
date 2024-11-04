import { gql } from '@apollo/client';

export const InfiniteScrollTextFragment = gql`
	fragment InfiniteScrollTextFragment on FlexibleContentFlexibleContentBlockInfiniteScrollTextLayout {
		__typename
		infiniteScrollTextFields {
			text
		}
	}
`;
