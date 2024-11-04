import { gql } from '@apollo/client';

export const BigParagraphFragment = gql`
	fragment BigParagraphFragment on FlexibleContentFlexibleContentBlockBigParagraphLayout {
		__typename
		bigParagraphFields {
			text
		}
	}
`;
